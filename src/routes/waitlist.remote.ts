import * as v from 'valibot';
import { error } from '@sveltejs/kit';
import { form } from '$app/server';
import { GOOGLE_SCRIPT_URL, TURNSTILE_SECRET_KEY } from '$env/static/private';

const waitlistSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Email is required'),
		v.email('Please enter a valid email address')
	),
	'cf-turnstile-response': v.pipe(v.string(), v.nonEmpty('Verification required'))
});

async function verifyTurnstile(token: string): Promise<boolean> {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			secret: TURNSTILE_SECRET_KEY,
			response: token
		})
	});

	const result = await response.json();
	return result.success === true;
}

export const joinWaitlist = form(waitlistSchema, async ({ email, 'cf-turnstile-response': token }) => {
	// Verify Turnstile token
	const isValid = await verifyTurnstile(token);
	if (!isValid) {
		error(400, 'Verification failed. Please try again.');
	}

	// Add to Google Sheet
	const response = await fetch(GOOGLE_SCRIPT_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	});

	if (!response.ok) {
		throw new Error('Failed to add email to waitlist');
	}

	return { success: true };
});
