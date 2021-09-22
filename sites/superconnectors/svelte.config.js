import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import adapter from '@sveltejs/adapter-static';

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
		adapter: adapter({
			// default options are shown
			pages: 'public',
			assets: 'public',
			fallback: null
		}),
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					tslib: 'tslib/tslib.es6.js',
					$components: resolve('./src/components'),
					$types: resolve('./src/types'),
					$stores: resolve('./src/stores')
				}
			}
		}
	}
};

export default config;
