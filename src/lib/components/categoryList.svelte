<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import Search from '$lib/components/clients/Search.svelte';
	// import ThFilter from '$lib/components/clients/ThFilter.svelte';
	// import ThSort from '$lib/components/clients/ThSort.svelte';
	import RowCount from '$lib/components/clients/RowCount.svelte';
	import RowsPerPage from '$lib/components/clients/RowsPerPage.svelte';
	import Pagination from '$lib/components/clients/Pagination.svelte';

	import { getContext } from 'svelte';

	// Retrieve user store from context
	const categories = getContext('categories');
	const data = $categories;

	const handler = new DataHandler(data, { rowsPerPage: 5 });
	const rows = handler.getRows();
</script>

<div class="table-container space-y-4 rounded-none">
	<header class="flex justify-between gap-4">
		 <Search {handler} />
		 <RowsPerPage {handler} />
	</header>
	<table class="table table-hover table-compact table-auto w-full rounded-none">
		<thead>
		<tr>
			<td>Category name</td>
			<td>Category expenses</td>
			<td>Datetime Added</td>
		</tr>
		</thead>
		<tbody>
		{#each $rows as row}
			<tr>
				<td>{row.name}</td>
				<td>{row._count.expenses}</td>
				<td>{row.createdAt}</td>
			</tr>
		{/each}
		</tbody>
	</table>
	<footer class="flex justify-between">
		 <RowCount {handler} />
		 <Pagination {handler} />
	</footer>
</div>
