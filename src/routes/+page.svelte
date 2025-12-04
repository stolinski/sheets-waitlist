<script lang="ts">
	import './app.css';
	import { joinWaitlist } from './waitlist.remote';

	let submitted = $state(false);
</script>

<header>
	<h1>v_framer</h1>
	<p>Record all of your screens & sources, no proprietary wrappers or bloat</p>
</header>
<main>
	<div class="container">
		<h2>Join the Waitlist</h2>
		<p class="subtitle">Be the first to know when we launch.</p>

		{#if submitted && joinWaitlist.result?.success}
			<div class="success">
				<p>Thanks for joining! We'll be in touch soon.</p>
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
</main>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
	}

	main {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.container {
		background: var(--bg);
		padding: 3rem;
		border-radius: 1rem;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		max-width: 600px;
		width: 100%;
		text-align: center;
	}

	.subtitle {
		color: var(--fg-5);
		margin: 0 0 2rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h1 {
		line-height: 1.2;
	}

	input {
		padding: 1rem;
		border: 2px solid #e0e0e0;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
	}

	input[aria-invalid='true'] {
		border-color: #dc2626;
	}

	button {
		padding: 1rem;
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
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.error {
		color: #dc2626;
		background: #fef2f2;
		padding: 0.75rem;
		border-radius: 0.5rem;
		margin: 0;
		font-size: 0.875rem;
	}

	.success {
		background: #ecfdf5;
		color: #059669;
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
	}
	p {
		text-align: center;
	}
</style>
