import { MouseEvent as ReactMouseEvent } from 'react'
import { ConnectionStatusEnum } from '../../../models/main/services/IVpnGroupConnectionService'

export interface UseAppHandlersReturn {
  editVpnConfigHandler: (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void
  newVpnConfigHandler: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void
  deleteVpnConfigHandler: (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void
  connectToVpnConfigHandler: (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void
  trustCertModalResultHandler: (acceptTrustCertificate: boolean) => Promise<void>
}

export const useAppHandlers = ({
  setSelectedConfig,
  setOpenedEditor,
  updateList,
  configStatus,
  trustCertData,
  setTrustCertData
}): UseAppHandlersReturn => {
  const editVpnConfigHandler = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ): void => {
    event.stopPropagation()
    event.preventDefault()
    setSelectedConfig(name)
    setOpenedEditor(true)
  }

  const newVpnConfigHandler = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.stopPropagation()
    event.preventDefault()
    setSelectedConfig(undefined)
    setOpenedEditor(true)
  }

  const deleteVpnConfigHandler = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ): void => {
    event.stopPropagation()
    event.preventDefault()
    window.api.deleteConfig(name)
    updateList()
  }

  const connectToVpnConfigHandler = (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ): void => {
    event.stopPropagation()
    event.preventDefault()
    if ((configStatus ?? {})[name] === ConnectionStatusEnum.Connected) {
      window.api.disconnect(name)
    } else {
      window.api.connect(name)
    }
  }

  const trustCertModalResultHandler = async (acceptTrustCertificate: boolean): Promise<void> => {
    if (!trustCertData) {
      return
    }
    if (acceptTrustCertificate) {
      await window.api.trustCert(trustCertData.name, trustCertData.trustCertValue)
    } else {
      await window.api.unTrustCert(trustCertData.name)
    }
    setTrustCertData(undefined)
  }

  return {
    editVpnConfigHandler,
    newVpnConfigHandler,
    deleteVpnConfigHandler,
    connectToVpnConfigHandler,
    trustCertModalResultHandler
  }
}
