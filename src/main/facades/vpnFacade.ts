import * as fs from 'fs/promises'
import { homedir } from 'os'
import path from 'path'
import { ChildProcessWithoutNullStreams, execSync } from 'node:child_process'
import { command } from '../utils/commandUtil'
import { IVpnConfig, mountVpnFileContent, readVpnFileContent } from '../../models/IOpenFCItemConfig'
import { IVpnFacade } from '../../models/main/facades/IVpnFacade'
import { TrustCertError } from '../errors/TrustCertError'

export const KilledByUserCode = 29

let rootPath: string
///#if isDev
rootPath = path.resolve(__dirname, './../..')
///#else
rootPath = path.resolve(__dirname, '../../../..')
///#endif

export class VpnFacade implements IVpnFacade {
  configDir: string

  constructor(configDirFromHome = '/.openfc') {
    this.configDir = path.join(homedir(), configDirFromHome)
  }

  async listConfig(): Promise<string[]> {
    try {
      return (await fs.readdir(this.configDir)).map((nameAndExtension) =>
        nameAndExtension.replace('.config', '')
      )
    } catch (e: unknown) {
      if (e instanceof Error && e.message.toLowerCase().includes('no such file or directory')) {
        console.info("Config directory doesn't exist. Trying to create")
        await fs.mkdir(this.configDir, { recursive: true })
        return []
      }
      throw e
    }
  }

  async deleteConfig(configName: string): Promise<void> {
    await fs.unlink(path.resolve(this.configDir, `${configName}.config`))
  }

  async saveConfig(configName: string, content: IVpnConfig): Promise<void> {
    await fs.writeFile(
      path.resolve(this.configDir, `${configName}.config`),
      mountVpnFileContent(content)
    )
  }

  async existsConfig(configName: string): Promise<boolean> {
    try {
      await fs.access(path.resolve(this.configDir, `${configName}.config`), fs.constants.F_OK)
      return true
    } catch (e) {
      return false
    }
  }

  async readConfig(configName: string): Promise<IVpnConfig> {
    const resultString = (await fs.readFile(path.resolve(this.configDir, `${configName}.config`)))
      .toString()
      .trim()
    return readVpnFileContent(configName, resultString)
  }

  disconnectFromConfig(pid: string): Buffer {
    return execSync(`pkexec ${path.resolve(rootPath, './openfc-vpnbridge.sh')} disconnect ${pid}`)
  }

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
    | undefined {
    const configPath = path.resolve(this.configDir, `${configName}.config`)

    let ignoreTrustData = false
    let vpnPid: string

    const onOutput = ({ data }): void => {
      const extractedPidData = /COMMAND_PID=(\S+)$/gm.exec(data)
      if (extractedPidData) {
        vpnPid = extractedPidData[1]
      }
      const extractedTrustData = /--trusted-cert (\S+)$/gm.exec(data)
      if (extractedTrustData && !ignoreTrustData) {
        ignoreTrustData = true
        connectionErrorCallback(
          new TrustCertError('certificate must be accepted', extractedTrustData[1]),
          false
        )
      }
      const extractedSuccessConnectionData = /up and running/gm.exec(data)
      if (extractedSuccessConnectionData) {
        connectionSuccessCallback(data, false, vpnPid)
      }
    }
    const onFinish = (error?: Error, code?: number): void => {
      console.log(error, code)
      if (code === KilledByUserCode) {
        connectionSuccessCallback(undefined, true, vpnPid)
      }
      if (error) {
        connectionErrorCallback(error, true)
        return
      }
      connectionSuccessCallback(undefined, true, vpnPid)
    }
    return command(
      'pkexec',
      [path.resolve(rootPath, 'openfc-vpnbridge.sh'), `connect`, `-c ${configPath.trim()}`],
      onOutput,
      onFinish
    )
  }
}
