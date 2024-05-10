import styled from 'styled-components'

export const VerticalContainerPadding = styled.div`
  display: flex;
  height: calc(100% - 40px);
  width: 100%;
  flex-direction: column;
  padding: 20px 0;
`

export const HorizontalContainerPadding = styled.div`
  display: flex;
  height: 100%;
  width: calc(100% - 40px);
  flex-direction: row;
  padding: 0 20px;
`
