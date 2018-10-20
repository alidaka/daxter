var https = require('https');
var http = require('http');
const url = require('url');
var fs = require('fs');

exports.get = function(uri, callback) {
  var fake = process.env.FAKE || false;
  if (fake) {
    var fixture = 'tests/data/' + (uri.includes('forecast') ? 'weather.json' : 'oba.json');

    console.log(`Loading forecast data from ${fixture}...`);
    var data = fs.readFileSync(fixture, 'utf8');
    var json = JSON.parse(data);
    callback(json);
    return;
  }

  const getUrl = url.parse(uri);

  (getUrl.protocol === 'https:' ? https : http).get(getUrl, function(result) {
    var data = '';

    result.on('data', function(chunk) {
      data += chunk;
    });

    result.on('end', function() {
      var json = JSON.parse(data);
      callback(json);
    });
  }).end();
};
