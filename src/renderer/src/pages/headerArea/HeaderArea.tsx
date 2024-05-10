import { FC, MouseEvent as ReactMouseEvent } from 'react'
import { Header } from '../../components/header/Header'
import { PrimaryButton } from '../../components/buttons/Button'

export interface HeaderAreaProps {
  newVpnConfigHandler: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const HeaderArea: FC<HeaderAreaProps> = ({ newVpnConfigHandler }) => {
  return (
    <Header>
      <PrimaryButton onClick={newVpnConfigHandler}>Novo</PrimaryButton>
    </Header>
  )
}
