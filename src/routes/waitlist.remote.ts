import * as v from 'valibot';
import { form } from '$app/server';
import { GOOGLE_SCRIPT_URL } from '$env/static/private';

const emailSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Email is required'),
		v.email('Please enter a valid email address')
	)
});

export const joinWaitlist = form(emailSchema, async ({ email }) => {
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
