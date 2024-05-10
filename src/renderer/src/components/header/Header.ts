import styled from 'styled-components'

export const Header = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 15px;
  width: calc(100% - 20px);
  height: 60px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  min-width: 500px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2), -1px -1px 2px rgba(0,0,0,0.1);
`
