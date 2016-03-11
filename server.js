var express = require('express');
var db = require('./config/db.js')

var app = express();
app.listen(8000);

module.exports = app;