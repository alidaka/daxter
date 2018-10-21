const http = require('./http.js');

exports.weather = function (req, res) {
  var endpoint = process.env.FORECAST_ENDPOINT;
  var key = process.env.FORECAST_KEY;
  var coords = '47.642396,-122.344612';

  var uri = `${endpoint}/${key}/${coords}?exclude=flags,alerts,minutely`;
  http.get(uri, function(json) {
    var hourify = function(hour) {
      return {
        'time': hour.time,
        'temperature': hour.temperature,
        'icon': hour.icon
      };
    };

    var response = {
      'currentTemp': json.currently.temperature,
      'currentSummary': json.currently.summary,
      'icon': json.currently.icon,
      'high': json.daily.data[0].temperatureMax,
      'low': json.daily.data[0].temperatureMin,
      'summary': json.daily.summary,
      'hourly': json.hourly.data.map(hourify)
    };

    res.json(response);
  });
}

exports.buses = function (req, res) {
  var endpoint = process.env.OBA_ENDPOINT;
  var key = process.env.OBA_KEY;
  // TODO: other stops? time estimates for walking to them?
  var stopId = '1_18270';

  var uri = `${endpoint}/api/where/arrivals-and-departures-for-stop/${stopId}.json?key=${key}`;
  http.get(uri, function(json) {
    var busify = function(entry) {
      var status = 'unknown';
      var time = entry.scheduledArrivalTime;
      var delta = 0;

      if (entry.predicted && entry.predictedTime !== null) {
        time = entry.predictedArrivalTime;
        delta = Math.round((time - entry.scheduledArrivalTime) / 1000 / 60);

        if (delta > 0)      { status = `${Math.abs(delta)}m delay`; }
        else if (delta < 0) { status =  `${Math.abs(delta)}m early`; }
        else                { status = 'on schedule'; }
      }

      return {
        'status': status,
        'time': time,
      };
    };

    var response = {
      'buses': json.data.entry.arrivalsAndDepartures
        .map(busify)
        .sort((a, b) => a.predictedTime > b.predictedTime)
    };

    res.json(response);
  });
}
