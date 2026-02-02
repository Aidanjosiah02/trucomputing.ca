import clubs from '$lib/data/clubs.json';
import page from '$lib/data/pages/home.json';
import projects from '$lib/data/projects.json';

import { getTopProjects } from '$lib/services/projects';

import type { HeaderElement, Hero } from '$lib/types/page';
import type { Club, ClubKey } from '$lib/types/club';
import type { ClubProject } from '$lib/types/project';
import type { EventTimeDate } from '$lib/types/event';

export function load({ data }) {
	const homeEvents: EventTimeDate[] = [];

	for (const slug of Object.keys(clubs) as ClubKey[]) {
		const clubEvents = data.serverEvents.filter(e =>
			e.clubs.includes(slug)
		);
		homeEvents.push(...clubEvents.slice(0, 3));
	}

	homeEvents.sort((a, b) => {
		const aTime = a.time?.start ? new Date(a.time.start).getTime() : 0;
		const bTime = b.time?.start ? new Date(b.time.start).getTime() : 0;
		return aTime - bTime;
	});

	return {
		navbarData: page.navbar as HeaderElement[],
		heroData: page.hero as Hero,

		clubs: clubs as Record<ClubKey, Club>,
		selectedClub: undefined,

		topProjects: getTopProjects(projects) as ClubProject[],
		events: homeEvents
	};
}
