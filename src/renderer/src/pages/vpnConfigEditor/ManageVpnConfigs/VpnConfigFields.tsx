import { FC } from 'react'
import { IVpnConfig } from '../../../../../models/IOpenFCItemConfig'
import { InputGroup } from '../../../components/InputGroup/InputGroup'
import { TextAreaGroup } from '../../../components/InputGroup/TextAreaGroup'

export interface VpnConfigFieldsProps {
  config: Partial<IVpnConfig>
  onConfigUpdate?: (newConfig: Partial<IVpnConfig>) => void
}

export const VpnConfigFields: FC<VpnConfigFieldsProps> = ({ config, onConfigUpdate }) => {
  const updateConfig = (configValue: string | boolean | number, configProp: string): void => {
    const newConfig = { ...(config ?? {}) }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newConfig[configProp as keyof IVpnConfig] = configValue === '' ? undefined : configValue
    if (onConfigUpdate) {
      onConfigUpdate(newConfig)
    }
  }

  return (
    <>
      <InputGroup
        id="host"
        type="text"
        name="host"
        label="Host"
        placeHolder="vpn.host.com"
        defaultValue={`${config?.host ?? ''}`}
        onBlur={(e) => {
          updateConfig(e.target.value.trim(), 'host')
        }}
      />
      <InputGroup
        id="port"
        type="text"
        name="port"
        label="Porta"
        placeHolder="10443"
        defaultValue={`${config?.port ?? '10443'}`}
        onBlur={(e) => {
          updateConfig(parseInt(e.target.value.trim()), 'port')
        }}
      />
      <InputGroup
        id="username"
        type="text"
        name="username"
        label="Nome de usuário"
        placeHolder="fulano"
        defaultValue={`${config?.username ?? ''}`}
        onBlur={(e) => {
          updateConfig(e.target.value.trim(), 'username')
        }}
      />
      <InputGroup
        id="password"
        type="password"
        name="password"
        label="Senha"
        defaultValue={`${config?.password ?? ''}`}
        onBlur={(e) => {
          updateConfig(e.target.value.trim(), 'password')
        }}
      />
      <TextAreaGroup
        id="trustedcert"
        name="trustedcert"
        label="Certificado"
        defaultValue={`${config?.trustedCert ?? ''}`}
        onBlur={(e) => {
          updateConfig(e.target.value.trim(), 'trustedCert')
        }}
      />
    </>
  )
}
