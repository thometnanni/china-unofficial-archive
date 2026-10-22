import { redirect } from '@sveltejs/kit';
import { paraglideMiddleware } from '#lib/paraglide/server.js';

const handleParaglide = ({ event, resolve }) => {
	if (event.url.pathname === '/sitemap.xml') {
		return resolve(event);
	}
	// zh was renamed to zh-cn; keep old /zh URLs working
	const { pathname, search } = event.url;
	if (pathname === '/zh' || pathname.startsWith('/zh/')) {
		redirect(308, `/zh-cn${pathname.slice(3)}${search}`);
	}
	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};

export const handle = handleParaglide;
