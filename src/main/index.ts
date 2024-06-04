import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
// import * as path from 'node:path'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {
  mainExecuteCommand,
  mainGetCurrentDir,
  mainIsMySQLServerRunning,
  mainJoinPath,
  mainReadMySQLConfigJson,
  mainWriteMySQLConfigJson,
  stopMySQLServer
} from './lib/mainLib'
import { MySQLConfig } from '@shared/types/mysql_config'

// const windows: BrowserWindow[] = []

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Add the window to the global windows array
  // windows.push(mainWindow)

  mainWindow.on('close', async (e) => {
    e.preventDefault() // Prevents the window from closing

    const choice = await dialog.showMessageBox(mainWindow, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit? The MySQL server will be stopped.'
    })

    if (choice.response === 0) {
      // If the user clicked 'Yes'
      // Stop the MySQL server
      // IPC call for stopping the server
      await stopMySQLServer()
      mainWindow.destroy()
      app.quit()
    }
  })

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

  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('stop-mysql-server', () => stopMySQLServer())
  ipcMain.handle('read-mysql-config', (_, fullPath: string) => mainReadMySQLConfigJson(fullPath))
  ipcMain.handle('write-mysql-config', (_, fullPath: string, config: MySQLConfig) =>
    mainWriteMySQLConfigJson(fullPath, config)
  )
  ipcMain.handle(
    'is-mysql-server-running',
    (_, host: string, port: number, user: string, password: string | null) =>
      mainIsMySQLServerRunning(host, port, user, password)
  )
  ipcMain.handle('get-current-directory', () => mainGetCurrentDir())
  ipcMain.handle('join-path-segments', (_, ...segments: string[]) => mainJoinPath(...segments))
  ipcMain.handle('execute-command', (_, command: string, timeout?: number) =>
    mainExecuteCommand(command, timeout)
  )

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('before-quit', async () => {
//   // Send a message to the renderer process of each window to stop the MySQL server
//   for (const window of windows) {
//     if (!window.isDestroyed()) {
//       window.webContents.send('stop-mysql-server')
//     }
//   }

//   // Wait a bit for the renderer processes to handle the message
//   await new Promise((resolve) => setTimeout(resolve, 2000))
// })
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
