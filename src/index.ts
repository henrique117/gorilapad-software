import path from 'path'
import * as Functions from './functions/functions.export'
import { app, ipcMain, BrowserWindow } from 'electron'

export let mainWindow: BrowserWindow

app.whenReady().then(() => {
    const preloadFilePath = path.join(__dirname, 'preload.js')

    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        webPreferences: {
            preload: preloadFilePath,
            nodeIntegration: true,
            contextIsolation: true
        }
    });
  
    mainWindow.loadFile(path.join(__dirname, './public/pages/index.html'))

    ipcMain.on('data-to-main', (_, data) => {
        Functions.storeData(data)
    })

    ipcMain.on('request-data', async (event) => {
        try {
            const dataReceived = await Functions.readData()
            event.reply('reply-data', dataReceived)
        } catch (error) {
            event.reply('reply-data', { error: 'Failed to load data' })
        }
    })

    app.on('window-all-closed', () => {
        if(process.platform !== 'darwin') app.quit()
    })
})