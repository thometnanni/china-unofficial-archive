import { defineParams } from '@sveltejs/kit/params';

/**
 * @param {string} param
 * @return {param is staticPage}
 */
const routes = ['resources', 'about'];

function matchStaticPage(param) {
	return routes.includes(param);
}

export const params = defineParams({
	staticPage: (param) => (matchStaticPage(param) ? param : undefined)
});
