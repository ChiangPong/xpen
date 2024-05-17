<script lang="ts">
	import { appName, appDescription } from '$lib/global';
	import { superForm } from 'sveltekit-superforms';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data;

	// Client API:
	const { form, errors, constraints, enhance, submitting, delayed, timeout } = superForm(data.form);
</script>

<div class="container h-screen m-auto flex justify-center items-center">
	<div class="space-y-5">
		<div>
			<h1 class="text-4xl text-center">{appName}</h1>
			<p class="text-center">{appDescription}</p>
		</div>

		<div class="card p-4 max-w-96">
			<p class="text-center font-bold">Sign in to get started.</p>
			<div class="mt-2">
				<form method="post" class="space-y-4" use:enhance>

					<label class="label">
						<span>Username <span class="text-red-700">*</span></span>
						<input class="input {$errors.username ? 'input-error' : ''}" type="text" name="username"
									 aria-invalid={$errors.username ? 'true' : undefined} placeholder="JohnDoe"
									 bind:value={$form.username} {...$constraints.username} />
						{#if $errors.username}<span class="text-sm text-red-700 font-semibold">{$errors.username}</span>{/if}
					</label>

					<label class="label">
						<span>Password <span class="text-red-700">*</span></span>
						<input class="input {$errors.password ? 'input-error' : ''}" type="password" name="password"
									 aria-invalid={$errors.password ? 'true' : undefined} placeholder="password"
									 bind:value={$form.password} {...$constraints.password} />
						{#if $errors.password}<span class="text-sm text-red-700 font-semibold">{$errors.password}</span>{/if}
					</label>

					<div class="flex items-center gap-2">
						<button type="submit" class="btn variant-filled">Sign In</button>
						{#if $submitting}
							<ProgressRadial width="w-8" stroke="80" />
						{/if}
					</div>

				</form>

				<div class="mt-1">
					<p class="text-sm">You don't have an account? <a class="underline" href="/signup">Sign Up</a></p>
				</div>

				{#if $errors.general}
					<div class="alert variant-ghost-error mt-2">
						<div class="alert-message">
							<p>{$errors.general}</p>
						</div>
					</div>

					<div class="mt-1">
						<p class="text-sm">Have you forgot your password? <a class="underline" href="/forgot">Reset here</a></p>
					</div>
				{/if}

			</div>
		</div>

	</div>
</div>
