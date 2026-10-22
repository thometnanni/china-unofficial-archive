import { PUBLIC_API } from '$app/env/public';
import { getLocale } from './paraglide/runtime';

const BASE_URL = PUBLIC_API ?? 'https://api.minjian-danganguan.org';

export async function query(path, fetch = window.fetch, lang = getLocale()) {
	const url = new URL(`${BASE_URL}/${path}`);
	url.searchParams.set('lang', lang);

	const res = await fetch(url);
	return res;
}
