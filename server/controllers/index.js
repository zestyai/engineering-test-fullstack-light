const fs = require("fs");
const Properties = require("../models/").Properties;
const SpatialRefSys = require("../models").SpatialRefSys;
const sequelize = require("sequelize");
const _ = require("lodash");
const GeoTIFF = require("geotiff");
const { fromUrl, parse } = GeoTIFF;
const D3Node = require('d3-node');
const canvasModule = require("canvas");
const d3n = new D3Node({ canvasModule });

exports.getIndex = (req, res, next) => {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });

  fs.readFile("../public/index.html", null, (error, data) => {
    res.write(data);
    res.end();
  });
};

exports.getAllProps = async (req, res, next) => {
  try {
    const props = await Properties.findAll({
      attributes: ['id', 'geocode_geo']
    });
    res.send({ status: "ok", results: props });
  } catch (e) {
    console.error(e);
    res.send({ status: "error", e });
  }
};

exports.oneProperty = async (req, res, next) => {
  const { pid } = req.params;
  let result = {};
  try {
    const { dataValues } = await Properties.findOne({
      where: {
        id: pid
      }
    });
    result = Object.assign({}, result, dataValues);

    if (!_.isEmpty(result)) {
      const { geocode_geo: { crs: { properties: { name } } } } = result;
      const spat = await SpatialRefSys.findAll({
        where: {
          [sequelize.Op.and]: [
            { srid: +name.split(":")[1] },
            { auth_name: name.split(":")[0] }
          ]
        }
      });
      result = Object.assign({}, result, { stats: spat });
    }

    res.send({ status: "ok", result });
  } catch (e) {
    console.error(e);
    res.send({ status: "error", e });
  }
};

exports.findProperty = async (req, res, next) => {
  const { geometry: { type, coordinates } } = req.body;
  const distance = req.body["x-distance"];

  try {
    const results = await Properties.findAll({
      where: sequelize.fn('ST_DWithin',
        sequelize.literal('geocode_geo'),
        sequelize.literal('ST_MakePoint(' + coordinates[0] + ',' + coordinates[1] + ')'),
        distance)
    });
    res.send({ status: "ok", results });
  } catch (e) {
    console.error(e);
    res.send({ status: "error", e: e.message });
  }
};

exports.display = async (req, res, next) => {
  const { id, overlay, parcel, building } = req.params;
  const query = req.query;

  try {
    const result = await Properties.findOne({
      where: { id }
    });
    console.log(result);
    const { dataValues: { geocode_geo, parcel_geo, building_geo, image_bounds, image_url } } = result;

    const tiff = await fromUrl(image_url);
    const img = await tiff.getImage();
    const width = img.getWidth();
    const height = img.getHeight();
    const values = img.getBoundingBox();
    const geoTiffDataRGB = await img.readRGB({});

    let projection = d3n.d3.geoMercator()
      .scale(1500)
      .center([geocode_geo.coordinates[0], geocode_geo.coordinates[1]])
      .translate([width / 2, height / 2]); //longitude, latitude

    const canvas = d3n.createCanvas(width, height);
    const context = canvas.getContext('2d');
    const imgData = context.getImageData(0, 0, width, height);
    const data = imgData.data;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const srcIdx = 3 * i * width + 3 * j;
        const idx = 4 * i * width + 4 * j;
        data[idx] = geoTiffDataRGB[srcIdx];
        data[idx + 1] = geoTiffDataRGB[srcIdx + 1];
        data[idx + 2] = geoTiffDataRGB[srcIdx + 2];
        data[idx + 3] = 255; 
      }
    }

    context.putImageData(imgData, 0, 0);
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fillRect(10, 10, 100, 100);

    let geoGenerator = d3n.d3.geoPath().projection(projection).context(context);
    // context.beginPath();
    // geoGenerator(parcel_geo);
    // context.stroke();
    let circleGenerator = d3n.d3.geoCircle()
      .center([-73.7491701543331, 40.9182316369111])
      .radius(5);
    let circle = circleGenerator();

    context.beginPath();
    geoGenerator(circle);
    context.stroke();


    canvas.pngStream().pipe(fs.createWriteStream('output.png'));

    res.send({ status: "ok", result });
  } catch (e) {
    console.error(e);
    res.send({ status: "error", result: e.message });
  }
}