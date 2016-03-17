var Yelp = require('yelp');
var keys = require('../config/keys.js');
var _ = require('underscore');

var yelp = new Yelp({
  consumer_key: keys.yelp.consumerKey,
  consumer_secret: keys.yelp.consumerSecret,
  token: keys.yelp.token,
  token_secret: keys.yelp.tokenSecret
});

var defaultSearch = {
  category_filter: 'restaurants',
  limit: 5
};

exports.search = function (req, res) {
  var searchParams = _.assign(defaultSearch, req.query);

  yelp.search(searchParams)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (error) {
      res.status(404).json(error);
    });
};
