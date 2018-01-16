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
  var coords = '47.642396,-122.344612';

  var uri = `${endpoint}/${key}/${coords}?exclude=flags,alerts,minutely`;
  httpsGet(uri, function(json) {
    var hourify = function(hour) {
      return {
        'time': hour.time,
        'temperature': hour.temperature,
        'summary': hour.icon
      };
    };

    var response = {
      'currentTemp': json.currently.temperature,
      'currentSummary': json.currently.summary,
      'high': json.daily.data[0].temperatureMax,
      'low': json.daily.data[0].temperatureMin,
      'summary': json.daily.summary,
      'hourly': json.hourly.data.map(hourify)
    };

    res.json(response);
  });
});

app.get('/buses', function (req, res) {
  var endpoint = process.env.OBA_ENDPOINT;
  var key = process.env.OBA_KEY;
  // TODO: other stops? time estimates for walking to them?
  var stopId = '1_259'; // TODO: verify stop ID?

  var uri = `${endpoint}/where/arrivals-and-departures-for-stop/${stopId}.json?key=${key}`;
  httpsGet(uri, function(json) {
    var busify = function(entry) {
      var status = 'unknown';
      var time = entry.scheduledArrivalTime;
      var delta = 0;

      if (entry.predicted && entry.predictedTime !== null) {
        time = entry.predictedArrivalTime;
        delta = time - entry.scheduledArrivalTime;

        if (delta > 0)      { status = 'late'; }
        else if (delta < 0) { status = 'early'; }
        else                { status = 'scheduled'; }
      }

      return {
        'status': status,
        'time': time,
        'delta': Math.abs(delta)
      };
    };

    // TODO: sort
    var response = {
      'buses': json.data.entry.arrivalsAndDepartures
        .map(busify)
        .sort((a, b) => a.predictedTime > b.predictedTime)
    };

    res.json(response);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});


httpsGet = function(uri, callback) {
  var fake = process.env.FAKE || false;
  if (fake) {
    var fixture = 'tests/data/' + (uri.includes('forecast') ? 'weather.json' : 'oba.json');

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
