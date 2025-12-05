import { error } from '@sveltejs/kit';
import { query } from '$lib/api';
import { deriveSeoFromItem } from '$lib/seo';

export async function load({ params, url, fetch }) {
	const res = await query(`item/${params.id}`, fetch);

	if (!res.ok) {
		throw error(res.status, {
			message: res.statusText
		});
	}

	const item = await res.json();
	const seo = deriveSeoFromItem(item, url.origin);
	const heroes = item.type !== 'creator' ? item.heroes : null;

	return { item, seo, heroes };
}
