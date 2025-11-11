export function extractText(html) {
	return String(html || '')
		.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
		.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}
export function summarize(text, n = 180) {
	const s = String(text || '').trim();
	if (!s) return '';
	if (s.length <= n) return s;
	const t = s.slice(0, n);
	return t.replace(/\s+\S*$/, '') + '…';
}
export function absolutize(u, base) {
	if (!u) return null;
	try {
		return new URL(u, base).toString();
	} catch {
		return null;
	}
}
export function deriveSeoFromItem(item, base) {
	const title = item?.title || '';
	const description = summarize(extractText(item?.description || ''), 180);
	const firstImage =
		(Array.isArray(item?.media)
			? item.media.find((m) => (m?.type || '').startsWith('image/'))?.url
			: null) ||
		item?.thumbnail ||
		null;
	const image = absolutize(firstImage, base) || `${base}/cover.png`;
	return { title, description, image };
}
