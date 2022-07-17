import './InformationPage.css';
import React from 'react';

// Markdown controls
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Divider } from '@material-ui/core';
function InformationPage({ path }) {
	const source = require(`../../assets/${path}.md`).default;

	// Markdown Renderer test
	const [markdown, setMarkdown] = React.useState('');
	React.useEffect(() => {
		fetch(source)
			.then((res) => res.text())
			.then((text) => {
				setMarkdown(text);
			});
	});

	return (
		<div className='InformationPage'>
			<h3 style={{textAlign: "center"}}>more information below</h3>
			<hr ></hr>
			<br/><br/><br/>
			<MarkdownPreview source={markdown} style={{ color: 'white' }} />
		</div>
	);
}

export default InformationPage;
