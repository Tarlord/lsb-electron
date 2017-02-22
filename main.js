import electron, { BrowserWindow, app, ipcMain, Menu } from 'electron'

let mainWindow = null
let stream = null

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1078, height: 720})
  mainWindow.loadURL('file://' + __dirname + '/views/index.html')
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
})

function openStreamWindow (data) {
  let monitorSize = electron.screen.getAllDisplays()[0].size
  stream = new BrowserWindow({width: monitorSize * 0.7, height: monitorSize.height * 0.6, title: data.display_name})
  stream.setPosition(0, 0)
  stream.loadURL('file://' + __dirname + '/views/stream.html')
  // stream.webContents.openDevTools()
  stream.webContents.on('did-finish-load', () => {
    // console.log('did finish load')
    stream.webContents.send('streamData', data)
  })
  // stream.loadURL(data.url)
  stream.on('closed', () => { stream = null })
}

ipcMain.on('openStream', (event, data) => {
  if (stream) {
    stream.webContents.send('streamData', data)
  } else {
    openStreamWindow(data)
  }
})
