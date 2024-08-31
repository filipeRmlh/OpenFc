import { app, shell, BrowserWindow, net, protocol } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { loadTray } from './tray'
import { loadIpc, destroyServices } from './ipc/ipcLoader'
import { nativeImage, NativeImage } from 'electron'
import { appContext } from './singletons/contextSingleton'
import { URL } from 'node:url'

const getIcon = (): NativeImage => {
  return nativeImage.createFromPath(path.join(__dirname, '../../resources/icon.png'))
}

appContext.app = app

const resourcesPath = path.join(__dirname, '../../resources/icon.png')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: getIcon(),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.setMenuBarVisibility(false)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  appContext.win = mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  protocol.handle('resource', (req) => {
    const pathToResource = new URL(req.url).pathname
    console.log('resource', resourcesPath, pathToResource)
    return net.fetch(`file://${resourcesPath}${pathToResource}`)
  })

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.filiperamalho.openfc')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  loadTray(appContext, () => {
    createWindow()
  })
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.on('quit', () => {
    destroyServices()
  })

  loadIpc()
})

app.on('window-all-closed', (event) => {
  event.preventDefault()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
