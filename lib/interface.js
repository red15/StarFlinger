'use strict';

function ShowMenu(id) {
  document.getElementById(id).classList.remove('hidden');
}
function HideMenu(id) {
  document.getElementById(id).classList.add('hidden');
}
function EnableMenu(id) {
  document.getElementById(id).classList.remove('disabled');
}
function DisableMenu(id) {
  document.getElementById(id).classList.add('disabled');
}

function ButtonBinding(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
}

ButtonBinding('button_play', function() {
  require('shell').beep();
});
ButtonBinding('button_options', function() {
  Config.emit('show');
  ShowMenu('configmenu');
  DisableMenu('mainmenu');
})
ButtonBinding('button_quit', window.close);

ButtonBinding('config_close', function() {
  HideMenu('configmenu');
  EnableMenu('mainmenu');
});

// Bind changes on config values to trigger config update
function ConfigValueChangeEvent(event) {
  // Emit generic configuration update
  Config.emit('update');
  // Emit specific event so different parts can register handlers for this
  Config.emit('update:' + event.srcElement.id);
}
document.getElementById('config_username').addEventListener('change', ConfigValueChangeEvent);
document.getElementById('config_scaling').addEventListener('change', ConfigValueChangeEvent);
document.getElementById('config_antialias').addEventListener('change', ConfigValueChangeEvent);

// Show menu as we're loaded now
ShowMenu('mainmenu');
