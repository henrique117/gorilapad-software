import { BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { mainWindow } from '../index'

let popUpWindow: BrowserWindow | null

export default function createPopUpWindow(page: string) {

    if (popUpWindow) {
        popUpWindow.focus()
        return
    }

    popUpWindow = new BrowserWindow({
        width: 400,
        height: 220,
        parent: mainWindow,
        modal: true,
        show: false,
        resizable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    })

    const htmlFilePath = path.join(__dirname, `../public/pages/${page}.html`)
    popUpWindow.loadFile(htmlFilePath)

    popUpWindow.once('ready-to-show', () => {
        popUpWindow?.show()
    })

    popUpWindow.on('closed', () => {
        popUpWindow = null
    })
}

ipcMain.on('close-pop-up', (_) => {
    popUpWindow?.close()
})