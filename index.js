/* jshint node: true */
'use strict';
var fs = require('fs');
var request = require('request');

module.exports = {
  name: 'ember-emblr',
  //included: function(app, parentAddon) {
    //var target = (parentAddon || app);
    // Now you can modify the app / parentAddon. For example, if you wanted
    // to include a custom preprocessor, you could add it to the target's
    // registry:
    //
    //     target.registry.add('js', myPreprocessor);
  //},
  contentFor: function(type, config) {
    if(type === 'body-footer' && config.environment === 'production') {
      return fs.readFileSync(__dirname + '/addon/tumblr-posts.htm').toString();
    }
  },
  serverMiddleware: function(config) {
    var self = this;
    var app = config.app;
    var options = config.options;
    var project = options.project;
    var appConfig = project.config(options.environment);

    app.get(options.baseURL + 'tumblr-mock*', function(req, res, next) {
      var url = "http://" + appConfig.tumblr + ".tumblr.com" + req.path.substr("/tumblr-mock".length);
      request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          res.contentType('text/html');
          res.send(body);
        }
      });
    });
  }
};
