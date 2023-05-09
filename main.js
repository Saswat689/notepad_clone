const { app, BrowserWindow,ipcMain,dialog,Menu  } = require('electron')
const path = require('path')
const menutemplate = require('./menutemplate.js')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname,'favicon.ico')
  })

  global.mainWindow = mainWindow

  ipcMain.on('updatedata', (event, data) => {
    global.data = data
  })


  const menu = Menu.buildFromTemplate(menutemplate)
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})