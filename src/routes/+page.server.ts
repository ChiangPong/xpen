// routes/signup/+page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import type { Actions } from "./$types";
import { prisma } from '$lib/server/prisma';

const schema = z.object({
	username: z.string().min(1, { message: 'Username is required' }),
	password: z.string().min(6, { message: 'Password must be at least 6 character(s)' }),
	general: z.string().optional(),
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	// Always return { form } in load functions
	return { form };
}


export const actions: Actions = {
	default: async ({ request , cookies}) => {

		const form = await superValidate(request, zod(schema));

		if(!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, {
				form
			});
		}

		const username = form.data.username;
		const password = form.data.password;

		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return setError(form, 'username', 'Invalid username - must be between 3 and 31 characters and can only contain lowercase letters, numbers, dashes and underscores.');
		}

		if (typeof password !== "string" || password.length < 6 || password.length > 255) {

			return setError(form, 'username', 'Invalid password.');
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				username: username.toLowerCase(),
			},
			select: {
				id: true,
				username: true,
				password: true,
			},
		})

		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.

			return setError(form, 'general', 'Incorrect username or password.');
		}

		const validPassword = await new Argon2id().verify(existingUser.password, password);
		if (!validPassword) {
			return setError(form, 'general', 'Incorrect username or password.');
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/dashboard");
	}
};