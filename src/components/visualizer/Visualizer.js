import './Visualizer.css';
import React from 'react';

// Unity Webgl components for Unity test
import Unity, { UnityContext } from 'react-unity-webgl';

function renderVisualizer(path, type, lines, setLines, pseudoValues, setPseudoValues){

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
		
		// const setPseudoValues = ({code, lines, steps}) => {
		// 	pseudoValues = {code, lines, steps}
		// }

		return <JSVisual lines={lines} setLines={setLines} pseudoValues={pseudoValues} setPseudoValues={setPseudoValues}/>;
	}
}

class Visualizer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lines: [],
			code: [],
			codeSteps: [],
			waitTime : 2000,
			waitTimeMultiplier: 1,
		}
		this.handleLinesChange = this.handleLinesChange.bind(this);
		this.handleCodeChange = this.handleCodeChange.bind(this);
		this.handleCodeStepsChange = this.handleCodeStepsChange.bind(this);
		this.handleSpeedUpdate = this.handleSpeedUpdate.bind(this);
	}

	handleLinesChange(lines) {
		this.setState({lines: lines});
	}

	handleCodeChange(code) {
		this.setState({code: code});
	}

	handleCodeStepsChange(codeSteps) {
		this.setState({codeSteps: codeSteps});
	}

	handleSpeedUpdate(event) {
		let defaultWaitTime = 2000;
		this.setState({waitTimeMultiplier: event.target.value})
		this.setState({waitTime: defaultWaitTime*(1/event.target.value)})
	}

	render() {
		if (this.props.type === 'unity') {
			const unityContext = new UnityContext({
				loaderUrl: `UnityBuilds/${this.props.path}/build.loader.js`,
				dataUrl: `UnityBuilds/${this.props.path}/build.data`,
				frameworkUrl: `UnityBuilds/${this.props.path}/build.framework.js`,
				codeUrl: `UnityBuilds/${this.props.path}/build.wasm`,
			});

			return <div className='Visualizer'><Unity className='Unity' unityContext={unityContext} /></div>;
		
		} else if (this.props.type === 'js') {
			const JSVisual =
				require(`../../visualizers/${this.props.path}/${this.props.path}.js`).default;

			console.log("lines", this.state.lines)
			return (
				<div className='Visualizer'>
					<JSVisual
						lines={this.state.lines}
						handleLinesChange={this.handleLinesChange}
						
						code={this.state.code}
						handleCodeChange={this.handleCodeChange}

						codeSteps={this.state.codeSteps}
						handleCodeStepsChange={this.handleCodeStepsChange}

						waitTime={this.state.waitTime}
						waitTimeMultiplier={this.state.waitTimeMultiplier}
						handleSpeedUpdate={this.handleSpeedUpdate}
					/>
				</div>
			)
		} else {
			return <div className='Visualizer'></div>
		}
	}
	
	// render() {
	// 	return <div className='Visualizer'>
	// 	</div>
	// 	//  <div className='Visualizer'>{renderVisualizer(this.props.path, this.props.type, this.props.lines, this.props.setLines, this.props.pseudoValues, this.props.setPseudoValues)}</div>;
	// }
}

// function Visualizer({ path, type, lines, setLines, pseudoValues, setPseudoValues }) {
// 	// const unityContent = new UnityContent(
// 	// 	`UnityBuilds/${path}/build.json`,
// 	// 	`UnityBuilds/${path}/UnityLoader.js`
// 	// );

// 	return <div className='Visualizer'>{renderVisualizer(path, type, lines, setLines, pseudoValues, setPseudoValues)}</div>;
// }

export default Visualizer;
