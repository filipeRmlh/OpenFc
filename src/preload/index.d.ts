import { ElectronAPI } from '@electron-toolkit/preload'
import { IVpnConfig } from '../models/IOpenFCItemConfig'
import { ConnectionStatusEnum } from '../models/main/services/IVpnGroupConnectionService'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      listConfigs: () => Promise<string[]>

      openConfig: (configName: string) => Promise<IVpnConfig>

      saveConfig: (configName: string, config: IVpnConfig) => Promise<void>

      deleteConfig: (configName: string) => Promise<void>

      trustCert: (name: string, trustCertValue: string) => Promise<void>

      unTrustCert: (name: string) => Promise<void>

      connect: (name: string) => void

      disconnect: (name: string) => void

      onConnecting: (callback: (value: { name: string }) => void) => Electron.IpcRenderer

      onConnect: (callback: (value: { name: string }) => void) => Electron.IpcRenderer

      onDisconnect: (callback: (value: { name: string }) => void) => Electron.IpcRenderer

      onConnectionError: (callback: (value: { name: string, error: Error }) => void) => Electron.IpcRenderer

      getStatus: (name: string) => Promise<ConnectionStatusEnum>

      onAskTrustCert: (
        callback: (value: { name: string; trustCertValue: string }) => void
      ) => Electron.IpcRenderer
    }
  }
}
