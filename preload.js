console.log("Preload script yüklendi.");
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendConfig: (config) => ipcRenderer.send('sql-config', config),
    onDataUpdate: (callback) => ipcRenderer.on('data-update', callback),
    onSqlStatus: (callback) => ipcRenderer.on('sql-status', callback)
});
