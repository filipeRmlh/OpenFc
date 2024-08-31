import { ipcMain } from 'electron'
import { listConfigs } from './handlers/listConfigs'
import { deleteConfig, openConfig, saveConfig } from './handlers/openConfig'
import {
  connect,
  disconnect,
  getStatus,
  reloadEvents,
  trustCert,
  unTrustCert
} from './handlers/connect'

export { destroyServices } from './handlers/connect'

export const loadIpc = (): void => {
  reloadEvents()
  ipcMain.handle('listConfigs', listConfigs)
  ipcMain.handle('openConfig', openConfig)
  ipcMain.handle('saveConfig', saveConfig)
  ipcMain.handle('deleteConfig', deleteConfig)
  ipcMain.handle('trustCert', (_event, name: string, trustCertValue: string) =>
    trustCert(name, trustCertValue)
  )
  ipcMain.handle('unTrustCert', (_event, name: string) => unTrustCert(name))
  ipcMain.handle('getStatus', (_event, name: string) => getStatus(name))
  ipcMain.on('connect', (event, name) => connect(event, name))
  ipcMain.on('disconnect', (event, name) => disconnect(event, name))
}

