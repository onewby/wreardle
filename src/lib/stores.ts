import {derived, readable, writable} from "svelte/store";
import type {Writable} from "svelte/store";
import { browser } from "$app/environment";
import {getToday} from "./util";

/**
 * Stores for game state
 */

// Tallies for each score (number of guesses needed to get the answer)
export const sScores = [...Array(6).keys()].map(
    i => writable(parseInt((browser ? localStorage.getItem(`score${i}`) : undefined) ?? "0", 10)))
// Number of completed Wreardle attempts (whether succeeded or ran out of guesses)
export const sTries = writable(parseInt((browser ? localStorage.getItem(`tries`) : undefined) ?? "0", 10))

export const sSuccess = writable(false)
export const sFinished = writable(false)

// Zero-indexed number of the guess the user is currently at
export const sGuess = writable(0)
// Length of time the song will play at the current guess
export const sPlayTime = derived([sGuess, sFinished], ([$guess, $finished]) => $finished ? 16 : 0.5*($guess ** 2 + $guess + 2))
// Current point in time the song has reached in ms
export const sMusicProgress = writable(0)

// Actual guesses (shown in text boxes)
export const sGuesses: Writable<string | undefined>[] = [...Array(6).keys()].map(() => writable(undefined))
// Success rate (successful attempts as a % of total attempts)
export const sSuccessRate = derived([sTries, ...sScores], ([$tries, ...$scores]) => {
    const totalSuccesses = $scores.reduce((prev, curr) => prev + curr, 0)
    return totalSuccesses / $tries
})

// Current consecutive day win streak
export const sCurrentStreak = writable(browser ? parseInt(localStorage.getItem("currentStreak") ?? "0", 10) : 0)
// Size of the user's longest ever win streak
export const sMaximumStreak = writable(browser ? parseInt(localStorage.getItem("maximumStreak") ?? "0") : 0)
// Day of the user's last win
export const sLastSuccessDate = writable(browser ? parseInt(localStorage.getItem("lastSuccessDate") ?? "0") : 0)

// Game state (to be stored in LocalStorage)
export const sGameState = derived([sGuess, sSuccess, sFinished, ...sGuesses], ([$guess, $success, $finished, ...$guesses]) => ({
    guess: $guess,
    guesses: $guesses,
    success: $success,
    finished: $finished,
    date: getToday()
}))

// Date tomorrow
const tmrw = getToday() + (1000 * 60 * 60 * 24)
const formatter = new Intl.DateTimeFormat('en', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
})
// Get the time remaining until the next game, formatted in HH:MM:SS
function getTimeRemaining() {
    const diff = Math.max(tmrw - Date.now(), 0)
    return formatter.format(diff)
}
// Get the time until the next game, which ticks and updates every second
export const sTimeToNext = readable(getTimeRemaining(), function start(set) {
    const interval = setInterval(() => set(getTimeRemaining()), 1000);

    return function stop() {
        clearInterval(interval)
    }
})

// "Initial load" var used to stop game state updating on initial load and overriding the existing game state
let initialLoad = true
// Update LocalStorage as soon as any variables change
if(browser) {
    sTries.subscribe(val => localStorage.setItem('tries', String(val)))
    sCurrentStreak.subscribe(val => localStorage.setItem('currentStreak', String(val)))
    sMaximumStreak.subscribe(val => localStorage.setItem('maximumStreak', String(val)))
    sLastSuccessDate.subscribe(val => localStorage.setItem('lastSuccessDate', String(val)))
    sScores.forEach((score, i) => score.subscribe(val => localStorage.setItem(`score${i}`, String(val))))
    sGameState.subscribe(state => {
        if(initialLoad) {
            initialLoad = false
        } else {
            localStorage.setItem('state', JSON.stringify(state));
        }
    })
}
