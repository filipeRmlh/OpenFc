import { vpnConnectorSingleton } from '../../singletons/vpnConnectorSingleton'
import { IVpnConfig } from '../../../models/IOpenFCItemConfig'

export const openConfig = async (
  _event: Electron.IpcMainInvokeEvent,
  configName: string
): Promise<IVpnConfig> => {
  return vpnConnectorSingleton.readConfig(configName)
}

export const saveConfig = async (
  _event: Electron.IpcMainInvokeEvent,
  configName: string,
  config: IVpnConfig
): Promise<void> => {
  console.log('A', configName, config)
  const name = config.vpnName

  if (name !== configName) {
    if (await vpnConnectorSingleton.existsConfig(name)) {
      throw new Error('Config already exists')
    }
    await vpnConnectorSingleton.deleteConfig(configName)
  }
  await vpnConnectorSingleton.saveConfig(name, config)
}

export const deleteConfig = async (
  _event: Electron.IpcMainInvokeEvent,
  configName: string
): Promise<void> => {
  await vpnConnectorSingleton.deleteConfig(configName)
}
