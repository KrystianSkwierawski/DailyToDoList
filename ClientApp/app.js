const { app, BrowserWindow } = require('electron')
let win;

const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function createWindow() {
  win = new BrowserWindow({
    width: 575,
    height: 800,
    minWidth: 330,
    minHeight: 460,
    autoHideMenuBar: true,
    //icon: `file://${__dirname}/dist/assets/logo.png`
  })

  win.loadURL(`file://${__dirname}/dist/index.html`)

  // win.webContents.openDevTools()

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})
