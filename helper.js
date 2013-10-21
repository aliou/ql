exports.set_links = function(reply) {
  var links;
  if (!reply || reply == "")
    links = [];
  else
    links = JSON.parse(reply);
  return (links);
};
