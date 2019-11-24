const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

//listen for app to be ready
app.on('ready', () => {
    //create new browser window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true,
        

    }));

    //Quit app when closed
    mainWindow.on('closed', () => {
        app.quit()
    })

    if (process.platform === 'darwin') {menuTemplate.unshift({label: '', role: 'To Do'});}
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});

//handle createaddwindow

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add To Do Item',
        webPreferences: {
            nodeIntegration: true
        }
    });
    //load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Garbage collection handle
    addWindow.on('close', ()=> {
        addWindow = null;
    });
}

//catch item add
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
})

//Menu Template
const menuTemplate = [
    {
      label: 'To Do', 
          submenu: [
          {
              label: 'Add Item',
              click () {
                  createAddWindow();
              },
              accelerator: process.platform === 'darwin' ? 'Cmd+A' : 'Ctrl+A'
            },
          {
              label: 'Clear Item'
          },
          {
              label: 'Quit To Do',
              role: 'quit',
              accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q'
          }
          ],
    }
  ];

  //Add developer tools if not in production
  if (process.env.NODE_ENV !== 'production') {
      menuTemplate.push({
          label: 'DevTools',
          submenu: [
              {
                  label: 'Toggle DevTools',
                  role: 'toggleDevTools',
                  accelerator: process.platform === 'darwin' ? 'Cmd+D' : 'Ctrl+D'

              },
              {
                  label: 'Reload',
                  role: 'forceReload',
                  accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Ctrl+R'

              },
              {
                  label: 'Toggle Full Screen',
                  role: 'togglefullscreen',
                  accelerator: process.platform === 'darwin' ? 'Cmd+F' : 'Ctrl+F'

              }
          ]
      })
  }