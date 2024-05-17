<script lang="ts">
	import type { DrawerSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { AppBar, Avatar, getDrawerStore, popup } from '@skeletonlabs/skeleton';
	import { appName } from '$lib/global';

	// eslint-disable-next-line no-undef
	export let user: User;

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'settings',
		// Provide your property overrides:
		// bgDrawer: 'bg-secondary-900 text-white',
		// bgBackdrop: 'bg-gradient-to-tr from-secondary-900/50 via-secondary-500/50 to-secondary-300/50',
		width: 'w-3/4 md:w-1/2',
		// padding: 'p-4',
		rounded: 'rounded-none',
		position: 'right',
		meta: { foo: 'bar', fizz: 'buzz', age: 40 }
	};

	const menuSettings: DrawerSettings = {
		id: 'menu',
		// Provide your property overrides:
		// bgDrawer: 'bg-secondary-900 text-white',
		// bgBackdrop: 'bg-gradient-to-tr from-secondary-900/50 via-secondary-500/50 to-secondary-300/50',
		width: 'w-3/4 md:w-1/4',
		// padding: 'p-4',
		rounded: 'rounded-none',
		position: 'left'
	};

	function drawerOpenSettings(): void {
		drawerStore.open(drawerSettings);
	}

	function drawerOpen(): void {
		drawerStore.open(menuSettings);
	}

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	const getInitials = (full_name: string) => {
		return full_name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	};

</script>

<AppBar class="py-2 border-b border-surface-100-800-token" background="bg-surface-50-900-token">
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
										 stroke="currentColor"
										 class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
            </span>
			</button>
			<strong class="text-xl uppercase">{appName}</strong>
		</div>

	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="flex items-center gap-6">
			<div class="flex items-center gap-6">
				<button on:click={drawerOpenSettings}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
						<path fill-rule="evenodd"
									d="M8.34 1.804A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 0 1 1.262.125l.962.962a1 1 0 0 1 .125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 0 1 .804.98v1.361a1 1 0 0 1-.804.98l-1.473.295a6.95 6.95 0 0 1-.587 1.416l.834 1.25a1 1 0 0 1-.125 1.262l-.962.962a1 1 0 0 1-1.262.125l-1.25-.834a6.953 6.953 0 0 1-1.416.587l-.294 1.473a1 1 0 0 1-.98.804H9.32a1 1 0 0 1-.98-.804l-.295-1.473a6.957 6.957 0 0 1-1.416-.587l-1.25.834a1 1 0 0 1-1.262-.125l-.962-.962a1 1 0 0 1-.125-1.262l.834-1.25a6.957 6.957 0 0 1-.587-1.416l-1.473-.294A1 1 0 0 1 1 10.68V9.32a1 1 0 0 1 .804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 0 1 .125-1.262l.962-.962A1 1 0 0 1 5.38 3.03l1.25.834a6.957 6.957 0 0 1 1.416-.587l.294-1.473ZM13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									clip-rule="evenodd" />
					</svg>

				</button>
				<button type="button" class="btn btn-sm bg-secondary-400-500-token" use:popup={popupFeatured}>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
							<path
								d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
						</svg>

					</span>
					<span>{user.username}</span>
				</button>

				<div class="card w-72 shadow-xl rounded-lg" data-popup="popupFeatured">
					<div class="m-2 p-2 bg-surface-200-700-token flex items-center gap-4">
						<div>
							<Avatar initials="{getInitials(user.full_name)}" background="bg-secondary-400-500-token" width="w-12" height="h-12" />
						</div>
						<div class="flex flex-col items-start">
							<h3 class="font-semibold">{user.full_name}</h3>
							<p class="text-sm">@{user.username}</p>
						</div>
					</div>

					<div class="m-2">
						<form action="/logout" method="POST">
							<button class="btn btn-sm bg-secondary-400-500-token w-full">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
									<path fill-rule="evenodd"
												d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
												clip-rule="evenodd" />
									<path fill-rule="evenodd"
												d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
												clip-rule="evenodd" />
								</svg>

								<span>Logout</span>
							</button>
						</form>
					</div>
				</div>

			</div>
		</div>
	</svelte:fragment>
</AppBar>