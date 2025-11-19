import { error } from '@sveltejs/kit';
import { query } from '$lib/api';

export async function load({ fetch }) {
	const res = await query('featured', fetch);

	if (!res.ok) {
		throw error(res.status, {
			message: res.statusText
		});
	}

	const data = await res.json();

	return { ...data };
}
