// Place this next to the page that renders StaticPage.svelte (adjust route name to match)
import { error } from '@sveltejs/kit';
import { BASE_URL_OMEKA } from '$lib/api';
import { getLocale } from '$lib/paraglide/runtime';

export async function load({ params, fetch }) {
	const slug = params.slug; // or get it however your route provides it
	const site = 'china-unofficial-new';
	const lang = getLocale(); // derive appropriately (from cookies, params, or i18n store)
	const apiSlug = `${slug}-${lang}`;

	const url = new URL(`${BASE_URL_OMEKA}/site_pages`);
	url.searchParams.set('site', site);
	url.searchParams.set('slug', apiSlug);

	const res = await fetch(url.toString());
	if (!res.ok) throw error(404, { message: 'Page not found' });

	const pages = await res.json();
	const page = pages?.[0];
	if (!page) throw error(404, { message: 'Page not found' });

	const title = page['o:title'] ?? '';
	const block = (page['o:block'] || []).find((b) => b['o:layout'] === 'html');
	const html = block?.['o:data']?.html ?? '';

	return { title, html, splashImages: [] }; // pass whatever props your component needs
}
