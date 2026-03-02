export function normalizeDescription(html) {
	if (!html) return [];

	html = fixQuoatationMarks(html);
	html = addLinkTargets(html);
	html = splitParagraphs(html);

	return html;
}

function fixQuoatationMarks(html) {
	return html.replace(/=“([^”]+)”/g, '="$1"');
}

function addLinkTargets(html) {
	return html.replace(/<a\b([^>]*)>/gi, (match, attrs = '') => {
		const cleanedAttrs = attrs
			.replace(/\s+target=(["'])[\s\S]*?\1/gi, '')
			.replace(/\s+rel=(["'])[\s\S]*?\1/gi, '')
			.trim();
		const prefix = cleanedAttrs.length ? ` ${cleanedAttrs}` : '';
		return `<a${prefix} target="_blank" rel="noreferrer noopener">`;
	});
}

function splitParagraphs(html) {
	return html.split(/\n\n/);
}
