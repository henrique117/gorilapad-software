import { ipcRenderer, contextBridge } from 'electron'
import * as Interfaces from './interfaces/interfaces.export'

console.log('carregado')

contextBridge.exposeInMainWorld('api', {
    saveData: (data: Interfaces.DataInterface) => ipcRenderer.send('data-to-main', data),
    requestData: () => ipcRenderer.send('request-data'),
    onReceiveData: (callback: Function) => ipcRenderer.on('reply-data', (_, data) => {
        callback(data)
    }),
    openPopUpWindow: (page: string) => ipcRenderer.send('open-pop-up', page),
    closePopUpWindow: () => ipcRenderer.send('close-pop-up'),
    selectKeySlot: (keyId: number) => ipcRenderer.send('select-key-slot', keyId)
})