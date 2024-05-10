import { ChangeEventHandler, FC } from 'react'
import { SwitchInputCheck, SwitchInputKey, SwitchInputPill } from './InputGroupStyled'
interface SwitchInputProps {
  id: string
  name?: string
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  checked?: boolean
}
export const SwitchInput: FC<SwitchInputProps> = ({
  id,
  name,
  defaultChecked,
  disabled,
  onChange,
  checked
}) => {
  return (
    <>
      <SwitchInputCheck
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
      />
      <SwitchInputPill htmlFor={id}>
        <SwitchInputKey />
      </SwitchInputPill>
    </>
  )
}
