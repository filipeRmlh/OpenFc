import { ChangeEventHandler, FC, FocusEventHandler } from 'react'
import { InputGroupContainer, InputGroupLabel, InputGroupTextArea } from './InputGroupStyled'

export interface TextAreaGroupProps {
  id: string
  label: string
  name: string
  style?: Record<string, never>
  className?: string
  placeHolder?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
  defaultValue?: string
}

export const TextAreaGroup: FC<TextAreaGroupProps> = ({
  id,
  label,
  name,
  style,
  className,
  placeHolder,
  onChange,
  onBlur,
  defaultValue
}) => {
  return (
    <InputGroupContainer style={style} className={className}>
      <InputGroupLabel htmlFor={id}>{label}</InputGroupLabel>
      <InputGroupTextArea
        name={name}
        id={id}
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
      />
    </InputGroupContainer>
  )
}
