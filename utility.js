const { dialog,ipcMain  } = require('electron')
const fs = require('fs')
const { shell } = require('electron')

module.exports.openFileHandler = async () => {
	const { filePaths } = await dialog.showOpenDialog({ properties: ['openFile'] })
	const filename = filePaths[0].split('\\').slice(-1)[0]

	global.filePath = filePaths[0]

	fs.readFile(filePaths[0],'utf8',(err, data) => {
	   if (err) return console.log("Error...",err);
	    
	   //send data to ui
	   mainWindow.webContents.send('data', data)
	});
	mainWindow.setTitle(filename)
}

module.exports.saveFileHandler = () => {
	if (global.filePath == undefined || global.filePath == null) {
		global.filePath = 'untitled'
	}

	fs.writeFile(filePath,data,(err,data) => {
		if (err) return console.log("Error...",err)

		dialog.showMessageBox(mainWindow,{
			message: 'File saved successfully',
			title: 'Saved'
		})
	})
}	

module.exports.shellFileHandler = async () => {
	//check if user is working on a valid file
	if (global.filePath == undefined || global.filePath == null) {
		dialog.showErrorBox('Error','Cannot open untitled. File type should be html')
		return;
	}
	//open the file in browser
	await shell.openExternal(filePath)
}

module.exports.formatCode = {
	js: () => {
		mainWindow.webContents.send('formatjs');
	},
	css: () => {
		mainWindow.webContents.send('formatcss');
	},
	html: () => {
		mainWindow.webContents.send('formathtml');
	}
}