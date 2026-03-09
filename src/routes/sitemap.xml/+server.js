import { query } from '$lib/api';
import { baseLocale, locales } from '$lib/paraglide/runtime';

export async function GET({ fetch, url }) {
	const items = await query('ids', fetch).then((d) => d.json());

	const slugs = [
		['', Object.values(items).toSorted().at(-1)],
		['/archive', Object.values(items).toSorted().at(-1)],
		['/archive?view=creator', Object.values(items).toSorted().at(-1)],
		['/about'],
		['/resources'],
		...Object.entries(items).map(([id, modified]) => [`/archive/${id}`, modified])
	];
	const base = url.origin;

	const urls = slugs.map(([slug, modified]) =>
		locales.map((lang) => {
			const alternates = locales
				.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${base}/${l}${slug}"/>`)
				.join('\n      ');

			return `
  <url>
    <loc>${base}/${lang}${slug}</loc>
    ${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/${baseLocale}${slug}"/>
    ${modified ? `<lastmod>${modified}</lastmod>` : ''}
    <priority>${lang === baseLocale ? '0.8' : '0.7'}</priority>
  </url>`;
		})
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
