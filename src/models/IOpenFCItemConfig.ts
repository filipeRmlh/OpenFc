import { isNullOrUndefined } from '../utils/utils'
import { ReadConfigFileError } from '../main/errors/ReadConfigError'

export interface IVpnConfig {
  vpnName: string
  host: string
  reconnectOnError: boolean
  port?: number
  username: string
  password?: string
  setDns?: boolean
  pppdUsePeerdns?: boolean
  trustedCert?: string
  caFile?: string
}

export const mountVpnFileContent = ({
  host,
  port,
  username,
  password,
  trustedCert,
  setDns,
  pppdUsePeerdns,
  caFile
}: IVpnConfig): string => {
  return `username = ${username}
host = ${host}
${port ? `port = ${port}` : ''}
${password ? `password = ${password}` : ''}
${trustedCert ? `trusted-cert = ${trustedCert}` : ''}
${setDns ? `set-dns = ${setDns ? '1' : '0'}}` : ''}
${pppdUsePeerdns ? `pppd-use-peerdns = ${pppdUsePeerdns ? '1' : '0'}}` : ''}
${caFile ? `ca-file = ${caFile}}` : ''}`
}

const convertString = (input: string): string => input
const convertBoolean = (input: string): boolean => input === '1'
const convertIntNumber = (input: string): number => parseInt(input)
const convertFloatNumber = (input: string): number => parseFloat(input)

const configKeysMap: Record<
  string,
  [
    keyof IVpnConfig,
    (
      | typeof convertBoolean
      | typeof convertString
      | typeof convertIntNumber
      | typeof convertFloatNumber
    )
  ]
> = {
  username: ['username', convertString],
  host: ['host', convertString],
  port: ['port', convertIntNumber],
  password: ['password', convertString],
  'trusted-cert': ['trustedCert', convertString],
  'set-dns': ['setDns', convertBoolean],
  'pppd-use-peerdns': ['pppdUsePeerdns', convertBoolean],
  'ca-file': ['caFile', convertString]
}

export const readVpnFileContent = (fileName: string, fileContent: string): IVpnConfig => {
  const result: Record<string, unknown> = { vpnName: fileName, reconnectOnError: false }
  const resultLines = fileContent.split(/[\n\r]+/gm)
  for (const line of Object.values(resultLines)) {
    const [key, value] = line.trim().split(/ = /gm)
    const [mappedKey, conversor] = configKeysMap[key]
    result[mappedKey] = conversor(value)
  }
  if (!isIVpnConfig(result)) {
    throw new ReadConfigFileError(result)
  }
  return result
}

export const isIVpnConfig = (obj: unknown): obj is IVpnConfig => {
  const config = obj as IVpnConfig
  const {
    vpnName,
    reconnectOnError,
    host,
    port,
    caFile,
    password,
    setDns,
    pppdUsePeerdns,
    username,
    trustedCert
  } = config
  return (
    !isNullOrUndefined(obj) &&
    typeof vpnName === 'string' &&
    typeof reconnectOnError === 'boolean' &&
    typeof host === 'string' &&
    typeof username === 'string' &&
    (isNullOrUndefined(port) || typeof port === 'number') &&
    (isNullOrUndefined(caFile) || typeof caFile === 'string') &&
    (isNullOrUndefined(password) || typeof password === 'string') &&
    (isNullOrUndefined(setDns) || typeof setDns === 'boolean') &&
    (isNullOrUndefined(pppdUsePeerdns) || typeof pppdUsePeerdns === 'boolean') &&
    (isNullOrUndefined(trustedCert) || typeof trustedCert === 'string')
  )
}
