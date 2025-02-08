import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from "node:path";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //preload: 'preload.js', // If you need a preload script
            nodeIntegration: false, // Important for security
            contextIsolation: true, // Important for security
        },
    });

    // Load your Next.js app
    if(isDev) {
        win.loadURL('http://localhost:3000')
    }
    else {
        win.loadFile(`file://${path.join(__dirname, '../out/index.html')}`);
    }

    if (isDev) {
        win.webContents.openDevTools(); // Open DevTools in development
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});