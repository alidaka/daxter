var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('fdfd World!');
});

app.get('/weather', function (req, res) {
  var endpoint = process.env.FORECAST_ENDPOINT;
  var key = process.env.FORECAST_KEY;
  var coords = '47.642396,-122.344612'

  var uri = `${endpoint}/${key}/${coords}?exclude=flags,alerts,minutely`
  httpsGet(uri, function(json) {
    var hourify = function(hour) {
      return {
        'time': hour.time,
        'temperature': hour.temperature,
        'summary': hour.icon
      };
    };

    var conciseResponse = {
      'currentTemp': json.currently.temperature,
      'currentSummary': json.currently.summary,
      'high': json.daily.data[0].temperatureMax,
      'low': json.daily.data[0].temperatureMin,
      'summary': json.daily.summary,
      'hourly': json.hourly.data.map(hourify)
    };

    res.json(conciseResponse);
  });
});

app.get('/buses', function (req, res) {
  res.json('fdfd World!');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});


httpsGet = function(uri, callback) {
  var fake = process.env.FAKE || false;
  if (fake) {
    var fixture = 'tests/data/' + (uri.includes('forecast') ? 'weather.json' : 'bus.json');

    console.log(`Loading forecast data from ${fixture}...`);
    var data = fs.readFileSync(fixture, 'utf8');
    var json = JSON.parse(data);
    callback(json);
    return;
  }

  https.get(uri, function(result) {
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
