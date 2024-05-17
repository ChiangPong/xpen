import { lucia } from '$lib/server/auth';
import { type Actions, error, fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { prisma } from '$lib/server/prisma';

const CategorySchema = z.object({
	category_name: z.string().min(1, { message: 'Category name is required' })
});

const ExpenseSchema = z.object({
	expense: z.string().min(1, { message: 'Category name is required' }),
	price: z.number().multipleOf(0.01).min(0.01, { message: 'Price must be at least 0.01' }),
	category: z.string().min(1, { message: 'Category name is required' }),
	description: z.string().min(1, { message: 'Category name is required' })
});


export const load = async () => {
	const form = await superValidate(zod(CategorySchema));

	const getTopFiveCategory = async () => {
		return await prisma.$queryRaw`
						SELECT SUM(expense.price) as total, category.id, category.name 
						FROM category 
						JOIN expense
						ON category.id = expense.categoryId 
						GROUP BY category.id, category.name 
						ORDER BY total DESC LIMIT 5`;
	};

	const allExpensesByDay = async () => {
		return await prisma.$queryRaw`
						SELECT SUM(expense.price) as total, DAY(expense.createdAt) as day
						FROM expense
						GROUP BY DAY(expense.createdAt)
						ORDER BY DAY(expense.createdAt) ASC `;
	};


	const getTopFiveMostSpent = async () => {
		return await prisma.$queryRaw`SELECT price, id, name, createdAt FROM expense ORDER BY price DESC LIMIT 5`;
	};

	const getExpense = async () => {
		return await prisma.expense.findMany();
	};

	return {
		form,
		expenses: await getExpense(),
		allExpensesByDay: await allExpensesByDay(),
		getTopFiveMostSpent: await getTopFiveMostSpent(),
		getTopFiveCategory: await getTopFiveCategory(),
	};
};

export const actions: Actions = {
	addCategory: async ({ request, locals }) => {

		// TODO: check if username is already used
		if (!locals.user) redirect(302, '/');

		const form = await superValidate(request, zod(CategorySchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, {
				form
			});
		}

		const categoryId = generateId(15);

		try {
			await prisma.category.create({
				data: {
					id: categoryId,
					userId: locals.user.id,
					name: form.data.category_name
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Could not create user' });
		}


		const getCategory = async () => {
			const category = await prisma.category.findMany();

			return category;
		};

		return {
			form,
			success: true,
			category: await getCategory()
		};

	},

	addExpense: async ({ request, locals }) => {

		// TODO: check if username is already used
		if (!locals.user) redirect(302, '/');

		const form = await superValidate(request, zod(ExpenseSchema));


		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, {
				form
			});
		}

		const expenseId = generateId(15);

		try {
			await prisma.expense.create({
				data: {
					id: expenseId,
					userId: locals.user.id,
					name: form.data.expense,
					description: form.data.description,
					price: parseFloat(form.data.price.toFixed(2)),
					categoryId: form.data.category
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Could not create user' });
		}

		const getExpense = async () => {
			return await prisma.expense.findMany();
		};

		return {
			form,
			success: true,
			expenses: await getExpense()
		};

	}
};