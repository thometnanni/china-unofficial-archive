export const addLinkTargets = (html = '') => {
	if (!html) {
		return '';
	}

	return html.replace(/<a\b([^>]*)>/gi, (match, attrs = '') => {
		const cleanedAttrs = attrs
			.replace(/\s+target=(["'])[\s\S]*?\1/gi, '')
			.replace(/\s+rel=(["'])[\s\S]*?\1/gi, '')
			.trim();
		const prefix = cleanedAttrs.length ? ` ${cleanedAttrs}` : '';
		return `<a${prefix} target="_blank" rel="noreferrer noopener">`;
	});
};
