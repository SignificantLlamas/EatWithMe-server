var express = require('express');
var app = express();

var db = require('./config/db.js');
db.connect('mongodb://localhost/family-style');

// Uncomment after writing route
// require('./config/routes.js')(app);

app.listen(8000, function () {
  console.log('Listening on port 8080...');
});

module.exports = app;
