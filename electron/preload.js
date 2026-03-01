const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  updateSubscriptions: (subscriptions) => {
    ipcRenderer.send('update-subscriptions', subscriptions);
  },
  getConfig: () => {
    ipcRenderer.send('get-config');
    return new Promise((resolve) => {
      ipcRenderer.once('config', (_, config) => resolve(config));
    });
  },
  saveConfig: (config) => {
    ipcRenderer.send('save-config', config);
  },
  onRefreshData: (callback) => {
    ipcRenderer.on('refresh-data', callback);
  },
  onConfig: (callback) => {
    ipcRenderer.on('config', callback);
  }
});
