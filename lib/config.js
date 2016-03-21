'use strict';

const EventEmitter = require('events').EventEmitter;

class Config extends EventEmitter {
  constructor() {
    super();

    // Storing the values here to avoid loop in getter
    this.options = {};

    // Should replace with iteration over input tags inside #configmenu div
    // All the config data is in the html dataset
    var inputCollection = document.getElementById('configmenu').getElementsByTagName('input');
    [].forEach.call(inputCollection, (element) => {
      this.addOption(element);
    });

    this.load();
  }

  addOption(element) {
    var field_value = element.dataset.config,
        attr_value = element.dataset.extract,
        default_value = element.dataset.default;
    Object.defineProperty(this, field_value, {
      enumerable: true,
      get: function() {
        let option_value = this.options[field_value];
        element[attr_value] = option_value;
        return option_value;
      },
      set: function(value) {
        this.options[field_value] = value;
        element[attr_value] = value;
        this.emit('update:' + field_value, value);
      }
    });
    element.addEventListener('change', this);
    this[field_value] = default_value;
  }

  // Handle the callbacks from our binding the HTMLElement with ourself
  handleEvent(ev) {
    var field_name = ev.srcElement.dataset.config,
        field_value = ev.srcElement[ev.srcElement.dataset.extract];
    // Extract field value with the method set in data-extract
    this[field_name] = field_value;
  }

  save() {
    this.emit('save');
    window.localStorage['sf_config'] = JSON.stringify(this.options);
  }

  load() {
    if(window.localStorage['sf_config']) {
      try {
        var data = JSON.parse(window.localStorage['sf_config']);
        Object.getOwnPropertyNames(data).forEach((item) => {
          // Have to use the setter here so the DOM gets updated
          this[item] = data[item];
        });
        this.emit('load');
        return true;
      } catch (err) {
        console.warn('Unable to load stored configuration:', err);
        this.save();
        return false;
      }
    }
  }
}

// Export a new instance immediatly
module.exports = new Config();
