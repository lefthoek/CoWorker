const production = !process.env.ROLLUP_WATCH;
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    fontFamily: {
      mono: ["IBM Plex Mono", "monospace"],
    },
    extend: {
      colors: {
        background: "var(--cipria)",
        accent: "var(--midnight)",
      },
    },
  },
  plugins: [],
  purge: {
    content: ["./src/**/*.svelte"],
    enabled: production, // disable purge in dev
  },
};
