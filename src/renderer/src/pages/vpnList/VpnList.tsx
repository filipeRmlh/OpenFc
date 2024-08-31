import { FC, MouseEvent as ReactMouseEvent } from 'react'
import { ConnectionStatusEnum } from '../../../../models/main/services/IVpnGroupConnectionService'
import { AlertButton, Button } from '../../components/buttons/Button'
import {
  ListCard,
  ListCardContainer,
  ListCardFirstColumn,
  ListCardIndicator,
  ListCardSecondColumn
} from '../../components/listCard/ListCard'

const readableStatusMapping: Record<keyof typeof ConnectionStatusEnum, string> = {
  Connected: 'Conectado',
  Connecting: 'Conectando...',
  Disconnected: 'Desconectado'
}

const getConnectButtonLabel = (status: ConnectionStatusEnum) => {
  switch (status) {
    case ConnectionStatusEnum.Connected:
      return 'Desconectar'
    case ConnectionStatusEnum.Disconnected:
      return 'Conectar'
    default:
      return 'Aguarde'
  }
}

export interface VpnListProps {
  configStatus?: Record<string, ConnectionStatusEnum>
  configNames: string[]

  onEditClick: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>, name: string) => void

  onConnectionToggleClick: (
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void

  onDeleteClick: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>, name: string) => void
}

export const VpnList: FC<VpnListProps> = ({
  configNames,
  configStatus,
  onConnectionToggleClick,
  onEditClick,
  onDeleteClick
}) => {
  return (
    <ListCardContainer className="container">
      {configNames.map((name, key) => {
        const statusEnumString =
          ConnectionStatusEnum[configStatus?.[name] ?? ConnectionStatusEnum.Disconnected]
        return (
          <ListCard key={key}>
            <ListCardFirstColumn>
              <ListCardIndicator className={statusEnumString.toLowerCase()} />
              {name}({readableStatusMapping[statusEnumString]})
            </ListCardFirstColumn>
            <ListCardSecondColumn>
              <Button
                disabled={(configStatus ?? {})[name] !== ConnectionStatusEnum.Disconnected}
                onClick={(event) => onEditClick(event, name)}
              >
                Editar
              </Button>
              <Button
                disabled={(configStatus ?? {})[name] === ConnectionStatusEnum.Connecting}
                onClick={(event) => onConnectionToggleClick(event, name)}
              >
                {getConnectButtonLabel(
                  configStatus ? configStatus[name] : ConnectionStatusEnum.Disconnected
                )}
              </Button>
              <AlertButton onClick={(event) => onDeleteClick(event, name)}>Excluir</AlertButton>
            </ListCardSecondColumn>
          </ListCard>
        )
      })}
    </ListCardContainer>
  )
}
