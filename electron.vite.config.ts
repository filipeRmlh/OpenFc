import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import ifDefLoader from 'vite-plugin-ifdef'

export default defineConfig((command) => {
  return {
    main: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'ifdef-define': {
        isDev: command.mode === 'development'
      },
      'ifdef-option': {
        verbose: false
      },
      plugins: [externalizeDepsPlugin(), ifDefLoader.default()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [react()]
    }
  }
})
