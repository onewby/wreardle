import type {Song} from "../types/song.type";

/**
 * Get the song of the day - i.e. the index is the nth song since 8th August 2022
 * @param songs List of all songs
 */
export function getSong(songs: Song[]): Song {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    const diff = currentDate.getTime() - 1659913200000
    const days = Math.floor(diff / 86400000) // Days since 8th Aug 2022
    return songs[days % songs.length] // Wrap around if all songs exceeded
}

/**
 * Format a song as a string for being guessed
 * @param s Song to format
 */
export const formatSong = (s: Song) => `${s.title} - ${s.artist} (${s.wrestlers.join(", ")}) (${s.promotions.join(", ")})`

const today = Date.now()
/**
 * Get the current day at 00:00:00
 */
export function getToday(): number {
    return new Date(today).setHours(0, 0, 0, 0)
}