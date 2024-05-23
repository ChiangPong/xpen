export const appName = 'Xpen.';
export const appDescription = 'Expenses management system';
export const appSecondaryColor: string = 'primary';
export const CURRENT_YEAR = new Date().getFullYear();

/**
 * Formats the given date into different date string formats.
 *
 * @param {Date} date - the date to be formatted
 */
export const formatDate = (date: Date) => {
	const formattedDate = date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	const formattedTime = formatter.format(date);

	return { formattedDate, formattedTime };
};

export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'MWK',
	}).format(amount);
}