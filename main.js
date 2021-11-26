// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const ipc = ipcMain
const { getData } = require("./fonctionsScraping.js");




function createWindow (w, h) {
  // Create the browser window.
  let size = 500;
  const mainWindow = new BrowserWindow({
    
    width: size,
    height: size,
    x:w-size,
    y:h-size,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools : true,
      preload: path.join(__dirname, 'preload.js')
    },
    resizable: false,
    frame:false
  })


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  ipc.on('closeApp', ()=>{
    console.log("close");
    mainWindow.close()
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

getData().then(value => {
    if (value){
      app.whenReady().then(() => {
        // We cannot require the screen module until the app is ready.
        const { screen } = require('electron')

        // Create a window that fills the screen's available work area.
        const primaryDisplay = screen.getPrimaryDisplay()
        const { width, height } = primaryDisplay.workAreaSize
        createWindow(width,height)
      
        app.on('activate', function () {
          // On macOS it's common to re-create a window in the app when the
          // dock icon is clicked and there are no other windows open.
          if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
      })
      
      // Quit when all windows are closed, except on macOS. There, it's common
      // for applications and their menu bar to stay active until the user quits
      // explicitly with Cmd + Q.
      app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
      })
    }
    else{
      app.quit();
    }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
