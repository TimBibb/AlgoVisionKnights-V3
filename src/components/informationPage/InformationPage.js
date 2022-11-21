import './InformationPage.css';
import React from 'react';

// Markdown controls
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Divider } from '@material-ui/core';
function InformationPage({ path }) {
	const source = require(`../../assets/${path}.md`);

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
			<h3>More Information Below</h3>
			<hr />
			<MarkdownPreview source={markdown} style={{ color: localStorage.getItem('primaryColor') }} />
		</div>
	);
}

export default InformationPage;
