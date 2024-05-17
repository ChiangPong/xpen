<script lang="ts">
	import { AppShell, initializeStores, Drawer, Modal, getDrawerStore } from '@skeletonlabs/skeleton';
	import Bar from '$lib/general/bar.svelte';
	import Settings from '$lib/general/settings.svelte';
	import AddEditExpen from '$lib/general/addEditExpen.svelte';
	import SideBar from '$lib/general/sideBar.svelte';
	import { page } from '$app/stores';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import type { LayoutData } from './$types';

	initializeStores();

	// Create theme context
	const theme = writable();
	theme.set('secondary');
	setContext('theme', theme);
	// END OF Create theme context

	const drawerStore = getDrawerStore();

	$: classesSidebar = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';

	export let data: LayoutData;
	let { user } = data;

	// Create a store and update it when necessary...
	const categories = writable();
	$: categories.set(data.categories);

	// ...and add it to the context for child components to access
	setContext('categories', categories);

</script>

<Modal />

<Drawer>

	{#if $drawerStore.id === 'settings'}
		<!-- (settings drawer) -->
		<Settings />

	{:else if $drawerStore.id === 'expense'}
		<!-- (Add edit expen drawer) -->
		<AddEditExpen />
	{:else}
		<div>
			<h2 class="p-4">Menu</h2>
			<hr />
			<SideBar />
		</div>
		<!-- (fallback contents) -->
	{/if}
</Drawer>



<AppShell slotSidebarLeft="bg-surface-50-900-token {classesSidebar}">
	<svelte:fragment slot="header">
		<!-- (header) -->
		<Bar { user } />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<SideBar />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div class="p-4">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>