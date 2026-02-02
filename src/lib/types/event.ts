import type { ClubKey } from '$lib/types/club';
import type { EventImage, Repeat } from './common';

export interface EventTimeString {
	clubs: ClubKey[];
	title: string;
	description: string;
	time: {
		start: string;
		end: string;
	}
	location: string;
	image?: EventImage;
	url?: string;
	repeat?: Repeat;
}

export interface EventTimeDate {
	clubs: ClubKey[];
	title: string;
	description: string;
	time: {
		start: Date;
		end: Date;
	} | null
	location: string;
	image: EventImage | null;
	url: string | null;
	repeat?: Repeat;
	isMeeting?: boolean;
}
