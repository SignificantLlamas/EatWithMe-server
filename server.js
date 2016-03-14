var express = require('express');
var app = express();

var db = require('./config/db.js');
db.connect('mongodb://localhost/family-style');

app.listen(8000, function () {
  console.log('Listening on port 8080...');
});

module.exports = app;
