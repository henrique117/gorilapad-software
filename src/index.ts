import * as Functions from './functions/functions.export'
import { ipcMain } from 'electron'

Functions.createWindow(1100, 800, 'index')

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