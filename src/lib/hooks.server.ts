import {db, setDb} from '$lib/server/db'
import { sequence } from '@sveltejs/kit/hooks'

export async function handlePlatform({event, resolve}) { //resolve is some function (find type)
    if (!db) {
        setDb(event.platform.env?.DB);
    }
    return await resolve(event);
}

export async function handleHook({ event, resolve}) {
    return await resolve(event);
}

export const handle = sequence(handlePlatform, handleHook);