import { error } from '@sveltejs/kit';
import { query } from '$lib/api';

export async function load() {
	const res = await query('featured');

	if (!res.ok) {
		throw error(res.status, {
			message: `${res.statusText}`
		});
	}

	const data = await res.json();

	return { ...data };
}
