type User = {
	id: string
	username: string
	email: string
	full_name: string
	password: string
}

type Category = {
	id: string
	userId: string
	name: string
	count: number
}

type Expense = {
	id: string
	userId: string
	name: string
	description: string
	price: number
	categoryId: string
	createdAt: Date
}