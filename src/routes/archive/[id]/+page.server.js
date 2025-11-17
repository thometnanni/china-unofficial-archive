import { error } from '@sveltejs/kit';
import { query } from '$lib/api';
import { deriveSeoFromItem } from '$lib/seo';

export async function load({ params, url, fetch }) {
	const res = await query(`item/${params.id}`);

	if (!res.ok) {
		throw error(res.status, {
			message: res.statusText
		});
	}

	const data = await res.json();
	const seo = deriveSeoFromItem(data, url.origin);

	return { item: data, seo };
}
