import { ipcRenderer, contextBridge } from 'electron'
import * as Interfaces from './interfaces/interfaces.export'

contextBridge.exposeInMainWorld('api', {
    saveData: (data: Interfaces.DataInterface) => ipcRenderer.send('data-to-main', data),
    requestData: () => ipcRenderer.send('request-data'),
    onReceiveData: (callback: Function) => ipcRenderer.on('reply-data', (_, data) => {
        callback(data)
    })
})