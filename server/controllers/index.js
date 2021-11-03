const fs = require("fs");
const properties = require("../models/").properties;


exports.getIndex = (req, res, next) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    fs.readFile("../public/index.html", null, (error, data) => {
        res.write(data);
        res.end();
    });
}

exports.getAllProps = async (req, res, next) => {    
    // client.connect();
    // const result = await client.query("SELECT * FROM public.properties ORDER BY id ASC");
    // console.log(result);
    // client.end();
    const props = await properties.findAll();    

    res.send({ status: "ok", results: props });
}