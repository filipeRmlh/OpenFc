import { FC } from 'react'
import { VpnConfigEditor } from './pages/vpnConfigEditor/VpnConfigEditor'
import { AcceptTrustCert } from './pages/acceptTrustCertFeature/AcceptTrustCert'
import { useAppStates } from './appHooks/AppStates'
import { useAppHandlers } from './appHooks/AppHandlers'
import { VpnList } from './pages/vpnList/VpnList'
import { HeaderArea } from './pages/headerArea/HeaderArea'
import { BodyArea } from './components/containers/BodyArea'

export const App: FC = () => {
  const {
    configNames,
    setOpenedEditor,
    openedEditor,
    setSelectedConfig,
    selectedConfig,
    configStatus,
    trustCertData,
    setTrustCertData,
    updateList
  } = useAppStates()

  const {
    editVpnConfigHandler,
    newVpnConfigHandler,
    deleteVpnConfigHandler,
    connectToVpnConfigHandler,
    trustCertModalResultHandler
  } = useAppHandlers({
    setSelectedConfig,
    setOpenedEditor,
    updateList,
    configStatus,
    trustCertData,
    setTrustCertData
  })

  return (
    <>
      {openedEditor && (
        <VpnConfigEditor
          configName={selectedConfig}
          onDone={() => {
            setOpenedEditor(false)
            updateList()
          }}
        />
      )}
      {trustCertData ? (
        <AcceptTrustCert
          trustCertName={trustCertData.name}
          trustCertValue={trustCertData.trustCertValue}
          onDone={trustCertModalResultHandler}
        />
      ) : null}
      <HeaderArea newVpnConfigHandler={newVpnConfigHandler} />
      <BodyArea>
        <VpnList
          configStatus={configStatus}
          configNames={configNames}
          onEditClick={editVpnConfigHandler}
          onConnectionToggleClick={connectToVpnConfigHandler}
          onDeleteClick={deleteVpnConfigHandler}
        />
      </BodyArea>
    </>
  )
}
