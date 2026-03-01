const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
let tray = null;
let mainWindow = null;

const isDev = process.env.NODE_ENV !== 'production' || !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
}

function createTray() {
  const iconPath = isDev 
    ? path.join(__dirname, '../public/icon.png')
    : path.join(__dirname, '../public/icon.png');
  
  const icon = nativeImage.createFromPath(iconPath);
  const resizedIcon = icon.resize({ width: 16, height: 16 });
  
  tray = new Tray(resizedIcon.isEmpty() ? nativeImage.createEmpty() : resizedIcon);
  
  updateTrayMenu();

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const { x, y } = tray.getBounds();
      const { width, height } = mainWindow.getBounds();
      
      const posX = Math.round(x - width / 2);
      const posY = Math.round(y - height);
      
      mainWindow.setPosition(posX, posY);
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

function updateTrayMenu(subscriptions = []) {
  const totalSpent = subscriptions.reduce((sum, s) => sum + (s.spent || 0), 0);
  
  const contextMenu = Menu.buildFromTemplate([
    { label: `Total gastado: $${totalSpent.toFixed(2)}`, enabled: false },
    { type: 'separator' },
    ...subscriptions.map(s => ({
      label: `${s.name}: $${(s.spent || 0).toFixed(2)}`,
      enabled: false
    })),
    { type: 'separator' },
    { label: 'Actualizar', click: () => mainWindow.webContents.send('refresh-data') },
    { type: 'separator' },
    { label: 'Salir', click: () => app.quit() }
  ]);
  
  tray.setContextMenu(contextMenu);
  tray.setToolTip(`AI Tracker: $${totalSpent.toFixed(2)} gastado`);
}

ipcMain.on('update-subscriptions', (event, subscriptions) => {
  updateTrayMenu(subscriptions);
});

ipcMain.on('get-config', (event) => {
  event.reply('config', store.get('apiKeys', {}));
});

ipcMain.on('save-config', (event, config) => {
  store.set('apiKeys', config);
});

app.whenReady().then(() => {
  createWindow();
  createTray();
  
  app.dock?.hide();
});

app.on('window-all-closed', (e) => {
  e.preventDefault();
});

app.on('before-quit', () => {
  tray?.destroy();
});
