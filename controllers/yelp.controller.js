var Yelp = require('yelp');
var keys = require('../config/keys.js');

var yelp = new Yelp({
  consumer_key: keys.yelp.consumerKey,
  consumer_secret: keys.yelp.consumerSecret,
  token: keys.yelp.token,
  token_secret: keys.yelp.tokenSecret
});

exports.search = function search(searchParams) {
  return yelp.search(searchParams);
};
