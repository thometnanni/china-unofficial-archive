/**
 * @param {string} param
 * @return {param is staticPage}
 * @satisfies {import('@sveltejs/kit').ParamMatcher}
 */

const routes = ['resources', 'about'];

export function match(param) {
	return routes.includes(param);
}
