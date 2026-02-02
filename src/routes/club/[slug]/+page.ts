import clubs from '$lib/data/clubs.json';
import projects from '$lib/data/projects.json';

import type { HeaderElement, Hero } from '$lib/types/page';
import type { Club, ClubKey } from '$lib/types/club';
import type { ClubProject } from '$lib/types/project';

import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

import { eventsStore } from '$lib/stores/events';
import { getClubProjects } from '$lib/services/projects';
import { normalizeNavbarUrl } from '$lib/services/urls';
import type { EventTimeDate } from '$lib/types/event';
import { partitionEvents } from '$lib/services/events';

export async function load({ params, fetch }) {
	const slug = params.slug as ClubKey;

	// Store events so a request is not needed every navigation.
	const store = get(eventsStore);
	if (!store[slug]) {
		const result = await fetch(`/api/events/${slug}`);
		const events: EventTimeDate[] = await result.json();
		const { meetings, nonMeetings } = partitionEvents(events);
		eventsStore.update(store => ({...store, [slug]: {events: nonMeetings, meetings}}));
	}

	try {
		const page = await import(`$lib/data/pages/${slug}/main.json`);
		const navbar = page.navbar.map((item: HeaderElement) => normalizeNavbarUrl(item, slug));

		return {
			navbarData: navbar as HeaderElement[],
			heroData: page.hero as Hero,
			clubs: clubs as Record<ClubKey, Club>,
			slug: slug,
			projects: getClubProjects(projects, slug) as ClubProject[] ?? undefined
		};
	} catch (e) {
		throw error(404, `'${slug}.json' not found: ${e}`);
	}
}
