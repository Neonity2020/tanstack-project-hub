import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === 'development';

let serverProcess = null;

function startServer() {
  if (isDev) {
    // 开发模式下使用 npm run dev
    serverProcess = spawn('npm', ['run', 'dev'], {
      shell: true,
      stdio: 'inherit'
    });
  } else {
    // 生产模式下使用 node 直接运行服务器
    const serverPath = path.join(__dirname, '../.output/server/index.mjs');
    serverProcess = spawn('node', [serverPath], {
      shell: true,
      stdio: 'inherit'
    });
  }

  serverProcess.on('error', (err) => {
    console.error('Failed to start server:', err);
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 在开发环境下加载本地服务器
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // 在生产环境下加载本地服务器
    mainWindow.loadURL('http://localhost:3000');
  }
}

app.whenReady().then(() => {
  startServer();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    if (serverProcess) {
      serverProcess.kill();
    }
    app.quit();
  }
}); 