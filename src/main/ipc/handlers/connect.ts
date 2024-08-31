import { vpnConnectorSingleton } from '../../singletons/vpnConnectorSingleton'
import { VpnGroupConnectionService } from '../../services/vpnConnectionService'
import { ConnectionStatusEnum } from '../../../models/main/services/IVpnGroupConnectionService'
import { appContext } from '../../singletons/contextSingleton'

const runningServices: Record<string, VpnGroupConnectionService> = {}

const createServiceIfNotExists = async (name: string): Promise<void> => {
  if (!runningServices[name]) {
    const config = await vpnConnectorSingleton.readConfig(name)
    runningServices[name] = new VpnGroupConnectionService(config)
  }
}

const createEvents = (name: string): void => {
  runningServices[name].onConnectingCallback(() => {
    appContext.win?.webContents.send('onConnecting', { name })
  })

  runningServices[name].onConnectCallback(() => {
    appContext.win?.webContents.send('onConnect', { name })
  })

  runningServices[name].onDisconnectCallback(() => {
    appContext.win?.webContents.send('onDisconnect', { name })
  })

  runningServices[name].onConnectionErrorCallback((error: Error) => {
    appContext.win?.webContents.send('onConnectionError', { name, error })
  })

  runningServices[name].onAskTrustCert((trustCertValue) => {
    appContext.win?.webContents.send('onAskTrustCert', { name, trustCertValue })
  })
}

export const reloadEvents = (): void => {
  Object.keys(runningServices).forEach((name) => {
    createEvents(name)
  })
}

export const destroyServices = (): void => {
  Object.keys(runningServices).forEach((name) => {
    runningServices[name].disconnect()
  })
}

export const connect = async (_event: Electron.IpcMainEvent, name: string): Promise<void> => {
  if (!runningServices[name]) {
    await createServiceIfNotExists(name)
    createEvents(name)
  }
  runningServices[name].connect()
}

export const trustCert = async (name: string, trustCertValue: string): Promise<void> => {
  await runningServices[name].trustCert(trustCertValue)
}

export const unTrustCert = async (name: string): Promise<void> => {
  console.log('UNTRUST', name)
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
