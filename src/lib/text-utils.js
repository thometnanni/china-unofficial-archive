function decodeEntities(s) {
	if (!s) return '';
	return s
		.replace(/&nbsp;/g, ' ')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)));
}

function stripTags(s) {
	return s ? s.replace(/<[^>]*>/g, '') : '';
}

function normalizeText(s) {
	return stripTags(decodeEntities(String(s)))
		.replace(/\s+/g, ' ')
		.trim();
}

function findAllMatches(hay, needle) {
	const q = (needle ?? '').trim();
	if (!hay || !q) return [];
	const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const words = q.split(/\s+/).filter(Boolean).map(esc);
	if (!words.length) return [];
	const re = new RegExp(words.join('\\s+'), 'gi');
	const out = [];
	let m;
	while ((m = re.exec(hay))) out.push([m.index, m.index + m[0].length]);
	return out;
}

function pickText(item) {
	const getLit = (vals) =>
		Array.isArray(vals)
			? (vals.find((v) => v?.type === 'literal' && v['@value'])?.['@value'] ?? '')
			: '';
	const extracted = getLit(item['extracttext:extracted_text']);
	if (extracted) return { source: 'extracted', text: extracted };
	const descs = item['dcterms:description'] || [];
	const descEn = descs.find((v) => v?.['@language'] === 'en')?.['@value'];
	const descAny = getLit(descs);
	if (descEn || descAny) return { source: 'description', text: descEn || descAny };
	const titles = item['dcterms:title'] || [];
	const titleEn = titles.find((v) => v?.['@language'] === 'en')?.['@value'];
	const titleAny = getLit(titles);
	if (titleEn || titleAny) return { source: 'title', text: titleEn || titleAny };
	return { source: null, text: '' };
}

export function buildSnippetParts(item, needle, radius = 140, maxSnippets = 3) {
	const { source, text } = pickText(item);
	const norm = normalizeText(text);
	const hits = findAllMatches(norm, needle);
	if (!hits.length) return { snippets: [], source };
	const snippets = hits.slice(0, maxSnippets).map(([s, e]) => {
		const start = Math.max(0, s - radius);
		const end = Math.min(norm.length, e + radius);
		const parts = [];
		if (start > 0) parts.push({ text: '…' });
		parts.push({ text: norm.slice(start, s) });
		parts.push({ hit: norm.slice(s, e) });
		parts.push({ text: norm.slice(e, end) });
		if (end < norm.length) parts.push({ text: '…' });
		return parts;
	});
	return { snippets, source };
}
