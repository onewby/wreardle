# Wreardle
A Heardle clone for guessing WWE themes built using SvelteKit. Can be found at
[https://wreardle.onewby.me](https://wreardle.onewby.me).

Songs played using [Soundcloud](https://soundcloud.com).
UI inspired by [Heardle](https://www.spotify.com/heardle/),
[2000's Heardle](https://2000sheardle.glitch.me) and
[Lyricle](https://lyricle.app).
Data on wrestlers' themes sourced from [Cagematch](https://www.cagematch.net).

## How to run

Run the program in production mode using `npm run preview`.

Running in development mode provides access to a song information corrections 
interface at /corrections, which can be used to clarify ambiguous search 
results found during song scraping. The scraper is not currently published, 
making the interface effectively redundant for public use.
Run using `npm run dev`.