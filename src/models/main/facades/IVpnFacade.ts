import { ChildProcessWithoutNullStreams } from 'node:child_process'
import { IVpnConfig } from '../../IOpenFCItemConfig'

export interface IVpnFacade {
  listConfig(): Promise<string[]>

  saveConfig(configName: string, content: IVpnConfig): Promise<void>

  readConfig(configName: string): Promise<IVpnConfig>

  existsConfig(configName: string): Promise<boolean>

  disconnectFromConfig(pid: string): Buffer

  connectToConfig(
    configName: string,
    connectionSuccessCallback: (
      data: Buffer | undefined,
      isConnectionClosed: boolean,
      connectionPid: string
    ) => void,
    connectionErrorCallback: (error: Error, isConnectionClosed: boolean) => void
  ):
    | {
        commandObject: ChildProcessWithoutNullStreams
        abortController: AbortController
      }
    | undefined
}
