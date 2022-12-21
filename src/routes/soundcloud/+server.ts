import parse from "node-html-parser";
import type {RequestHandler} from "./$types";

// Server-side endpoint to get around CORS issues when using a Vite dev environment

async function getIDFromURL(url: string): Promise<string | undefined> {
    const resp = await fetch(url)
    if(resp.status !== 200) return undefined
    const page = parse(await resp.text())

    // al:android:url meta tag contains soundcloud://sounds:<id>
    const idElement = page.getElementsByTagName("meta").find(
        elem => elem.getAttribute("property") === "al:android:url")
    const androidURL = idElement?.getAttribute("content")
    if(androidURL === undefined) return undefined
    const idRegexResult = /soundcloud:\/\/sounds:(?<id>\d+)/.exec(androidURL)
    return idRegexResult?.groups?.id
}

// Expected format of the POST request body
type SoundcloudURLRequest = {
    url: string
}

// On POST request: return JSON "{id: integer}"
export const POST: RequestHandler = async({ request }) => {
    const values: SoundcloudURLRequest = await request.json()
    return new Response(JSON.stringify({
        id: await getIDFromURL(values.url)
    }))
}