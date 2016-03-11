var express = require('express');
var db = require('./config/db.js')

var app = express();
app.listen(8000, function () {
  console.log('Listening on port 8080...');
});

module.exports = app;