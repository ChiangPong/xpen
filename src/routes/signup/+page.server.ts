// routes/signup/+page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

import type { Actions } from "./$types";
import { prisma } from '$lib/server/prisma';

const schema = z.object({
	username: z.string().min(1, { message: 'Username is required' }),
	email: z.string().email().min(1, { message: 'Email is required' }),
	full_name: z.string().min(1, { message: 'Full name is required' }),
	password: z.string().min(6, { message: 'Password must be at least 6 character(s)' }),
	confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 character(s)' }),
}).superRefine(({ confirmPassword, password }, ctx) => {
	if (confirmPassword !== password) {
		ctx.addIssue({
			code: "custom",
			message: "The passwords did not match"
		});
	}
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	// Always return { form } in load functions
	return { form };
}

export const actions: Actions = {
	default: async ( { request, cookies}) => {

		const form = await superValidate(request, zod(schema));

		if(!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, {
				form
			});
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(form.data.password);

		// TODO: check if username is already used

		try {
			await prisma.user.create({
				data: {
					id: userId,
					username: form.data.username,
					email: form.data.email,
					full_name: form.data.full_name,
					password: hashedPassword
				}
			})
		} catch (error) {
			console.log(error);
			return fail(500, {message: 'Could not create user'});
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/dashboard");

	}
};