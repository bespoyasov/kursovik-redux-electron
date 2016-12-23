const electron = require('electron')
const path = require('path')
const app = electron.app
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow

let mainWindow, tray;

require('electron-context-menu')({
  prepend: (params, browserWindow) => [{
    visible: params.mediaType === 'text'
  }],
  showInspectElement: false,
  labels: {
    copy: 'Скопировать'
  },
});

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {webSecurity: false},
    icon: path.join(__dirname, 'assets/app-icon.png')
  })

  //mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.loadURL(`http://localhost:8080`);

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  // tray = new Tray('http://localhost:8080/public/img/icon.png')
  // const contextMenu = Menu.buildFromTemplate([
  //   {label: 'Item1', type: 'radio'},
  //   {label: 'Item2', type: 'radio'},
  //   {label: 'Item3', type: 'radio', checked: true},
  //   {label: 'Item4', type: 'radio'}
  // ])
  // tray.setToolTip('This is my application.')
  // tray.setContextMenu(contextMenu)
}

app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('--disable-web-security');

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
