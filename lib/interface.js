'use strict';

var mainMenu = document.getElementById('mainmenu');

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
  ShowMenu('configmenu');
  DisableMenu('mainmenu');
})
ButtonBinding('button_quit', window.close);

ButtonBinding('config_close', function() {
  HideMenu('configmenu');
  EnableMenu('mainmenu');
});

// Show menu as we're loaded now
ShowMenu('mainmenu');
