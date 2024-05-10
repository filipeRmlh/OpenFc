import { ChangeEventHandler, FC, FocusEventHandler } from 'react'
import { InputGroupContainer, InputGroupInput, InputGroupLabel } from './InputGroupStyled'

export interface InputGroupProps {
  id: string
  label: string
  type: string
  name: string
  style?: Record<string, never>
  className?: string
  defaultValue?: string
  placeHolder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  disabled?: boolean
}

export const InputGroup: FC<InputGroupProps> = ({
  id,
  onChange,
  label,
  type,
  name,
  style,
  className,
  defaultValue,
  placeHolder,
  onBlur,
  disabled
}) => {
  return (
    <InputGroupContainer style={style} className={className}>
      <InputGroupLabel htmlFor={id}>{label}</InputGroupLabel>
      <InputGroupInput
        disabled={disabled}
        name={name}
        id={id}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </InputGroupContainer>
  )
}
