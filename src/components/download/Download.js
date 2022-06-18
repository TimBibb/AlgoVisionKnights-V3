import './Download.css';

import { Button, ButtonGroup } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { FaLinux, FaApple, FaWindows } from 'react-icons/fa';
// Device detection modules
import { isWindows, isMacOs } from 'react-device-detect';
import React from 'react';

import windows from './desktops/windows/AVK-Setup-0.1.0.exe';
import mac from './desktops/mac/AVK-0.1.0.dmg';
import linux from './desktops/linux/avk-react_0.1.0_amd64.deb';

function Download() {
	let file;

	if (isWindows) {
		file = windows;
	} else if (isMacOs) {
		file = mac;
	} else {
		file = linux;
	}

	// Determines which download package suits the device's OS.
	const renderTypeOfDownload = () => {
		if (isWindows) {
			return <FaWindows id='os-icon' />;
		} else if (isMacOs) {
			return <FaApple id='os-icon' />;
		} else {
			return <FaLinux id='os-icon' />;
		}
	};
	return (
		<ButtonGroup id='download-container'>
			<Button id='download-button' href={file} download>
				<span id='os-container'>{renderTypeOfDownload()}</span>
				<span id='download-icon-container'>
					<GetAppIcon id='download-icon' />
				</span>
			</Button>
		</ButtonGroup>
	);
}

export default Download;
