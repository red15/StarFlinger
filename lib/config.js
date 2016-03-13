'use strict';

const EventEmitter = require('events').EventEmitter;

module.exports = function() {
  var self = this,
      conf = null;

  conf = new EventEmitter();

  // Load stored configuration
  if (localStorage['sf_config']) {
    try {
      var data = JSON.parse(localStorage['sf_config']);
      conf.username = data.username || 'Freshmeat';
      conf.scaling = data.scaling || 1.0;
      // Emit event to notify loading
      conf.emit('update');
    } catch (err) {
      console.warn('Unable to restore configuration:', err);
    }
  }

  conf.on('show', function() {
    document.getElementById('config_username').value = conf.username;
    document.getElementById('config_scaling').value = conf.scaling;
  });
  conf.on('update', function() {
    conf.username = document.getElementById('config_username').value;
    conf.scaling = document.getElementById('config_scaling').valueAsNumber;
    conf.emit('store');
  });
  conf.on('store', function() {
    localStorage['sf_config'] = JSON.stringify({
      username: conf.username,
      scaling: conf.scaling
    });
  });
  return conf;
}
