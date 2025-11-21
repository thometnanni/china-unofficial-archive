import { error } from '@sveltejs/kit';
import { query } from '$lib/api';
import { extractText, summarize, firstImageSrc, absolutize } from '$lib/seo';

export async function load({ params, fetch, url }) {
	const res = await query(`page/${params.slug}`, fetch);

	if (!res.ok) {
		throw error(res.status, {
			message: res.statusText
		});
	}

	const { html, title } = await res.json();

	const text = extractText(html);
	const description = summarize(text, 180);
	const imgLocal = firstImageSrc(html);
	const image = absolutize(imgLocal, url.origin) || `${url.origin}/cover.png`;

	return { title, html, splashImages: [], seo: { title, description, image } };
}
