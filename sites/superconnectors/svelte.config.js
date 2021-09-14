import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
process.env.TAILWIND_MODE = dev ? 'watch' : 'build';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$components: resolve('./src/components'),
					$types: resolve('./src/types')
				}
			}
		}
	}
};

export default config;
