var express = require('express');
var app = express();
var https = require('https');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('fdfd World!');
});

app.get('/weather', function (req, res) {
  var endpoint = process.env.FORECAST_ENDPOINT;
  var key = process.env.FORECAST_KEY;
  var coords = '47.642396,-122.344612'

  var uri = `${endpoint}/${key}/${coords}`
  httpsGet(uri, function(json) {
    var hourify = function(hour) {
      return {
        'time': hour.time,
        'temperature': hour.temperature
      };
    };

    var conciseResponse = {
      'current': json.currently.temperature,
      'todayHigh': json.daily.data[0].temperatureMax,
      'hourly': json.hourly.data.map(hourify),
      'summary': json.daily.icon
    };

    res.json(conciseResponse);
  });
});

app.get('/buses', function (req, res) {
  res.json('fdfd World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


httpsGet = function(uri, callback) {
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
