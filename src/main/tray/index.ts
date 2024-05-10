import { BrowserWindow, Tray, Menu } from 'electron'
import { IAppContext } from '../../models/IAppContext'
import { nativeImage, NativeImage } from 'electron'
import path from 'path'

const getIcon = (): NativeImage => {
  return nativeImage.createFromPath(path.join(__dirname, '../../resources/icon.png'))
}
export const loadTray = (appContext: IAppContext, showWindowCallback: () => void): void => {
  appContext.tray = new Tray(getIcon())
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar/Ocultar',
      type: 'normal',
      click: (): void => {
        if (BrowserWindow.getAllWindows().length === 0) {
          showWindowCallback()
        } else {
          appContext.win?.close()
        }
      }
    },
    {
      label: 'Sair',
      type: 'normal',
      click: (): void => {
        appContext.app?.quit()
      }
    }
  ])
  appContext.tray?.on('click', () => {
    appContext.win?.show()
  })
  appContext.tray?.setContextMenu(contextMenu)
}
