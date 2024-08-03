import { Tray, App, BrowserWindow } from 'electron'

export interface IAppContext {
  tray?: Tray
  win?: BrowserWindow
  app?: App
}
