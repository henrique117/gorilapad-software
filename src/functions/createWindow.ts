import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow | null

export default function createWindow(windowWidth: number, windowHeight: number, page: string) {

    function window() {
        mainWindow = new BrowserWindow({
            width: windowWidth,
            height: windowHeight,
            webPreferences: {
                preload: path.join(__dirname, `../preload.js`),
                nodeIntegration: true,
                contextIsolation: true
            }
        });

        const htmlPath = path.join(__dirname, `../public/pages/${page}.html`)
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