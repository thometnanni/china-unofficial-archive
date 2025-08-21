import * as env from '$env/static/public';

const BASE_URL = env.PUBLIC_OMEKA_API ?? 'https://minjian-danganguan.org/api';

export function buildItemsUrl({
	filters = [],
	search = '',
	page = 1,
	perPage = 40,
	filterConfigs = []
}) {
	let url = `${BASE_URL}/items?page=${page}&per_page=${perPage}`;
	filters.forEach((f, i) => {
		const config = filterConfigs.find((cfg) => cfg.prop === f.prop);
		const type = config && config.isResource ? 'res' : 'eq';
		url += `&property[${i}][property]=${
			f.prop
		}&property[${i}][type]=${type}&property[${i}][text]=${encodeURIComponent(f.value)}`;
	});
	if (search) {
		const idx = filters.length;
		url += `&property[${idx}][property]=dcterms:title&property[${idx}][type]=in&property[${idx}][text]=${encodeURIComponent(
			search
		)}`;
	}
	return url;
}

export async function fetchItemsQuery({
	filters = [],
	search = '',
	page = 1,
	perPage = 40,
	filterConfigs = []
}) {
	const url = buildItemsUrl({ filters, search, page, perPage, filterConfigs });
	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch items');
	return await res.json();
}

export async function getResourcesByTemplate(templateId, perPage = 100) {
	let resources = [];
	let page = 1;
	while (true) {
		const res = await fetch(
			`${BASE_URL}/items?resource_template_id=${templateId}&page=${page}&per_page=${perPage}`
		);
		if (!res.ok) throw new Error(`Failed to fetch resources for template ${templateId}`);
		const data = await res.json();
		if (!Array.isArray(data) || data.length === 0) break;
		resources = [...resources, ...data];
		if (data.length < perPage) break;
		page++;
	}
	return resources;
}

export async function fetchAllItemsForProperty(prop, maxPages = 10, perPage = 100) {
	let items = [];
	let page = 1;
	while (page <= maxPages) {
		const res = await fetch(`${BASE_URL}/items?page=${page}&per_page=${perPage}`);
		if (!res.ok) break;
		const data = await res.json();
		if (!Array.isArray(data) || data.length === 0) break;
		items = [...items, ...data];
		if (data.length < perPage) break;
		page++;
	}
	return items;
}

export async function getItem(id) {
	const res = await fetch(`${BASE_URL}/items/${id}`);
	if (!res.ok) throw new Error(`Item ${id} not found`);
	return await res.json();
}
