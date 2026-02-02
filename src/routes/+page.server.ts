import clubs from '$lib/data/clubs.json';
import { getEvents } from '$lib/server/calendar';
import { convertEvent } from '$lib/server/events';

import type { ClubKey } from '$lib/types/club';
import type { EventTimeDate } from '$lib/types/event';

export async function load() {
	const allEvents: EventTimeDate[] = [];

	for (const slug of Object.keys(clubs) as ClubKey[]) {
		const rawEvents = await getEvents(slug);
		const converted = rawEvents.map(event => convertEvent(event, slug));
		allEvents.push(...converted);
	}

	return {
		serverEvents: allEvents
	};
}
