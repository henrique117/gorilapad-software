import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow | null

export default function createWindow() {

    function window() {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        const htmlPath = path.join(__dirname, '../page/index.html')
        console.log(htmlPath)
        mainWindow.loadFile(htmlPath)

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.whenReady().then(() => {
        window()
    })
}