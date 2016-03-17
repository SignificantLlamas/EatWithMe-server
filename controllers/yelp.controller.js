var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var _ = require('underscore');
var qs = require('querystring');
var rp = require('request-promise');
var keys = require('../config/keys.js');

var url = 'http://api.yelp.com/v2/search';
var httpMethod = 'GET';

var defaultTerm = ' food open now';
var defaultParameters = {
  sort: '2',
  radius_filter: 500,
  limit: 10
};

var requiredParameters = {
  oauth_consumer_key: keys.yelp.consumerKey,
  oauth_token: keys.yelp.token,
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: n().toString().substr(0, 10),
  oauth_nonce: n(),
  oauth_version: '1.0'
};

var buildUrl = function (setParameters) {
  var parameters = _.assign(defaultParameters, setParameters, requiredParameters);
  parameters.term = (parameters.term || '') + defaultTerm;
  parameters.oauth_signature = oauthSignature.generate(
    httpMethod,
    url,
    parameters,
    keys.yelp.consumerSecret,
    keys.yelp.tokenSecret,
    { encodeSignature: false }
  );
  return url + '?' + qs.stringify(parameters);
};

exports.search = function (req, res) {
  var apiUrl = buildUrl(req.query);
  rp(apiUrl)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (error) {
      res.status(404).json(error);
    });
};
