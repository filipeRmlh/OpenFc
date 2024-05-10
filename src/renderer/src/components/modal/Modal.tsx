import { Layer2 } from '../layers/Layer2'
import { FC, ReactElement } from 'react'
import { ModalLayerWrapper } from './ModalStyled'
import { Card } from '../containers/containerSection/ContainerSectionRow'

interface ModalProps {
  children?: ReactElement | ReactElement[]
}

export const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <Layer2>
      <ModalLayerWrapper>
        <Card>{children}</Card>
      </ModalLayerWrapper>
    </Layer2>
  )
}
