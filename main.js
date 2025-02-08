import { app, BrowserWindow } from 'electron';
import serve from 'electron-serve';
import isDev from 'electron-is-dev';
import path from "node:path";

/*
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { app, BrowserWindow } = require("electron");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const serve = require("electron-serve");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");
*/

const __dirname = import.meta.dirname;
const appServe = app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

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
        appServe(win).then(() => {
            win.loadURL("app://-");
        });
    }

    if (isDev) {
        win.webContents.openDevTools(); // Open DevTools in development
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
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