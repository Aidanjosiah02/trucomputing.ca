import clubs from '$lib/data/clubs.json';
import type { PageServerLoad } from './$types';
import { getEvents } from '$lib/server/google-calendar'

export const load: PageServerLoad = async ({ params }) => {
	const events = await getEvents(clubs[params.slug].calendarId);

	return {
		test: JSON.stringify(events[0])
	}
} 
