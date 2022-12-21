import type {PageLoad} from "./$types";
import type {Song} from "../../types/song.type";

export const prerender = false

// Provides proper typing for the fetch function in getSongsJSON
type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>;

// Fetch JSON from a URL relative to the base path - default to an empty array if not found
async function getSongsJSON(file: string, fetch: Fetch): Promise<Song[]> {
    const response = await fetch(file)
    return response.ok ? await response.json() : []
}

// On page load, fetch songs to review and songs already confirmed
export const load: PageLoad = async ({ fetch }) => {
    return {
        reviewSongs: await getSongsJSON("songs.review.json", fetch),
        confirmedSongs: await getSongsJSON("songs.json", fetch)
    }
}