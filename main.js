const { app, BrowserWindow } = require('electron');
const bcrypt = require('bcrypt');
require('colors');

const hashPassword = async () => {
  try {
    const hash = await bcrypt.hash('password', 10);
    console.log(`${hash}`.blue.bold);
  } catch (err) {
    console.error(`${err}`.red.bold);
  }
};

hashPassword();

let mainWindow;

function createWindow() {
  console.log(`creating window`.green.bold);

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
