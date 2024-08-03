import { vpnConnectorSingleton } from '../../singletons/vpnConnectorSingleton'
import { VpnGroupConnectionService } from '../../services/vpnConnectionService'
import { ConnectionStatusEnum } from '../../../models/main/services/IVpnGroupConnectionService'
import { appContext } from '../../singletons/contextSingleton'

const runningServices: Record<string, VpnGroupConnectionService> = {}

const createService = async (name: string): Promise<void> => {
  if (!runningServices[name]) {
    const config = await vpnConnectorSingleton.readConfig(name)
    runningServices[name] = new VpnGroupConnectionService(config)
  }
}

const runService = (name: string): void => {
  runningServices[name].onConnectingCallback(() => {
    appContext.win?.webContents.send('onConnecting', { name })
  })

  runningServices[name].onConnectCallback(() => {
    appContext.win?.webContents.send('onConnect', { name })
  })

  runningServices[name].onDisconnectCallback(() => {
    appContext.win?.webContents.send('onDisconnect', { name })
  })

  runningServices[name].onAskTrustCert((trustCertValue) => {
    appContext.win?.webContents.send('onAskTrustCert', { name, trustCertValue })
  })
}

export const connect = async (_event: Electron.IpcMainEvent, name: string): Promise<void> => {
  await createService(name)
  runService(name)
  runningServices[name].connect()
}

export const trustCert = async (name: string, trustCertValue: string): Promise<void> => {
  await runningServices[name].trustCert(trustCertValue)
}

export const unTrustCert = async (name: string): Promise<void> => {
  console.log("UNTRUST", name)
  await runningServices[name].unTrustCert()

}

export const disconnect = (_event: Electron.IpcMainEvent, name: string): void => {
  console.log('disconnect')
  const service = runningServices[name]
  service.disconnect()
}

export const getStatus = (name: string): ConnectionStatusEnum => {
  return runningServices[name]?.connectionStatus ?? ConnectionStatusEnum.Disconnected
}
