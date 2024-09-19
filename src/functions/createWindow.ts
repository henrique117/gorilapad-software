import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow | null

export default function createWindow(windowWidth: number, windowHeight: number, page: string) {

    function window() {
        mainWindow = new BrowserWindow({
            width: windowWidth,
            height: windowHeight,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
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