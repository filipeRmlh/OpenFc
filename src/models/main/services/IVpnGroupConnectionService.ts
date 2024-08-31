import { IVpnConfig } from '../../IOpenFCItemConfig'
import { ChildProcessWithoutNullStreams } from 'node:child_process'

export enum ConnectionStatusEnum {
  Connected,
  Connecting,
  Disconnected
}

export interface IConnection {
  process?: ChildProcessWithoutNullStreams
  config: IVpnConfig
  vpnName: string
  vpnPid?: string
  reconnectionTry: number
  abortController?: AbortController
}

export interface IVpnGroupConnectionService {
  connectionStatus: ConnectionStatusEnum

  onConnectCallback(fn: () => void): IVpnGroupConnectionService
  onConnectingCallback(fn: () => void): IVpnGroupConnectionService

  onDisconnectCallback(fn: () => void): IVpnGroupConnectionService

  onAskTrustCert(fn: (trustCertValue: string) => void): IVpnGroupConnectionService

  onConnectionErrorCallback(fn: (error: Error) => void): IVpnGroupConnectionService

  connect(config: IVpnConfig): void

  disconnect(): void

  trustCert(trustCert: string): Promise<void>

  unTrustCert(): Promise<void>
}
