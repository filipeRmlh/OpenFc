import styled, { css, RuleSet } from 'styled-components'
import { NoInfer } from 'styled-components/dist/types'

interface ButtonColorTheme {
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  disabledBackgroundColor?: string
  disabledTextColor?: string
  disabledBorderColor?: string
}

const createButtonStyle = ({
  backgroundColor,
  hoverBackgroundColor,
  textColor,
  hoverTextColor,
  borderColor,
  hoverBorderColor,
  disabledTextColor,
  disabledBackgroundColor,
  disabledBorderColor
}: ButtonColorTheme): RuleSet<NoInfer<object>> => {
  return css`
    font-weight: bold;
    border-radius: 5px;
    background: ${backgroundColor ?? '#e3e3e3'};
    color: ${textColor ?? '#444'};
    border: 1px solid ${borderColor ?? '#ccc'};
    min-height: 40px;
    min-width: 40px;
    padding: 0 10px 0 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:not(:disabled):not(.disabled) {
      &:hover,
      &:focus {
        background: ${hoverBackgroundColor ?? backgroundColor ?? '#d2d2d2'};
        color: ${hoverTextColor ?? textColor ?? '#222'};
        border: 1px solid ${hoverBorderColor ?? borderColor ?? '#ccc'};
      }
    }

    &:disabled,
    &.disabled {
      color: ${disabledTextColor ?? '#8c8c8c'};
      background-color: ${disabledBackgroundColor ?? '#b2b2b2'};
      border: 1px solid ${disabledBorderColor ?? '#9d9d9d'};
      cursor: not-allowed;
    }
  `
}

export const Button = styled.button`
  ${createButtonStyle({})}
`

export const PrimaryButton = styled.button`
  ${createButtonStyle({
    backgroundColor: '#008d8d',
    hoverBackgroundColor: '#019f9f',
    textColor: '#ffffff',
    borderColor: '#019f9f',
    disabledTextColor: '#ffffff',
    disabledBackgroundColor: '#5b8c8c',
    disabledBorderColor: '#679e9e'
  })}
`

export const AlertButton = styled.button`
  ${createButtonStyle({
    backgroundColor: '#cf003e',
    hoverBackgroundColor: '#ec0345',
    textColor: '#ffffff',
    borderColor: '#ec0345',
    disabledTextColor: '#ffffff',
    disabledBackgroundColor: '#cf95a6',
    disabledBorderColor: '#cf95a6'
  })}
`

export const PrimaryOutlineButton = styled.button`
  ${createButtonStyle({
    backgroundColor: '#ffffff',
    hoverBackgroundColor: '#019f9f',
    textColor: '#008d8d',
    hoverTextColor: '#fff',
    borderColor: '#019f9f',
    disabledTextColor: '#5b8c8c',
    disabledBackgroundColor: '#ffffff',
    disabledBorderColor: '#679e9e'
  })}
`

export const AlertOutlineButton = styled.button`
  ${createButtonStyle({
    backgroundColor: '#ffffff',
    hoverBackgroundColor: '#ec0345',
    textColor: '#cf003e',
    hoverTextColor: '#fff',
    borderColor: '#ec0345',
    disabledTextColor: '#cf95a6',
    disabledBackgroundColor: '#ffffff',
    disabledBorderColor: '#cf95a6'
  })}
`
