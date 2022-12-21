//import adapter from "@sveltejs/adapter-static";
import adapter from "@sveltejs/adapter-cloudflare";
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
        //Static adapter:
		/*adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: "404.html"
        }),*/
        adapter: adapter(),
        prerender: {
            handleMissingId: "ignore"
        }
	}
};

export default config;
