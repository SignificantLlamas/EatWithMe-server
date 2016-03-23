var yelpController = require('../controllers/yelp.controller');
var _ = require('underscore');

var defaultSearch = {
  category_filter: 'restaurants',
  limit: 5
};

exports.search = function search(req, res) {
  var searchParams = _.assign(defaultSearch, req.query);

  yelpController.search(searchParams)
  .then(function returnResults(results) {
    res.status(200).json(results);
  })
  .catch(function catchError(error) {
    res.status(404).json(error);
  });
};
