import { FC, useEffect, useState } from 'react'
import { Modal } from '../../components/modal/Modal'
import { InputGroup } from '../../components/InputGroup/InputGroup'
import {
  HorizontalContainerPadding,
  VerticalContainerPadding
} from '../../components/containers/verticalContainerPadding/VerticalContainerPadding'
import { Button, PrimaryButton } from '../../components/buttons/Button'
import { SwitchInputGroup } from '../../components/InputGroup/SwitchInputGroup'
import {
  ContainerSectionColumn,
  ContainerSectionRow
} from '../../components/containers/containerSection/ContainerSectionRow'
import { isIVpnConfig, IVpnConfig } from '../../../../models/IOpenFCItemConfig'
import { VpnConfigFields } from './ManageVpnConfigs/VpnConfigFields'

export interface VpnConfigCreatorProps {
  configName?: string
  onDone: () => void
}

export const VpnConfigEditor: FC<VpnConfigCreatorProps> = ({ configName, onDone }) => {
  const [config, setConfig] = useState<Partial<IVpnConfig>>({})
  useEffect(() => {
    if (!configName) {
      return
    }
    ;(async (): Promise<void> => {
      const savedConfig = (await window.api.openConfig(configName)) ?? {}
      setConfig(savedConfig)
    })()
  }, [configName])

  const saveConfig = async (): Promise<void> => {
    if (isIVpnConfig(config)) {
      await window.api.saveConfig(configName ?? config.vpnName, config)
    }
  }

  const updateConfig = (vpnConfig: Partial<IVpnConfig>): void => {
    if (
      Object.entries(vpnConfig).every(([key, value]) => {
        return config[key] === value
      })
    ) {
      return
    }
    setConfig((prevState) => {
      prevState = vpnConfig
      return { ...prevState }
    })
  }

  return (
    <Modal>
      <VerticalContainerPadding>
        <HorizontalContainerPadding>
          <ContainerSectionColumn>
            <InputGroup
              id="vpnname"
              label="Nome da Vpn"
              type="text"
              name="vpnname"
              onBlur={(e) => {
                const newValue = e.target.value.trim()
                setConfig((prevState) => ({
                  ...prevState,
                  vpnName: newValue !== '' ? newValue : undefined
                }))
              }}
              defaultValue={config?.vpnName}
            />
            <SwitchInputGroup
              id="reconectonerror"
              label="Tentar reconectar ao ocorrer erro"
              name="reconectonerror"
              checked={config.reconnectOnError ?? false}
              onChange={(e) => {
                setConfig((prevState) => ({ ...prevState, reconnectOnError: e.target.checked }))
              }}
            />

            <VpnConfigFields
              config={config}
              onConfigUpdate={(newConfig) => updateConfig(newConfig)}
            />
            <ContainerSectionRow>
              <Button onClick={onDone}>Fechar</Button>
              <PrimaryButton onClick={saveConfig}>Salvar</PrimaryButton>
            </ContainerSectionRow>
          </ContainerSectionColumn>
        </HorizontalContainerPadding>
      </VerticalContainerPadding>
    </Modal>
  )
}
