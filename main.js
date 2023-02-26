// Modules to control application life and create native browser window
const RPC = require("discord-rpc");
const {app, BrowserWindow} = require('electron')
const path = require('path')
const config = require("./config.json")
let pluginName //Flash player
switch (process.platform) {
	case 'win32':
		switch (process.arch) {
			case 'ia32':
			case 'x32':
				pluginName = 'flash/windows/32/pepflashplayer.dll'
				break
			case 'x64':
				pluginName = 'flash/windows/64/pepflashplayer.dll'
				break
			}
		break
	case 'linux':
		switch (process.arch) {
			case 'ia32':
			case 'x32':
				pluginName = 'flash/linux/32/libpepflashplayer.so'
				break
			case 'x64':
				pluginName = 'flash/linux/64/libpepflashplayer.so'
				break
			}
		
		app.commandLine.appendSwitch('no-sandbox');
		break
	case 'darwin':
		pluginName = 'flash/mac/PepperFlashPlayer.plugin'
		break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));
app.commandLine.appendSwitch("disable-http-cache");

// discord rpc
const rpc = new RPC.Client({
  transport: "ipc"
});

 rpc.on("ready", () => {
  rpc.setActivity({
    details: "Wrapper: Online - Developer Build",
    state: 'Testing',
    startTimestamp: new Date(),
    largeImageKey: "icon",
    largeImageText: "Wrapper: Online - Developer",
    smallImageKey: "Wrapper: Online - Developer",
    smallImagetext: "Wrapper: Online - Developer",
  });
});
rpc.login({
  clientId: "848923315044745237"
});

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, './preload.js'), //preload shit
      plugins: true //this is for flash
    }
  })
  // change this to wrapper.online when development is done and website is ready
   mainWindow.loadURL(config.website)

  // Remove menubar because stinky
   mainWindow.setMenuBarVisibility(false)

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
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
