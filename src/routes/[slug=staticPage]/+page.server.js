import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/api';
import { getLocale } from '$lib/paraglide/runtime';
import { extractText, summarize, firstImageSrc, absolutize } from '$lib/seo';

export async function load({ params, fetch, url }) {
	const slug = params.slug;
	const site = 'china-unofficial-new';
	const lang = getLocale();
	const apiSlug = `${slug}-${lang}`;

	const u = new URL(`${BASE_URL}/omeka/site_pages`);
	u.searchParams.set('site', site);
	u.searchParams.set('slug', apiSlug);

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
		const status = res.status === 404 ? 404 : res.status;
		throw error(status, {
			message: `request to ${u.pathname} failed: ${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`
		});
	}

	let pages;
	try {
		pages = await res.json();
	} catch (e) {
		throw error(500, { message: `invalid json from ${u.pathname}: ${String(e)}` });
	}

	const page = pages?.[0];
	if (!page) throw error(404, { message: `page not found for slug ${apiSlug}` });

	const title = page['o:title'] ?? '';
	const block = (page['o:block'] || []).find((b) => b['o:layout'] === 'html');
	const html = block?.['o:data']?.html ?? '';

	const text = extractText(html);
	const description = summarize(text, 180);
	const imgLocal = firstImageSrc(html);
	const image = absolutize(imgLocal, url.origin) || `${url.origin}/cover.png`;

	return { title, html, splashImages: [], seo: { title, description, image } };
}
