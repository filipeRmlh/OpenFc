import { vpnConnectorSingleton } from '../../singletons/vpnConnectorSingleton'

export const listConfigs = async (): Promise<string[]> => {
  return await vpnConnectorSingleton.listConfig()
}
