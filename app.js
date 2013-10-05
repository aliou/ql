var express = require('express');
var path = require('path');
var links = require('./links');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.logger());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.get('/', function(req, res) {
  links.clean();
  res.render('index', { title: 'quick-links', data: req });
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
