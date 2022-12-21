import type {Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";

export const handle: Handle = async ({ event, resolve }) => {
    // Disable corrections endpoints when not in a dev environment
    if (!dev && (event.url.pathname.startsWith('/corrections') || event.url.pathname.startsWith("/soundcloud"))) {
        return new Response(null, {status: 200});
    }

    return resolve(event);
}