import './InformationPage.css';
import React from 'react';

// Markdown controls
import MarkdownPreview from '@uiw/react-markdown-preview';
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
			<MarkdownPreview source={markdown} style={{ color: 'white' }} />
		</div>
	);
}

export default InformationPage;
