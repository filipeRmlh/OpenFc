import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        width: 100vw;
        min-height: 100vh;
    }
    #layer2 {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      &[opened] {
        display: flex;
      }
    }
`
