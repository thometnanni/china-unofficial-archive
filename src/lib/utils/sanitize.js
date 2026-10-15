import DOMPurify from 'isomorphic-dompurify';

// Keep target so links added by normalizeDescription still open in a new tab
export function sanitize(html) {
	return DOMPurify.sanitize(html ?? '', { ADD_ATTR: ['target'] });
}
