const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');

function initializeAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Güncelleme',
      message: 'Yeni bir güncelleme bulundu. İndiriliyor...'
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Güncelleme',
      message: 'Güncelleme indirildi. Uygulama yeniden başlatılacak ve güncellenecek.'
    }).then(() => {
      autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (err) => {
    dialog.showErrorBox('Güncelleme Hatası', err == null ? "Bilinmeyen hata" : (err.stack || err).toString());
  });
}

module.exports = { initializeAutoUpdater };