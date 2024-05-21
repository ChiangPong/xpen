<script lang="ts">
	import { type DrawerSettings, getDrawerStore, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import MinimalDetailCard from '$lib/components/minimalDetailCard.svelte';
	import { getContext } from 'svelte';

	const drawerStore = getDrawerStore();

	export let totalSpent: number;
	export let totalBought: number;
	export let mostSpent: number;
	export let mostBought: number;

	const list = [
		{
			'icon': 'yes1',
			'title': 'Most Spent',
			'type': 'money',
			'value': mostSpent
		},
		{
			'icon': 'yes3',
			'title': 'Total Spent',
			'type': 'money',
			'value': totalSpent
		},
		{
			'icon': 'yes4',
			'title': 'Total Bought',
			'type': 'number',
			'value': totalBought
		},
		{
			'icon': 'yes2',
			'title': 'Most Purchased',
			'type': 'string',
			'value': mostBought
		}
	];

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'bottom'
	};

	const expenseSettings: DrawerSettings = {
		id: 'expense',
		// Provide your property overrides:
		// bgDrawer: 'bg-secondary-900 text-white',
		// bgBackdrop: 'bg-gradient-to-tr from-secondary-900/50 via-secondary-500/50 to-secondary-300/50',
		width: 'w-3/4 md:w-1/2',
		// padding: 'p-4',
		rounded: 'rounded-none',
		position: 'right'
	};

	function drawerOpenExpense(): void {
		drawerStore.open(expenseSettings);
	}

	// Retrieve user store from context
	const theme = getContext('theme');

	let bgColor: string = `bg-${$theme}-400-500-token`;

</script>

<div class="rounded-lg no-scrollbar flex gap-4 overflow-x-auto sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-x-none">
	<button class="{bgColor} rounded-md p-2 [&>*]:pointer-events-none flex items-center justify-center min-w-44" use:popup={popupHover} on:click={drawerOpenExpense}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
		</svg>
	</button>

	{#each list as item}
		<MinimalDetailCard icon={item.icon} title={item.title} type={item.type} value={item.value} />
	{/each}
</div>


<div class="card rounded-md border border-gray-50 py-1 px-2 {bgColor}" data-popup="popupHover">
	<p>Add a new expense</p>
	<div class="arrow border-t border-l border-gray-50 {bgColor}" />
</div>