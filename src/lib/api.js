import * as env from '$env/static/public';
import { getLocale } from './paraglide/runtime';

export const BASE_URL = env.PUBLIC_API ?? 'https://minjian-danganguan.org/fast-api';

export async function fetchFilters() {
	const res = await fetch(`${BASE_URL}/filters`);
	if (!res.ok) throw new Error(`Could not load filters`);
	return res.json();
}

export async function query(path) {
	const lang = getLocale();
	const url = new URL(`${BASE_URL}/${path}`);
	url.searchParams.set('lang', lang);

	const res = await fetch(url);
	return res;
}
