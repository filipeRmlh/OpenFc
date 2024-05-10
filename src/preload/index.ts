import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'
import { IVpnConfig } from '../models/IOpenFCItemConfig'
import { ConnectionStatusEnum } from '../models/main/services/IVpnGroupConnectionService'

// Custom APIs for renderer
const api = {
  listConfigs: (): Promise<string[]> => ipcRenderer.invoke('listConfigs'),

  openConfig: (configName: string): Promise<IVpnConfig> =>
    ipcRenderer.invoke('openConfig', configName),

  saveConfig: (configName: string, config: IVpnConfig): Promise<void> =>
    ipcRenderer.invoke('saveConfig', configName, config),

  deleteConfig: (configName: string): Promise<void> =>
    ipcRenderer.invoke('deleteConfig', configName),

  trustCert: (name: string, trustCertValue: string): Promise<void> =>
    ipcRenderer.invoke('trustCert', name, trustCertValue),

  unTrustCert: (name: string): Promise<void> => ipcRenderer.invoke('unTrustCert', name),

  connect: (name: string): void => ipcRenderer.send('connect', name),

  disconnect: (name: string): void => ipcRenderer.send('disconnect', name),

  getStatus: (name: string): Promise<ConnectionStatusEnum> => ipcRenderer.invoke('getStatus', name),

  onConnecting: (callback: (value: { name: string }) => void): Electron.IpcRenderer =>
    ipcRenderer.on('onConnecting', (_event, value) => callback(value)),

  onConnect: (callback: (value: { name: string }) => void): Electron.IpcRenderer =>
    ipcRenderer.on('onConnect', (_event, value) => callback(value)),

  onDisconnect: (callback: (value: { name: string }) => void): Electron.IpcRenderer =>
    ipcRenderer.on('onDisconnect', (_event, value) => callback(value)),

  onAskTrustCert: (
    callback: (value: { name: string; trustCertValue: string }) => void
  ): Electron.IpcRenderer => ipcRenderer.on('onAskTrustCert', (_event, value) => callback(value))
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
