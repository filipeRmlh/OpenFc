import { ChangeEventHandler, FC, FocusEventHandler } from 'react'
import { InputGroupContainer, InputGroupLabel } from './InputGroupStyled'
import { SwitchInput } from './SwitchInput'

export interface TextAreaGroupProps {
  id: string
  label: string
  name: string
  style?: Record<string, never>
  className?: string
  placeHolder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
}

export const SwitchInputGroup: FC<TextAreaGroupProps> = ({
  id,
  label,
  name,
  style,
  className,
  onChange,
  defaultChecked,
  disabled,
  checked
}) => {
  return (
    <InputGroupContainer style={style} className={className}>
      <InputGroupLabel htmlFor={id}>{label}</InputGroupLabel>
      <SwitchInput
        checked={checked}
        disabled={disabled}
        name={name}
        id={id}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
    </InputGroupContainer>
  )
}
