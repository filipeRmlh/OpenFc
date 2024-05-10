import { FC, ReactElement, useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface Layer2Props {
  children?: ReactElement | ReactElement[]
}

export const Layer2: FC<Layer2Props> = ({ children }) => {
  const element = document.querySelector('#layer2')
  useEffect(() => {
    if (!element) {
      return
    }
    element.setAttribute('opened', '')
    return () => {
      element.removeAttribute('opened')
    }
  }, [])

  return element ? createPortal(children, element) : null
}
