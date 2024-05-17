<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import MinimalDetailCardList from '$lib/components/minimalDetailCardList.svelte';
	import { getContext } from 'svelte';
	import TopFiveMostSpent from '$lib/components/expenses/topFiveMostSpent.svelte';
	import TopFiveMostSpentGraph from '$lib/components/expenses/topFiveMostSpentGraph.svelte';
	import TopFiveCategory from '$lib/components/expenses/topFiveCategory.svelte';
	import TopFiveCategoryGraph from '$lib/components/expenses/topFiveCategoryGraph.svelte';
	import AllExpensesByDay from '$lib/components/expenses/allExpensesByDay.svelte';
	import AllExpensesByDayGraph from '$lib/components/expenses/allExpensesByDayGraph.svelte';

	// Retrieve theme store from context
	const theme = getContext('theme');

	// Retrieve categories store from context
	const categories = getContext('categories');

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'bottom'
	};

	let bgColor: string = `bg-${$theme}-400-500-token`;

	export let data;
	let { expenses, allExpensesByDay, getTopFiveMostSpent, getTopFiveCategory } = data;

	let tabSet: number = 0;

</script>

<div class="">
	<MinimalDetailCardList />

	<div class="mt-4">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<span>Graphs</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Tabular</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
						<TopFiveCategoryGraph {getTopFiveCategory} />
						<TopFiveMostSpentGraph {getTopFiveMostSpent} />
					</div>
					<div class="mt-4">
						<AllExpensesByDayGraph {allExpensesByDay} />
					</div>
				{:else if tabSet === 1}
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
						<TopFiveCategory {getTopFiveCategory} />
						<TopFiveMostSpent {getTopFiveMostSpent} />
					</div>
					<div class="mt-4">
						<AllExpensesByDay {allExpensesByDay} />
					</div>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>

</div>

