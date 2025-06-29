const { app, ipcMain } = require('electron');
const { createMainWindow } = require('./src/windowManager');
const { initializeAutoUpdater } = require('./src/updater');
const { setupSqlListener, connectToSql } = require('./src/sqlHandler');

app.whenReady().then(() => {
  createMainWindow();
  initializeAutoUpdater();
  setupSqlListener();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  createMainWindow();
});

ipcMain.on('sql-config', async (event, config) => {
  const status = await connectToSql(config);  
  event.sender.send('sql-status', status);  
});