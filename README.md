<img src="https://travis-ci.org/alidaka/daxter.svg?branch=master" />

# daxter
## a dashboard for the Dexter apartment

## APIs
- <https://api.forecast.io/forecast/$FORECAST_KEY/47.642396,-122.344612>
- <http://pugetsound.onebusaway.org/p/OneBusAwayApiService.action>

## Tools
- nodejs
- jasmine
- d3

## Getting Started
1. Install nodejs
2. npm install
3. npm start

## Features
```
/---------------------------\
| 8:04        |             |
| Wed July 12 | 62    8:17  |
|-------------|             |
| 62' Sunny   | 62    8:31  |
| --^---v--   |             |
\---------------------------/
```

tick - something like setInterval(function() { widget.update()}, widget.updateInterval);
refresh/dynamic sizing
Transitions?

nodemon src/app.js
