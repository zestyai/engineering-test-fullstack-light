var logger = require('morgan');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname,'..','public')));
    app.use(function (req, res, next) {
        const token = req.headers["x-access-token"];
        // console.log(token);
        if (token) {
          jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
            if (err) {
              return next();
            }
            User.findOne({
              where: { id: decoded.id },
            }).then((user) => {
              req.user = user;
              return next();
            });
          });
        } else {
          return next();
        }
      });
};