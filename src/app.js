var express = require('express');
const services = require('./services.js');

var app = express();
app.use(express.static('public'));

app.get('/weather', services.weather);

app.get('/buses', services.buses);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});
