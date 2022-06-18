// Custom Title Bar package.
const customTitlebar = require('custom-electron-titlebar');

window.addEventListener('DOMContentLoaded', () => {
	new customTitlebar.Titlebar({
		backgroundColor: customTitlebar.Color.fromHex('#262d4a'),
	});

	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	};

	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type]);
	}
});
