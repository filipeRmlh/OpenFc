import { FC, MouseEvent as ReactMouseEvent } from 'react'
import { Header } from '../../components/header/Header'
import { PrimaryButton } from '../../components/buttons/Button'
import { Logo } from '../../components/header/logo/Logo'
import { NavContainer } from '../../components/header/NavContainer'

export interface HeaderAreaProps {
  newVpnConfigHandler: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const HeaderArea: FC<HeaderAreaProps> = ({ newVpnConfigHandler }) => {
  return (
    <Header>
      <Logo src="resource://icon.png" />
      <NavContainer>
        <PrimaryButton onClick={newVpnConfigHandler}>Novo</PrimaryButton>
      </NavContainer>
    </Header>
  )
}
