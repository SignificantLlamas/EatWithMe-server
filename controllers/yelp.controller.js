var Yelp = require('yelp');
var keys = require('../config/keys.js');

var yelp = new Yelp({
  consumer_key: process.env.consumerKey || keys.yelp.consumerKey,
  consumer_secret: process.env.consumerSecret || keys.yelp.consumerSecret,
  token: process.env.token || keys.yelp.token,
  token_secret: process.env.tokenSecret || keys.yelp.tokenSecret
});

exports.search = function search(searchParams) {
  return yelp.search(searchParams);
};
