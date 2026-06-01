const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 360,
    height: 560,
    resizable: false,
    // Hide standard menus so it feels like a native Windows flyout panel
    autoHideMenuBar: true,
    title: "Microsoft Chat",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Check if packaged or dev server
  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL('http://localhost:5173').catch(() => {
      // Fallback if the dev server isn't running yet
      setTimeout(() => {
        win.loadURL('http://localhost:5173');
      }, 1000);
    });
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
