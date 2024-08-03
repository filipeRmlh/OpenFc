import styled from 'styled-components'

const modalRadiusPadding = '20px'

interface ContainerSectionRowProps {
  justifyContent?: 'left' | 'right' | 'center'
}

export const ContainerSectionRow = styled.div<ContainerSectionRowProps>`
  display: flex;
  width: 100%;
  justify-content: ${({ justifyContent }): string => justifyContent ?? 'unset'};
  flex-direction: row;
  box-sizing: border-box;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
`

interface ContainerSectionColumnProps {
  justifyContent?: 'start' | 'end' | 'center' | 'stretch'
  flexGrow?: number
  flexShrink?: number
}

export const ContainerSectionColumn = styled.div<ContainerSectionColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }): string => justifyContent ?? 'unset'};
  flex-grow: ${({ flexGrow }): string => `${flexGrow ?? 'unset'}`};
  flex-shrink: ${({ flexShrink }): string => `${flexShrink ?? 'unset'}`};
  box-sizing: border-box;
  width: 100%;
  & > *:not(:first-child) {
    margin-top: 10px;
  }
`

export const Card = styled.div`
  background-color: white;
  justify-content: stretch;
  display: flex;
  border-radius: ${modalRadiusPadding};
  flex-direction: column;
  width: 100%;
  min-height: 80px;
`
