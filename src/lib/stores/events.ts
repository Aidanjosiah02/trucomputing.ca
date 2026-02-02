import { writable } from 'svelte/store';
import type { EventTimeDate } from '$lib/types/event';
import type { ClubKey } from '$lib/types/club';

export type EventsByClub = Partial<Record<ClubKey, EventTimeDate[]>>;

export const eventsStore = writable<EventsByClub>({});
