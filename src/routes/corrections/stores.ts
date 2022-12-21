import {browser} from "$app/environment";
import {writable} from "svelte/store";
import type { Writable } from "svelte/store";
import type { Song } from "../../types/song.type";

/* Index of the current song being checked */
export const sSongIndex = writable(browser ? Number(localStorage.getItem("song")) : 0)
if(browser) sSongIndex.subscribe(val => localStorage.setItem("song", String(val)))

/* All changes made to songs.review.json */
export const sChanges: Writable<Song[]> = writable(browser ? JSON.parse(localStorage.getItem("changes") ?? "[]") : [])
if(browser) sChanges.subscribe(val => localStorage.setItem("changes", JSON.stringify(val)))