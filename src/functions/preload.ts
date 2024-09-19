import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
    saveToStore: (settings: { rpValue: Boolean, crpValue: Boolean, lapValue: Number, uapValue: Number, keys: [String] }) => 
        ipcRenderer.send('save-to-store', settings),
    loadFromStore: () => ipcRenderer.invoke('load-from-store')
})
