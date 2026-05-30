const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true
  });

  win.maximize();

  // প্রথমে Splash
  win.loadFile(path.join(__dirname, "splash.html"));

  // 7 সেকেন্ড পরে Website
  setTimeout(() => {
    win.loadURL("https://classroutinetime.vercel.app");
  }, 7000);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});