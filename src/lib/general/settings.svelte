<script lang="ts">
	import { getDrawerStore, TabGroup, Tab } from '@skeletonlabs/skeleton';
	import CategoryList from '$lib/components/categoryList.svelte';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}

	let tabSet: number = 0;

</script>

<div class="h-full">
	<div class="flex items-center gap-4 p-4">
		<button on:click={drawerClose}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
				<path fill-rule="evenodd"
							d="M12.207 2.232a.75.75 0 0 0 .025 1.06l4.146 3.958H6.375a5.375 5.375 0 0 0 0 10.75H9.25a.75.75 0 0 0 0-1.5H6.375a3.875 3.875 0 0 1 0-7.75h10.003l-4.146 3.957a.75.75 0 0 0 1.036 1.085l5.5-5.25a.75.75 0 0 0 0-1.085l-5.5-5.25a.75.75 0 0 0-1.06.025Z"
							clip-rule="evenodd" />
			</svg>
		</button>

		<h2>Settings</h2>
	</div>

	<hr>

	<div class="p-4">

		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<span>Expense Categories</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Add New Category</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div>
						<CategoryList />
					</div>
				{:else if tabSet === 1}
					<div class="p-4">
						<div class="p-4 max-w-96">
							<p class="text-center font-bold">New Category.</p>
							<div class="mt-2">
								<form action="/dashboard?/addCategory" method="post" class="space-y-4">

									<label class="label">
										<span>Category Name <span class="text-red-700">*</span></span>
										<input class="input" type="text" name="category_name"
										/>
									</label>

									<div class="flex items-center gap-2">
										<button type="submit" class="btn variant-filled">Add</button>
									</div>

								</form>

							</div>
						</div>
					</div>
				{/if}
			</svelte:fragment>
		</TabGroup>

	</div>
</div>