import {browser} from "$app/environment";
import {getToday} from "../lib/util";
import {sCurrentStreak, sFinished, sGuess, sGuesses, sLastSuccessDate, sSuccess} from "../lib/stores";
import {get} from "svelte/store";
import type {Song} from "../types/song.type";
import type {PageLoad} from "./$types";

export const prerender = true;
// Holds the game state stored in LocalStorage
type State = {
    guess: number,
    guesses: (string | undefined)[],
    success: boolean,
    finished: boolean,
    date: number
}

// Load in the list of songs, and any pre-saved game statistics
export const load: PageLoad = async ({ fetch }) => {
    const url = "./songs.json"
    const response = await fetch(url)

    // If not prerendering on the server, load state from LocalStorage
    if(browser) {
        const state: State = JSON.parse(localStorage.getItem("state") ?? "{}")
        // Check if a pre-existing game state exists
        if(Object.keys(state).length !== 0) {
            // Check if we're still playing the same day's game
            if(state.date === getToday()) {
                // Restore current guess number from local state
                sGuess.set(state.guess)
                // Convert all nulls to undefined to work with internal data structures
                state.guesses.forEach((guess: string | undefined, i: number) => {
                    if(guess === null) {
                        state.guesses[i] = undefined
                    }
                })
                // Restore guesses, success/finished flags from local state
                sGuesses.forEach((val, i) => val.set(state.guesses[i]))
                sSuccess.set(state.success)
                sFinished.set(state.finished)
            } else {
                // Reset state if this is a new day
                localStorage.removeItem("state")
            }
        }
        // If yesterday's game not completed, reset the streak
        if(get(sLastSuccessDate) + (1000 * 60 * 60 * 24) < getToday()) {
            sCurrentStreak.set(0)
        }
    }

    // Return the list of songs
    const songs: Song[] = await response.json()
    return {
        songs: response.ok ? songs : []
    };
}