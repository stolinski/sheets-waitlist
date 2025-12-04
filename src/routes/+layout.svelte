<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<meta property="og:type" content="website" />

	<meta property="og:title" content="v_framer - Record Sources & Screens" />
	<meta property="twitter:title" content="v_framer - Record Sources & Screens" />

	<meta property="og:description" content="v_framer - Record Sources & Screens" />
	<meta name="description" content="v_framer - Record Sources & Screens" />

	<meta property="og:image" content="https://vframer.video/og.png" />
	<meta property="og:image:secure_url" content="https://vframer.video/og.png" />
	<meta property="twitter:image" content="https://vframer.video/og.png" />
	<meta property="twitter:card" content="summary_large_image" />

	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<script defer data-domain="vframer.video" src="https://analytics.tolin.ski/js/script.js"></script>
</svelte:head>

{@render children()}
