import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import fs from 'fs';
import adapter from '@sveltejs/adapter-static';

const firebase = JSON.parse(fs.readFileSync('node_modules/firebase/package.json', 'utf8'));

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
			define: {
				FIREBASE_SDK_VERSION: JSON.stringify(firebase.version)
			},
			resolve: {
				alias: {
					$components: resolve('./src/components'),
					$types: resolve('./src/types'),
					$stores: resolve('./src/stores')
				}
			}
		}
	}
};

export default config;
