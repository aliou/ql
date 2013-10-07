var _ = require('underscore');
var redis = require('redis');
var url = require('url').parse(process.env.REDISTOGO_URL);
var db = redis.createClient(url.port, url.hostname);

db.auth(url.auth.split(':')[1]);

function set_links(reply) {
  var links;
  if (!reply || reply == "")
    links = [];
  else
    links = JSON.parse(reply);
  return (links);
}

exports.print = function(req, res) {
  exports.clean();
  db.get('data', function (err, reply) {
    if (err) {
      res.send('');
      return ;
    }

    var links = set_links(reply);

    res.render('index', { title: 'quick-links', links: links, app_url: process.env.APP_URL});
  });
};

exports.add = function(req, res) {
  if (!req.param('url') || !req.param('title')) {
    res.send('');
    return ;
  }
  db.get('data', function(err, reply) {
    if (err) {
      res.send('');
      return ;
    }

    var links = set_links(reply);

    links.push({url: req.param('url'), title: req.param('title'),
               date: Date.now()});

     db.set('data', JSON.stringify(links));
     res.send(links);
  });
};

exports.clean = function() {
  db.get('data', function(err, reply) {
    if (err)
      return ;

    var links = set_links(reply);
    var one_hour_ago = Date.now() - 60 * 60 * 100;
    var new_links = _.reject(links, function(link) {
      return (link.date <= one_hour_ago);
    });

    db.set('data', JSON.stringify(new_links));
  });
};
