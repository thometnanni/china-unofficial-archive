import { m } from './paraglide/messages';

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

export function firstImageSrc(html) {
	const m = /<img[^>]+src=["']?([^"'\s>]+)["']?[^>]*>/i.exec(String(html || ''));
	return m ? m[1] : null;
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
	const title = item.title ? `${item.title} – ${m.title()}` : m.title();
	const metaTitle = item.title ? `${m.title()} – ${item.title}` : m.title();
	const description = summarize(extractText(item.description ?? ''), 180);
	const image = absolutize(item.thumbnail, base) || `${base}/cover.webp`;
	return { title, metaTitle, description, image };
}
