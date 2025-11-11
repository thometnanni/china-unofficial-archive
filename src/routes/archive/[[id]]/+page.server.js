import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/api';
import { getLocale } from '$lib/paraglide/runtime';
import { deriveSeoFromItem, summarize, absolutize } from '$lib/seo';

export async function load({ params, url, fetch }) {
	const lang = getLocale();
	const id = params.id ?? null;
	const path = id == null ? `items${url.search}` : `items/${id}${url.search}`;
	const u = new URL(`${BASE_URL}/${path}`);
	u.searchParams.set('lang', lang);
	const res = await fetch(u.toString());
	if (!res.ok) throw error(500, { message: 'load failed' });
	const data = await res.json();
	let seo;
	if (id == null) {
		const title = 'Archive';
		const descSource = String(data?.description || data?.title || '').trim();
		const description = summarize(descSource, 180);
		const first = Array.isArray(data?.items) ? data.items[0] : null;
		const imgLocal =
			first?.thumbnail || (Array.isArray(first?.media) ? first.media[0]?.url : null) || null;
		const image = absolutize(imgLocal, url.origin) || `${url.origin}/cover.png`;
		seo = { title, description, image };
	} else {
		seo = deriveSeoFromItem(data, url.origin);
	}
	return { item: data, seo };
}
