const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--cipria)',
				dark: 'var(--midnight)'
			}
		}
	},
	plugins: []
};

module.exports = config;
