const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    resizable: true,
    fullscreenable: true,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // **WICHTIG: DevTools aktivieren**
  win.webContents.openDevTools();

  // Angular Build laden
  win.loadURL(`file://${path.join(__dirname, '../dist/aden_frontend_library/browser/index.html')}`);
}

app.whenReady().then(() => {
  createWindow();
});
