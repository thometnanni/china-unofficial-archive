import { error } from '@sveltejs/kit';
import { query } from '#lib/api.js';

export async function load({ fetch }) {
	const res = await query('featured', fetch);

	if (!res.ok) {
		throw error(res.status, res.statusText);
	}

	const data = await res.json();

	return { ...data };
}
