// +page.server.ts
import type { LayoutServerLoad } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async (event) => {

	// TODO: check if username is already used
	if (!event.locals.user) redirect(302, "/");

	try {
		const user: User = await prisma.user.findUnique({
			where: {
				username: event.locals.user.username,
			},
		})
		const getCategory = async () => {
			const category = await prisma.category.findMany({
				include: {
					_count: {
						select: {
							expenses: true
						}
					}
				}
			})

			return category;
		}

		return {
			username: event.locals.user.username,
			categories: await getCategory(),
			user
		};

	} catch (error) {
		return fail(500, {message: 'Could not create user'});
	}

};