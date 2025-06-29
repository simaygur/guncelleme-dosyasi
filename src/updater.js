const { autoUpdater } = require('electron-updater');

function initializeAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    console.log('🔍 Yeni güncelleme bulundu.');
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('✅ Güncelleme indirildi. Kuruluyor...');
    autoUpdater.quitAndInstall();
  });
}

module.exports = { initializeAutoUpdater };