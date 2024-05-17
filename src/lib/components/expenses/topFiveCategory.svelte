<script lang="ts">
	import {formatMoney} from '$lib/global';
	// eslint-disable-next-line no-undef
	export let getTopFiveCategory: any;

</script>

<div class="card rounded-md bg-surface-50-900-token p-4 shadow-xs">

	<div class="card-header">
		<h1 class="text-xl font-semibold">Top 5 Most Spent Categories</h1>

		<p class="mt-2 text-gray-900-50-token">These are the top 5 total spent categories</p>
	</div>

	<ol class="list mt-4">

		<li class="px-4 rounded-md">
			<span class="w-2/12 font-bold">No</span>
			<span class="w-5/12 font-bold">Category</span>
			<span class="w-5/12 font-bold flex justify-end">Total Spent (MWK)</span>
		</li>

		{#each getTopFiveCategory as category, i}
			<li class="px-4">
				<span class="w-2/12 text-sm"><span class="badge variant-filled">{i + 1}</span></span>
				<span class="w-5/12 text-sm">{category.name}</span>
				<span class="w-5/12 text-sm flex justify-end">{formatMoney(category.total)}</span>
			</li>
		{/each}
	</ol>

</div>