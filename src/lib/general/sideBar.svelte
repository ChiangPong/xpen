<script lang="ts">
import { LightSwitch } from '@skeletonlabs/skeleton';
import { getDrawerStore } from "@skeletonlabs/skeleton";
import { page } from '$app/stores';

const drawerStore = getDrawerStore();

function drawerClose(): void {
	drawerStore.close();
}
</script>

<nav class="h-full list-nav p-4 flex flex-col justify-between border-r border-surface-100-800-token">
	<ul>
		<li><a href="/dashboard" class="{$page.url.pathname === '/dashboard' ? 'bg-secondary-400-500-token' : ''}" on:click={drawerClose}>Home</a></li>
	</ul>

	<div class="flex justify-end">
		<LightSwitch />
	</div>
</nav>