import { error } from '@sveltejs/kit';
import type { ClubKey } from '$lib/types/club';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';

export async function load({ params }) {
	const slug = params.slug as ClubKey;

	try {
		const rawEvents = await getEvents(slug);

		const events = rawEvents.map((event) =>
			convertEvent(event, slug)
		);

		return {
			serverEvents: events
		};
	} catch (err) {
		console.error(err);
		throw error(500, 'Failed to load events');
	}
}
