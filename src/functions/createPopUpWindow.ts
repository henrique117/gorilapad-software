import { BrowserWindow } from 'electron'
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
        height: 300,
        parent: mainWindow,
        modal: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
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