<script lang="ts">
	import './app.css';
	import { joinWaitlist } from './waitlist.remote';
	let submitted = $state(false);
</script>

<div class="noise" aria-hidden="true"></div>

<header>
	<div class="brand">
		<span class="dot"></span>
		<span>v_framer</span>
	</div>
	<h1>Record every source.<br />One take.</h1>
	<p class="sub">
		Camera, screen, and audio captured simultaneously — in a single macOS app built for creators who
		record.
	</p>
</header>

<main>
	<div class="form-card">
		{#if submitted && joinWaitlist.result?.success}
			<div class="success">
				<p>You're on the list.<br />We'll let you know when it's time to record.</p>
			</div>
		{:else}
			<form
				{...joinWaitlist.enhance(async ({ form, submit }) => {
					try {
						await submit();
						submitted = true;
						form.reset();
					} catch {
						// Error handling is done via issues
					}
				})}
			>
				{#each joinWaitlist.fields.email.issues() as issue (issue.message)}
					<p class="error">{issue.message}</p>
				{/each}

				<div class="fields">
					<input {...joinWaitlist.fields.email.as('email')} placeholder="Enter your email" />

					<button type="submit" disabled={!!joinWaitlist.pending}>
						{joinWaitlist.pending ? 'Joining...' : 'Get Early Access'}
					</button>
				</div>
			</form>
		{/if}
	</div>

	<section class="features">
		<div class="feature">
			<h3>Multi-source capture</h3>
			<p>
				Record your camera, screen, and audio at the same time. No complex routing. No workarounds.
			</p>
		</div>
		<div class="feature">
			<h3>Crash-proof recording</h3>
			<p>
				Segment-based capture writes to disk every 10 seconds. If something goes wrong, you lose
				seconds — not hours of footage.
			</p>
		</div>
		<div class="feature">
			<h3>Clean and native</h3>
			<p>
				A macOS app that does one thing well. No subscription walls. No feature bloat. Just record.
			</p>
		</div>
	</section>
</main>

<style>
	/* ── Noise overlay ── */
	.noise {
		position: fixed;
		inset: 0;
		z-index: -1;
		filter: contrast(360%) brightness(1500%) invert(100%);
		background: url(/noise.svg);
		opacity: 0.15;
		pointer-events: none;
	}

	/* ── Header ── */
	header {
		text-align: center;
		padding: 5rem 1.5rem 0;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.brand .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow:
			0 0 4px var(--accent),
			0 0 10px var(--accent);
		animation: pulse 3s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	.brand span:last-child {
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		color: var(--fg-6);
	}

	h1 {
		font-size: clamp(2.5rem, 8vw, 4.5rem);
		font-weight: 100;
		margin: 0 0 1.25rem;
		line-height: 1.05;
		letter-spacing: -0.02em;
		text-wrap: balance;
	}

	.sub {
		color: var(--fg-4);
		font-size: clamp(0.9375rem, 2.5vw, 1.125rem);
		max-width: 36ch;
		margin: 0 auto;
		line-height: 1.6;
		text-align: center;
	}

	/* ── Main ── */
	main {
		padding: 0 1.5rem 4rem;
	}

	/* ── Form card ── */
	.form-card {
		position: relative;
		background: var(--fg-05);
		border: solid 1px rgba(255, 255, 255, 0.06);
		border-top-color: rgba(255, 255, 255, 0.1);
		border-radius: 16px;
		corner-shape: squircle;
		padding: 1.5rem;
		max-width: 440px;
		margin: 2.5rem auto 0;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
	}

	.form-card::before {
		content: '';
		position: absolute;
		inset: -80px;
		background: radial-gradient(ellipse at center, rgba(0, 247, 88, 0.06), transparent 70%);
		z-index: -1;
		pointer-events: none;
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--fg-2);
		border-radius: 8px;
		background: var(--fg-05);
		color: var(--fg);
		font-size: 0.9375rem;
		font-family: inherit;
		font-variation-settings: inherit;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	input::placeholder {
		color: var(--fg-3);
	}

	input:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 3px oklch(from var(--accent) l c h / 0.08);
	}

	input[aria-invalid='true'] {
		border-color: var(--error);
	}

	button {
		width: 100%;
		padding: 0.75rem 1.5rem;
		background: var(--accent);
		color: #000;
		border: solid 1px transparent;
		border-top-color: oklch(from var(--accent) l c h / 0.7);
		border-radius: 8px;
		font-size: 0.9375rem;
		font-weight: 500;
		font-family: inherit;
		font-variation-settings: inherit;
		cursor: pointer;
		transition:
			filter 0.15s,
			box-shadow 0.15s,
			translate 0.1s;
		box-shadow: 0 2px 10px oklch(from var(--accent) l c h / 0.2);
	}

	button:hover:not(:disabled) {
		filter: brightness(1.1);
		box-shadow:
			0 2px 20px oklch(from var(--accent) l c h / 0.3),
			0 0 40px oklch(from var(--accent) l c h / 0.08);
	}

	button:active:not(:disabled) {
		filter: brightness(0.95);
		translate: 0 1px;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* ── Error / Success ── */
	.error {
		color: var(--error);
		background: color-mix(in oklch, var(--error) 8%, var(--bg));
		padding: 0.625rem 0.75rem;
		border-radius: 6px;
		margin: 0 0 0.25rem;
		font-size: 0.8125rem;
		text-align: center;
	}

	.success {
		background: oklch(from var(--accent) l c h / 0.08);
		border: 1px solid oklch(from var(--accent) l c h / 0.15);
		padding: 1.5rem;
		border-radius: 10px;
		text-align: center;
	}

	.success p {
		margin: 0;
		font-weight: 400;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--fg-8);
	}

	/* ── Features ── */
	.features {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		max-width: 720px;
		margin: 4rem auto 0;
	}

	.feature {
		padding: 1.25rem 1.5rem;
		background: var(--fg-05);
		border: solid 1px rgba(0, 0, 0, 0.3);
		border-top: solid 1px rgba(255, 255, 255, 0.06);
		border-radius: 10px;
		box-shadow: 0 0 1px rgb(255 255 255 / 0.04);
		transition: border-top-color 0.3s;
	}

	.feature:hover {
		border-top-color: rgba(255, 255, 255, 0.12);
	}

	.feature h3 {
		font-size: 0.875rem;
		font-weight: 500;
		margin: 0 0 0.25rem;
		letter-spacing: 0.01em;
	}

	.feature p {
		color: var(--fg-4);
		margin: 0;
		font-size: 0.8125rem;
		line-height: 1.55;
		text-align: left;
	}

	/* ── Responsive ── */
	@media (min-width: 640px) {
		header {
			padding: 8rem 2rem 0;
		}

		.form-card {
			padding: 2rem;
			margin-top: 3rem;
		}

		.features {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.75rem;
			margin-top: 5rem;
		}
	}

	/* ── Reset ── */
	:global(html) {
		margin: 0;
		padding: 0;
	}
	:global(body) {
		margin: 0;
		min-height: 100dvh;
	}
</style>
