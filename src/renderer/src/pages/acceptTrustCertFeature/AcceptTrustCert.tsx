import { FC } from 'react'
import { Modal } from '../../components/modal/Modal'
import {
  HorizontalContainerPadding,
  VerticalContainerPadding
} from '../../components/containers/verticalContainerPadding/VerticalContainerPadding'
import { AlertButton, PrimaryButton } from '../../components/buttons/Button'
import {
  ContainerSectionColumn,
  ContainerSectionRow
} from '../../components/containers/containerSection/ContainerSectionRow'

export interface VpnConfigCreatorProps {
  trustCertName?: string
  trustCertValue?: string
  onDone: (result: boolean) => void
}

export const AcceptTrustCert: FC<VpnConfigCreatorProps> = ({
  onDone,
  trustCertName,
  trustCertValue
}) => {
  return (
    <Modal>
      <VerticalContainerPadding>
        <HorizontalContainerPadding>
          <ContainerSectionColumn>
            <h2>Aceitar o certificado abaixo para {trustCertName}?</h2>
            <p>{trustCertValue}</p>
            <ContainerSectionRow>
              <PrimaryButton onClick={() => onDone(true)}>Sim</PrimaryButton>
              <AlertButton onClick={() => onDone(false)}>Não</AlertButton>
            </ContainerSectionRow>
          </ContainerSectionColumn>
        </HorizontalContainerPadding>
      </VerticalContainerPadding>
    </Modal>
  )
}
