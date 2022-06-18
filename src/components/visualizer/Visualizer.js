import './Visualizer.css';
import React from 'react';

// Unity Webgl components for Unity test
import Unity, { UnityContext } from 'react-unity-webgl';

function renderVisualizer(path, type) {
	if (type === 'unity') {
		const unityContext = new UnityContext({
			loaderUrl: `UnityBuilds/${path}/build.loader.js`,
			dataUrl: `UnityBuilds/${path}/build.data`,
			frameworkUrl: `UnityBuilds/${path}/build.framework.js`,
			codeUrl: `UnityBuilds/${path}/build.wasm`,
		});

		return <Unity className='Unity' unityContext={unityContext} />;
	} else if (type === 'js') {
		const JSVisual =
			require(`../../visualizers/${path}/${path}.js`).default;

		return <JSVisual />;
	}
}

function Visualizer({ path, type }) {
	// const unityContent = new UnityContent(
	// 	`UnityBuilds/${path}/build.json`,
	// 	`UnityBuilds/${path}/UnityLoader.js`
	// );
	return <div className='Visualizer'>{renderVisualizer(path, type)}</div>;
}

export default Visualizer;
