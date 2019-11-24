const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

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

    if (process.platform === 'darwin') {
        const template = [
          {
            label: 'To Do', 
                submenu: [
                {
                    label: 'Add Item',
                },
                {
                    label: 'Clear Item'
                },
                {
                    label: 'Quit To Do',
                    role: 'quit'
                }
                ],
          },
          {
            label: 'Edit', submenu: [
              { role: 'undo' },
              { role: 'redo' },
              { role: 'separator' },
              { role: 'cut' },
              { role: 'copy' },
              { role: 'paste' },
              { role: 'pasteandmatchstyle' },
              { role: 'delete' },
              { role: 'selectall' },
            ],
          },
          {
            label: 'Help', submenu: [
              { role: 'reload' },
              { role: 'toggleDevTools' },
            ],
          },
        ];
        template.unshift({label: '', role: 'To Do'});
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));
      } else {
        const template = [
            {
                label: 'File', 
                    submenu: [
                    {
                        label: 'Add Item',
                    },
                    {
                        label: 'Clear Item'
                    },
                    {
                        label: 'Quit To Do',
                        role: 'quit',
                        accelerator: 'Ctrl+Shift+Q'
                    }
                    ],
              },
            {
              label: 'Edit', submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { role: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteandmatchstyle' },
                { role: 'delete' },
                { role: 'selectall' },
              ],
            },
            {
              label: 'Help', submenu: [
                { role: 'reload' },
                { role: 'toggleDevTools' },
              ],
            },
          ];
          Menu.setApplicationMenu(Menu.buildFromTemplate(template));
      }
});

//Create menu template
// Mac App menu - used for styling so shortcuts work
