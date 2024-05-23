<script lang="ts">
	import { getContext } from 'svelte';
	import { formatMoney } from '$lib/global';
	import GroceryIcon from '$lib/components/icons/Grocery.svelte';
	import CalculatorIcon from '$lib/components/icons/Calculator.svelte';
	import TrendiingIcon from '$lib/components/icons/Trendiing.svelte';
	import WalletIcon from '$lib/components/icons/Wallet.svelte';

	export let icon: string;
	export let title: string;
	export let type: string;

	export let value: number;

	// Retrieve user store from context
	const theme = getContext('theme');

	let bgColor: string = `bg-${$theme}-400-500-token`;
</script>

<div class="flex flex-col md:flex-row items-center gap-4 rounded-lg p-4 bg-surface-100-800-token min-w-44">
	<div class="w-12 h-12 flex items-center justify-center {bgColor} rounded-full">
		{#if icon === 'grocery'}
			<GroceryIcon />
		{:else if icon === 'wallet'}
			<WalletIcon />
		{:else if icon === 'trending'}
			<TrendiingIcon />
		{:else if icon === 'calculator'}
			<CalculatorIcon />
		{/if}
	</div>
	<div>
		<h3 class="font-bold text-secondary-400-500-token">{title}</h3>
		{#if value}
			<p class="text-lg font-bold">
				{#if type === 'money'}
					{formatMoney(value)}
				{:else if type === 'string'}
					{value}
				{:else}
					{value}
				{/if}
			</p>
		{/if}
	</div>
</div>