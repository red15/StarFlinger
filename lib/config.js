'use strict';

const EventEmitter = require('events').EventEmitter;

class Config extends EventEmitter {
  constructor() {
    super();
    this.username = 'Freshmeat';
    this.scaling = 1.0;
    this.antialias = true;

    this.on('show', function() {
      document.getElementById('config_username').value = this.username;
      document.getElementById('config_scaling').value = this.scaling;
      document.getElementById('config_antialias').checked = this.antialias;
    });

    this.on('update', function() {
      this.username = document.getElementById('config_username').value;
      this.scaling = document.getElementById('config_scaling').valueAsNumber;
      this.antialias = document.getElementById('config_antialias').checked;
    });

    this.load();
  }

  save() {
    // Theoretically we could stringify 'this' but it would include some enumerables added by the EventEmitter
    window.localStorage['sf_config'] = JSON.stringify({
      username: this.username,
      scaling: this.scaling,
      antialias: this.antialias
    });
  }

  load() {
    if(window.localStorage['sf_config']) {
      try {
        var data = JSON.parse(window.localStorage['sf_config']);
        this.username = data.username;
        this.scaling = data.scaling;
        this.antialias = data.antialias;
        this.emit('show');
      } catch (err) {
        console.warn('Unable to load stored configuration:', err);
        this.save();
      }
    }
  }
}

// Export a new instance immediatly
module.exports = new Config();
