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

	let res;
	try {
		res = await fetch(u.toString());
	} catch (e) {
		throw error(502, { message: `network error fetching ${u.pathname}: ${String(e)}` });
	}

	if (!res.ok) {
		let body = '';
		try {
			body = await res.text();
		} catch {}
		throw error(res.status, {
			message: `request to ${u.pathname} failed: ${res.status} ${res.statusText}${body}`
		});
	}

	let data;
	try {
		data = await res.json();
	} catch (e) {
		throw error(500, { message: `invalid json from ${u.pathname}: ${String(e)}` });
	}

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
