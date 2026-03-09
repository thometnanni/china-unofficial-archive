import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide = ({ event, resolve }) => {
	if (event.url.pathname === '/sitemap.xml') {
		return resolve(event);
	}
	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};

export const handle = handleParaglide;
