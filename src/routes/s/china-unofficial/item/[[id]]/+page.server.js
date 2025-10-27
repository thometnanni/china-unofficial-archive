import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	const { id } = params;
	redirect(308, `/en/archive/${id}`);
}
