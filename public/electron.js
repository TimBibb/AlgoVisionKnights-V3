const { app, BrowserWindow } = require('electron');
const path = require('path');
const isdev = require('electron-is-dev');
const { start } = require('repl');

let win;

const createWindow = () => {
	win = new BrowserWindow({
		width: 1500,
		height: 1000,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.setMenu(null);

	// Runs on localhost:3000 if in development mode other url in production mode.
	const startURL = isdev
		? 'http://localhost:3000'
		: `file://${path.join(__dirname, '../build/index.html')}`;

	win.loadURL(startURL);

	// Open DevTools for debugging purposes
	// win.webContents.openDevTools();

	win.on('closed', () => (win = null));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});
