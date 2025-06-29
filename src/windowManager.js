const { BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;

function createMainWindow(htmlPath = 'index.html', preloadPath = '../preload.js') {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, preloadPath),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(htmlPath);
  mainWindow.on('closed', () => { mainWindow = null; });
}
function getMainWindow() {
  return mainWindow;
}

module.exports = { createMainWindow, getMainWindow };