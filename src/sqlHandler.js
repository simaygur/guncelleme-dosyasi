const sql = require('mssql');
const { ipcMain } = require('electron');
const { getMainWindow } = require('./windowManager');

let sqlPool = null;
let lastData = null;
let intervalId = null;

async function connectToSql(config) {
  try {
    if (sqlPool) {
      await sqlPool.close();
      clearInterval(intervalId);
      console.log("🔌 Mevcut bağlantı kapatıldı.");
    }

    sqlPool = await sql.connect(config);
    console.log("✅ SQL bağlantısı başarılı.");
    intervalId = setInterval(() => checkData(), 5000);
    return 'Bağlantı başarılı!';
  } catch (err) {
    console.error("❌ Bağlantı hatası:", err.message);
    return `Bağlantı hatası: ${err.message}`;
  }
}

async function checkData() {
  try {
    const result = await sqlPool.request().query('SELECT value FROM dbo.data_tabl WHERE id = 1');
    if (!result.recordset.length) return;

    const newData = result.recordset[0].value;
    if (newData !== lastData) {
      console.log("Yeni veri tespit edildi:", newData);
      const win = getMainWindow();
      if (win) win.webContents.send('data-update', newData);
      lastData = newData;
    }
  } catch (err) {
    console.error("⚠️ SQL sorgu hatası:", err.message);
  }
}

function setupSqlListener() {
  ipcMain.on('sql-config', async (event, config) => {
    const status = await connectToSql(config);
    event.reply('sql-status', status);
  });
}

module.exports = { setupSqlListener, connectToSql };