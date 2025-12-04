<script lang="ts">
	import './app.css';
	import { joinWaitlist } from './waitlist.remote';
	import light from './light.png';

	let submitted = $state(false);
</script>

<header>
	<h1>v_framer</h1>
	<p>Record all of your screens & video sources. No proprietary wrappers or bloat.</p>
</header>
<main>
	<div class="container">
		<h2>Join the Waitlist</h2>
		<p class="subtitle">Be the first to know when we launch.</p>

		{#if submitted && joinWaitlist.result?.success}
			<div class="success">
				<p>Thanks for joining! <br />We'll be in touch soon.</p>
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

					<button type="submit" disabled={!!joinWaitlist.pending}>
						{joinWaitlist.pending ? 'Joining...' : 'Join Waitlist'}
					</button>
				</div>
			</form>
		{/if}
	</div>
	<img class="billboard" src={light} />
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

	header h1 {
		font-size: clamp(2rem, 8vw, 4rem);
		margin: 0 0 0.5rem;
		line-height: 1.1;
		font-weight: 100;
	}

	header p {
		color: var(--fg-5);
		margin: 0;
		font-size: clamp(0.875rem, 3vw, 1.125rem);
		max-width: 30ch;
		margin-inline: auto;
	}

	main {
		padding: 0 1rem 2rem;
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

	h2 {
		font-size: clamp(1.25rem, 5vw, 1.5rem);
		margin: 0 0 0.5rem;
	}

	.subtitle {
		color: var(--fg-5);
		margin: 0 0 1.5rem;
		font-size: 0.875rem;
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

	.noise {
		position: fixed;
		inset: 0;
		z-index: -1;
		filter: contrast(360%) brightness(1500%) invert(100%);
		background: url(/noise.svg);
		opacity: 0.2;
		pointer-events: none;
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
	}

	.billboard {
		border-radius: 10px;
		max-width: 90vw;
		margin: 0 auto;
		display: block;
	}
</style>
