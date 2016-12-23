const electron = require('electron')
const path = require('path')
const app = electron.app
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow

let mainWindow = null, tray = null;

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
    height: 700,
    webPreferences: {webSecurity: false},
    icon: path.join(__dirname, 'assets/app-icon.png')
  })

  mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  //mainWindow.loadURL(`http://localhost:8080`);

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  if (!tray) {
    tray = new Tray(path.join(__dirname, 'assets/tray-icon.png'))
    tray.setToolTip('Открыть Курсовик')
    tray.on('click', () => {
      if (mainWindow !== null) mainWindow.show();
      else createWindow()
    })
  }
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
