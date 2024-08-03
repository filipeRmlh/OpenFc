import { Dispatch, useEffect, useState } from 'react'
import { ConnectionStatusEnum } from '../../../models/main/services/IVpnGroupConnectionService'

export interface TrustCertData {
  name: string
  trustCertValue: string
}

export interface UseAppStatesReturn {
  configNames: string[]
  selectedConfig?: string
  setSelectedConfig: Dispatch<string>
  setOpenedEditor: Dispatch<boolean>
  updateList: () => void
  configStatus?: Record<string, ConnectionStatusEnum>
  trustCertData?: TrustCertData
  setTrustCertData: Dispatch<TrustCertData>
  openedEditor: boolean
}

export const useAppStates = (): UseAppStatesReturn => {
  const [selectedConfig, setSelectedConfig] = useState<string>()
  const [openedEditor, setOpenedEditor] = useState(false)
  const [trustCertData, setTrustCertData] = useState<TrustCertData>()
  const [configStatus, setConfigStatus] = useState<Record<string, ConnectionStatusEnum>>()

  const [configNames, setConfignames] = useState<string[]>([])
  useEffect(() => {
    updateList()
    window.api.onConnect(({ name }) => {
      setConfigStatus((prevState) => ({ ...prevState, [name]: ConnectionStatusEnum.Connected }))
    })

    window.api.onConnecting(({ name }) => {
      setConfigStatus((prevState) => ({ ...prevState, [name]: ConnectionStatusEnum.Connecting }))
    })

    window.api.onDisconnect(({ name }) => {
      setConfigStatus((prevState) => ({ ...prevState, [name]: ConnectionStatusEnum.Disconnected }))
    })

    window.api.onAskTrustCert(({ name, trustCertValue }) => {
      setTrustCertData({ name, trustCertValue })
    })
  }, [])

  const updateList = (): void => {
    window.api.listConfigs().then((result) => {
      setConfignames(result)
    })
  }

  useEffect(() => {
    Promise.all(configNames.map((configName) => window.api.getStatus(configName))).then(
      (status) => {
        const resultRecord = {}

        status.forEach((status, index) => {
          resultRecord[configNames[index]] = status
        })
        setConfigStatus(resultRecord)
      }
    )
  }, [configNames])

  return {
    configNames,
    selectedConfig,
    setSelectedConfig,
    setOpenedEditor,
    updateList,
    configStatus,
    trustCertData,
    setTrustCertData,
    openedEditor
  }
}
