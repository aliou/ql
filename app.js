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

app.get('/', links.print);

app.get('/link', links.add);

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
