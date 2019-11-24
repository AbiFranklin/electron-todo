const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

//listen for app to be ready
app.on('ready', () => {
    //create new browser window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    if (process.platform === 'darwin') {menuTemplate.unshift({label: '', role: 'To Do'});}
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
});

//handle createaddwindow

function createAddWindow(){
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add To Do Item'
    });
    //load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
}

//Menu Template
const menuTemplate = [
    {
      label: 'To Do', 
          submenu: [
          {
              label: 'Add Item',
              click () {
                  createAddWindow();
              }
          },
          {
              label: 'Clear Item'
          },
          {
              label: 'Quit To Do',
              role: 'quit'
          }
          ],
    }
  ];