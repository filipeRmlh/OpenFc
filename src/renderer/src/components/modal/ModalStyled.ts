import styled from 'styled-components'

export const ModalLayerWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 20px;
  & > * {
    max-width: 800px;
    width: 100%;
    margin: auto;
  }
  scroll-behavior: smooth;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`
