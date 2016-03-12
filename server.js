var express = require('express');
var app = express();
// commented to avoid linting error
// var db = require('./config/db.js');


app.listen(8000, function () {
  console.log('Listening on port 8080...');
});

module.exports = app;
