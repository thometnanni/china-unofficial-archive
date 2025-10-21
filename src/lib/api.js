import * as env from '$env/static/public';
import { getLocale } from './paraglide/runtime';

export const BASE_URL_OMEKA = env.PUBLIC_OMEKA_API ?? 'https://minjian-danganguan.org/api';
export const BASE_URL = env.PUBLIC_API ?? 'https://minjian-danganguan.org/fast-api';

export function buildItemsUrl({
	filters = [],
	search = '',
	page = 1,
	perPage = 40,
	filterConfigs = []
}) {
	let url = `${BASE_URL_OMEKA}/items?page=${page}&per_page=${perPage}`;
	filters.forEach((f, i) => {
		const cfg = filterConfigs.find((c) => c.prop === f.prop);
		const type = cfg?.isResource ? 'res' : (cfg?.searchType ?? 'eq');
		url += `&property[${i}][property]=${f.prop}&property[${i}][type]=${type}&property[${i}][text]=${encodeURIComponent(f.value)}`;
	});

	const q = (search ?? '').trim();
	if (q) url += `&fulltext_search=${encodeURIComponent(q)}`;

	return url;
}

export async function fetchItemsQuery(args) {
	const res = await fetch(buildItemsUrl(args));
	if (!res.ok) throw new Error('Failed to fetch items');
	return res.json();
}

export async function getResourcesByTemplate(templateId, perPage = 100) {
	let out = [],
		page = 1;
	while (true) {
		const res = await fetch(
			`${BASE_URL_OMEKA}/items?resource_template_id=${templateId}&page=${page}&per_page=${perPage}`
		);
		if (!res.ok) throw new Error(`Failed to fetch resources for template ${templateId}`);
		const data = await res.json();
		if (!Array.isArray(data) || data.length === 0) break;
		out.push(...data);
		if (data.length < perPage) break;
		page++;
	}
	return out;
}

export async function fetchAllItemsForProperty(_prop, maxPages = 10, perPage = 100) {
	let out = [],
		page = 1;
	while (page <= maxPages) {
		const res = await fetch(`${BASE_URL_OMEKA}/items?page=${page}&per_page=${perPage}`);
		if (!res.ok) break;
		const data = await res.json();
		if (!Array.isArray(data) || data.length === 0) break;
		out.push(...data);
		if (data.length < perPage) break;
		page++;
	}
	return out;
}

export async function getItem(id) {
	const res = await fetch(`${BASE_URL_OMEKA}/items/${id}`);
	if (!res.ok) throw new Error(`Item ${id} not found`);
	return res.json();
}

export async function fetchFilters() {
	const res = await fetch(`${BASE_URL}/filters`);
	if (!res.ok) throw new Error(`Could not load filters`);
	return res.json();
}

export async function query(path) {
	const lang = getLocale();
	const url = new URL(`${BASE_URL}/${path}`);
	url.searchParams.set('lang', lang);

	return await fetch(url).then((d) => d.json());
}
