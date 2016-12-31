const electron = require('electron')
const path = require('path')
const app = electron.app
const ipcMain = electron.ipcMain
const Menu = electron.Menu;
const Tray = electron.Tray;
const BrowserWindow = electron.BrowserWindow

let mainWindow = null, tray = null;


const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'copy' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Report an issue',
        click () {
          require('electron')
            .shell
            .openExternal('https://github.com/bespoyasov/kursovik-redux-electron/issues')
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
  //Edit menu.
  template[1].submenu.push(
    { type: 'separator' },
    { label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}



require('electron-context-menu')({
  prepend: (params, browserWindow) => [{
    visible: params.mediaType === 'text'
  }],
  labels: {
    copy: 'Скопировать'
  },
  showInspectElement: false,
});


function createWindow() {
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)

  if (!tray) {
    function getBuiltContextMenu(label) {
      return Menu.buildFromTemplate([
        {label: label, click() {
          if (mainWindow !== null) {
            mainWindow.show();
            mainWindow.focus();
          }
          else createWindow()
        }},
      ])
    }

    tray = new Tray(path.join(__dirname, 'assets/icon_tray.png'))
    let contextMenu = getBuiltContextMenu('Открыть курсовик')
    tray.setContextMenu(contextMenu)

    // change option title in tray
    ipcMain.on('sent-course', (event, courseStr) => {
      contextMenu = getBuiltContextMenu(courseStr);
      tray.setToolTip(courseStr);
      tray.setContextMenu(contextMenu)
    })
  }

  mainWindow = new BrowserWindow({
    width: 560,
    height: 660,
    webPreferences: {webSecurity: false},
    icon: path.join(__dirname, 'assets/app-icon.png')
  })

  //mainWindow.loadURL(`file://${__dirname}/public/index.html`)
  mainWindow.loadURL(`http://localhost:8080`);

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}


app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('--disable-web-security');

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
