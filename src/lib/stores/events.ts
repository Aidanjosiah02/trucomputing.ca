import { writable } from "svelte/store";

export const calendarEvents = writable<any[]>([]);