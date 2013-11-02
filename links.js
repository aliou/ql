var _ = require('underscore');
var helper = require('./helper');
var moment = require('moment');
var redis = require('redis');

var url = require('url').parse(process.env.REDISTOGO_URL);
var db = redis.createClient(url.port, url.hostname);

db.auth(url.auth.split(':')[1]);

exports.print = function(req, res) {
  exports.clean();
  db.get('data', function (err, reply) {
    if (err) {
      res.send('');
      return ;
    }

    var links = helper.set_links(reply);

    res.render('index', {
      links: links,
      app_url: process.env.APP_URL,
      m: moment
    });
  });
};

exports.add = function(req, res) {
  if (!req.param('url')) {
    res.send('');
    return ;
  }
  db.get('data', function(err, reply) {
    if (err) {
      res.send('');
      return ;
    }

    var links = helper.set_links(reply);
    var title = req.param('title') ? req.param('title') : req.param('url')
    links.push({url: req.param('url'),
               title: title,
               date: Date.now()
    });

     db.set('data', JSON.stringify(links));
     res.redirect('/');
     // res.send(links);
  });
};

exports.clean = function() {
  db.get('data', function(err, reply) {
    if (err)
      return ;

    var links = helper.set_links(reply);
    var delay = Date.now() - 60 * 10 * 1000;
    var new_links = _.reject(links, function(link) {
      return (link.date <= delay);
    });

    db.set('data', JSON.stringify(new_links));
  });
};
