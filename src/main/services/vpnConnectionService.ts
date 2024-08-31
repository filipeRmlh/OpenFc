import { vpnConnectorSingleton } from '../singletons/vpnConnectorSingleton'
import { IVpnConfig } from '../../models/IOpenFCItemConfig'
import { TrustCertError } from '../errors/TrustCertError'
import {
  ConnectionStatusEnum,
  IConnection,
  IVpnGroupConnectionService
} from '../../models/main/services/IVpnGroupConnectionService'

const reconnectionMaxTry = 4

export class VpnGroupConnectionService implements IVpnGroupConnectionService {
  private connection?: IConnection
  public connectionStatus: ConnectionStatusEnum = ConnectionStatusEnum.Disconnected

  private onConnectCallbackFn?: () => void = undefined
  private onConnectingCallbackFn?: () => void = undefined
  private onDisconnectCallbackFn?: () => void = undefined
  private onConnectionErrorCallbackFn?: (error: Error) => void = undefined
  private onAskTrustCertFn: (trustCertValue: string) => void = () => undefined

  constructor(private config: IVpnConfig) {}

  onConnectCallback(fn: () => void): IVpnGroupConnectionService {
    this.onConnectCallbackFn = fn
    return this
  }
  onConnectingCallback(fn: () => void): IVpnGroupConnectionService {
    this.onConnectingCallbackFn = fn
    return this
  }

  onDisconnectCallback(fn: () => void): IVpnGroupConnectionService {
    this.onDisconnectCallbackFn = fn
    return this
  }

  onConnectionErrorCallback(fn: (error: Error) => void): IVpnGroupConnectionService {
    this.onConnectionErrorCallbackFn = fn
    return this
  }

  onAskTrustCert(fn: (trustCertValue: string) => void): IVpnGroupConnectionService {
    this.onAskTrustCertFn = fn
    return this
  }

  private onErrorCallback(error?: Error): void {
    this.disconnect()
    const connection = this.connection
    if (
      connection &&
      this.config.reconnectOnError &&
      connection.reconnectionTry < reconnectionMaxTry
    ) {
      setTimeout(() => {
        connection.reconnectionTry++
        this.connect()
      }, 4000)
      return
    }
    this.onConnectionErrorCallbackFn?.(error ?? new Error('Failed to connect'))
  }

  connect(): void {
    this.connection = {
      reconnectionTry: 0,
      vpnName: this.config.vpnName,
      config: this.config
    }

    if (this.connectionStatus && this.connectionStatus !== ConnectionStatusEnum.Disconnected) {
      return
    }
    if (this.onConnectingCallbackFn) {
      this.connectionStatus = ConnectionStatusEnum.Connecting
      this.onConnectingCallbackFn()
    }
    const processResult = vpnConnectorSingleton.connectToConfig(
      this.connection.vpnName,
      (_data, isConnectionClosed, vpnPid) => {
        if (this.connection && vpnPid) {
          this.connection.vpnPid = vpnPid
        }
        if (isConnectionClosed && this.onDisconnectCallbackFn) {
          this.connectionStatus = ConnectionStatusEnum.Disconnected
          this.onDisconnectCallbackFn()
          return
        }
        if (this.onConnectCallbackFn) {
          this.connectionStatus = ConnectionStatusEnum.Connected
          this.onConnectCallbackFn()
        }
      },
      (error) => {
        if (!error) {
          return this.disconnect()
        }
        if (error instanceof TrustCertError) {
          if (this.onAskTrustCertFn) {
            this.connectionStatus = ConnectionStatusEnum.Disconnected
            this.onAskTrustCertFn(error.dataKey)
            return this.disconnect()
          }
          return this.disconnect()
        }
        if (this.connectionStatus !== ConnectionStatusEnum.Disconnected) {
          this.onErrorCallback()
        }
      }
    )
    this.connection.process = processResult?.commandObject
    this.connection.abortController = processResult?.abortController
  }

  disconnect(): void {
    const connection = this.connection
    this.connection = undefined
    if (!connection) {
      return
    }
    if (
      this.connectionStatus !== undefined &&
      this.connectionStatus !== null &&
      this.connectionStatus !== ConnectionStatusEnum.Disconnected
    ) {
      this.connectionStatus = ConnectionStatusEnum.Disconnected
    }
    try {
      if (connection?.vpnPid) {
        const result = vpnConnectorSingleton.disconnectFromConfig(connection.vpnPid).toString()
        if (result.includes('DISCONNECTED')) {
          this.connectionStatus = ConnectionStatusEnum.Disconnected
        } else {
          throw new Error('Failed to disconnect')
        }
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Não conseguiu', e?.output?.toString() ?? e?.message ?? 'Could not disconnect')
    }
  }

  async unTrustCert(): Promise<void> {
    if (!this.connection) {
      return
    }
    this.connection.config.trustedCert = undefined
    this.config.trustedCert = undefined
    await vpnConnectorSingleton.saveConfig(this.config.vpnName, this.config)
    this.disconnect()
    this.onDisconnectCallbackFn?.call(undefined)
  }

  async trustCert(trustCert: string): Promise<void> {
    if (!this.connection) {
      return
    }
    this.connection.config.trustedCert = trustCert
    this.config.trustedCert = trustCert
    await vpnConnectorSingleton.saveConfig(this.config.vpnName, this.config)
    this.connect()
  }
}
