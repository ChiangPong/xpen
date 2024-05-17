<script lang="ts">
	import {formatDate, formatMoney} from '$lib/global';
	// eslint-disable-next-line no-undef
	export let getTopFiveMostSpent: Expense[];

</script>

<div class="card rounded-md bg-surface-50-900-token p-4 shadow-xs">

	<div class="card-header">
		<h1 class="text-xl font-semibold">Top 5 Most Spent</h1>

		<p class="mt-2 text-gray-900-50-token">These are the top 5 expenses by amount spent</p>
	</div>

	<ol class="list mt-4">

		<li class="px-4 rounded-md">
			<span class="w-1/12 font-bold">No</span>
			<span class="w-3/12 font-bold">Expense</span>
			<span class="w-3/12 font-bold flex justify-end">Spent (MWK)</span>
			<span class="w-5/12 font-bold">Date</span>
		</li>

		{#each getTopFiveMostSpent as expense, i}
			<li class="px-4">
				<span class="w-1/12 text-sm"><span class="badge variant-filled">{i + 1}</span></span>
				<span class="w-3/12 text-sm">{expense.name}</span>
				<span class="w-3/12 font-bold text-sm flex justify-end">{formatMoney(expense.price)}</span>
				<span class="w-5/12 text-sm">{formatDate(expense.createdAt).formattedDate} {formatDate(expense.createdAt).formattedTime}</span>
			</li>
		{/each}
	</ol>

</div>