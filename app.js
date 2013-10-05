var express = require('express');
var path = require('path');
var redis = require('redis');

var url = require("url").parse(process.env.REDISTOGO_URL);
var db = redis.createClient(url.port, url.hostname);

db.auth(url.auth.split(':')[1]);

var app = express();

var port = process.env.PORT || 3000;

app.use(express.logger());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', { title: 'quick-links', data: req });
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
