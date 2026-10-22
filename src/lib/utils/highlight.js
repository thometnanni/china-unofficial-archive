import DOMPurify from 'isomorphic-dompurify';

// NodeFilter.SHOW_TEXT, spelled out because NodeFilter is not a global on the server
const SHOW_TEXT = 4;

function escapeRegex(term) {
	return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Sanitizes first, then wraps matches in <mark> inside text nodes only,
// so the term never matches tag names or attributes
export function highlightHtml(html, term) {
	const fragment = DOMPurify.sanitize(html ?? '', {
		ADD_ATTR: ['target'],
		RETURN_DOM_FRAGMENT: true
	});
	const doc = fragment.ownerDocument;

	if (term) {
		const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
		const walker = doc.createTreeWalker(fragment, SHOW_TEXT);
		const textNodes = [];
		while (walker.nextNode()) textNodes.push(walker.currentNode);

		for (const node of textNodes) {
			// split with a capture group alternates text (even) and matches (odd)
			const parts = node.data.split(regex);
			if (parts.length === 1) continue;

			const replacement = doc.createDocumentFragment();
			parts.forEach((part, i) => {
				if (!part) return;
				if (i % 2) {
					const mark = doc.createElement('mark');
					mark.textContent = part;
					replacement.append(mark);
				} else {
					replacement.append(doc.createTextNode(part));
				}
			});
			node.replaceWith(replacement);
		}
	}

	const container = doc.createElement('div');
	container.append(fragment);
	return container.innerHTML;
}
