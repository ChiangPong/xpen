<script lang="ts">
	import {formatDate, formatMoney} from '$lib/global';
	// eslint-disable-next-line no-undef
	export let allExpensesByDay: any;

</script>

<div class="card rounded-md bg-surface-50-900-token p-4 shadow-xs">

	<div class="card-header">
		<h1 class="text-xl font-semibold">Total Spent per Day</h1>

		<p class="mt-2 text-gray-900-50-token">These is how much was spent per day</p>
	</div>

	<ol class="list mt-4">

		<li class="px-4 rounded-md">
			<span class="w-1/12 font-bold">No</span>
			<span class="w-5/12 font-bold">Month Day</span>
			<span class="w-6/12 font-bold flex justify-end">Spent (MWK)</span>
		</li>

		{#each allExpensesByDay as expense, i}
			<li class="px-4">
				<span class="w-1/12 text-sm"><span class="badge variant-filled">{i + 1}</span></span>
				<span class="w-5/12 text-sm">{expense.day}</span>
				<span class="w-6/12 font-bold text-sm flex justify-end">{formatMoney(expense.total)}</span>
			</li>
		{/each}
	</ol>

</div>