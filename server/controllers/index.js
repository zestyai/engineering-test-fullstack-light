const fs = require("fs");
const Properties = require("../models/").Properties;
const SpatialRefSys = require("../models").SpatialRefSys;
const sequelize = require("sequelize");
const _ = require("lodash");

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
  const {geometry: {type, coordinates}} = req.body;
  const distance = req.body["x-distance"];

  console.log(distance);
  console.log(coordinates);

  try {
    const results = await Properties.findAll({
      where: sequelize.fn('ST_DWithin', 
                sequelize.literal('geocode_geo'), 
                sequelize.literal('ST_MakePoint('+coordinates[0]+','+coordinates[1]+')'),
                distance)
    });
    res.send({status: "ok", results});
  } catch(e) {    
    console.error(e);
    res.send({status: "error", e});
  }  
}