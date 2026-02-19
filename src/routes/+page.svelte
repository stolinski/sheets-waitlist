<script lang="ts">
	import './app.css';
	import { joinWaitlist } from './waitlist.remote';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

	let submitted = $state(false);
</script>

<header>
	<p class="product-name">v_framer</p>
	<h1>Record every source. One take.</h1>
	<p class="subheadline">
		Camera, screen, and audio captured simultaneously — in a single macOS app built for creators who
		record.
	</p>
</header>

<main>
	<div class="container">
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
				<div class="form-group">
					{#each joinWaitlist.fields.email.issues() as issue (issue.message)}
						<p class="error">{issue.message}</p>
					{/each}

					<input {...joinWaitlist.fields.email.as('email')} placeholder="Enter your email" />

					<div
						class="cf-turnstile"
						data-sitekey={PUBLIC_TURNSTILE_SITE_KEY}
						data-size="invisible"
					></div>

					<button type="submit" disabled={!!joinWaitlist.pending}>
						{joinWaitlist.pending ? 'Joining...' : 'Get Early Access'}
					</button>
				</div>
			</form>
		{/if}
	</div>

	<section class="benefits">
		<div class="benefit">
			<h3>Multi-source capture</h3>
			<p>
				Record your camera, screen, and audio at the same time. No complex routing. No workarounds.
			</p>
		</div>
		<div class="benefit">
			<h3>Crash-proof recording</h3>
			<p>
				Segment-based capture writes to disk every 10 seconds. If something goes wrong, you lose
				seconds — not hours of footage.
			</p>
		</div>
		<div class="benefit">
			<h3>Clean and native</h3>
			<p>
				A macOS app that does one thing well. No subscription walls. No feature bloat. Just record.
			</p>
		</div>
	</section>
</main>

<style>
	:global(html) {
		margin: 0;
		padding: 0;
	}
	:global(body) {
		margin: 0;
		min-height: 100dvh;
	}

	header {
		text-align: center;
		padding: 3rem 1rem 1.5rem;
	}

	.product-name {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--accent);
		margin: 0 0 1rem;
		font-weight: 600;
	}

	header h1 {
		font-size: clamp(2rem, 8vw, 3.5rem);
		margin: 0 0 1rem;
		line-height: 1.1;
		font-weight: 100;
		max-width: 20ch;
		margin-inline: auto;
	}

	.subheadline {
		color: var(--fg-5);
		margin: 0;
		font-size: clamp(0.9375rem, 3vw, 1.125rem);
		max-width: 40ch;
		margin-inline: auto;
		line-height: 1.5;
	}

	main {
		padding: 0 1rem 3rem;
	}

	.container {
		background: var(--bg);
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		max-width: 500px;
		margin-inline: auto;
		text-align: center;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	input {
		padding: 0.875rem 1rem;
		border: 2px solid var(--fg-2);
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s;
		background: var(--bg);
		color: var(--fg);
	}

	input::placeholder {
		color: var(--fg-4);
	}

	input:focus {
		outline: none;
		border-color: var(--accent);
	}

	input[aria-invalid='true'] {
		border-color: var(--error);
	}

	button {
		padding: 0.875rem 1rem;
		background: var(--accent);
		color: black;
		border: none;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px color-mix(in oklch, var(--accent) 40%, transparent);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.error {
		color: var(--error);
		background: color-mix(in oklch, var(--error) 10%, var(--bg));
		padding: 0.75rem;
		border-radius: 0.5rem;
		margin: 0;
		font-size: 0.875rem;
	}

	.success {
		background: color-mix(in oklch, var(--accent) 15%, var(--bg));
		color: var(--fg);
		padding: 1.5rem;
		border-radius: 0.5rem;
	}

	.success p {
		margin: 0;
		font-weight: 500;
	}

	.benefits {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 800px;
		margin: 3rem auto 0;
		padding: 0 0.5rem;
	}

	.benefit h3 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.375rem;
	}

	.benefit p {
		color: var(--fg-5);
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	p {
		text-align: center;
	}

	@media (min-width: 640px) {
		header {
			padding: 4rem 2rem 2rem;
		}

		.container {
			padding: 2rem;
		}

		.benefits {
			grid-template-columns: repeat(3, 1fr);
			gap: 2rem;
			margin-top: 4rem;
		}
	}
</style>
