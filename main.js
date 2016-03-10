'use strict';

const electron = require('electron');
const app = electron.app;

var mainWindow = null;

app.on('ready', function() {
  mainWindow = new electron.BrowserWindow({});
  mainWindow.setMenu(new electron.Menu()); // Not using plain menu's
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
