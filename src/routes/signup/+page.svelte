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
			<p class="text-center font-bold">Sign Up to get started.</p>
			<div class="mt-2">
				<form method="post" class="space-y-4" autocomplete="false" use:enhance>

					<label class="label">
						<span>Username <span class="text-red-700">*</span></span>
						<input class="input {$errors.username ? 'input-error' : ''}" type="text" name="username" aria-invalid={$errors.username ? 'true' : undefined} placeholder="JohnDoe" bind:value={$form.username} {...$constraints.username}  />
						{#if $errors.username}<span class="text-sm text-red-700 font-semibold">{$errors.username}</span>{/if}
					</label>

					<label class="label">
						<span>Email <span class="text-red-700">*</span></span>
						<input class="input {$errors.email ? 'input-error' : ''}" type="email" name="email" aria-invalid={$errors.email ? 'true' : undefined} placeholder="john@example.com" bind:value={$form.email} {...$constraints.email} />
						{#if $errors.email}<span class="text-sm text-red-700 font-semibold">{$errors.email}</span>{/if}
					</label>

					<label class="label">
						<span>Full Name <span class="text-red-700">*</span></span>
						<input class="input {$errors.full_name ? 'input-error' : ''}" type="text" name="full_name" aria-invalid={$errors.full_name ? 'true' : undefined} placeholder="John Doe" bind:value={$form.full_name} {...$constraints.full_name} />
						{#if $errors.full_name}<span class="text-sm text-red-700 font-semibold">{$errors.full_name}</span>{/if}
					</label>

					<label class="label">
						<span>Password <span class="text-red-700">*</span></span>
						<input class="input {$errors.password ? 'input-error' : ''}" type="password" name="password" aria-invalid={$errors.password ? 'true' : undefined} placeholder="password" bind:value={$form.password} {...$constraints.password} />
						{#if $errors.password}<span class="text-sm text-red-700 font-semibold">{$errors.password}</span>{/if}
						{#if $errors._errors}<span class="text-sm text-red-700 font-semibold">{$errors._errors}</span>{/if}
					</label>

					<label class="label">
						<span>Confirm Password <span class="text-red-700">*</span></span>
						<input class="input {$errors.confirmPassword ? 'input-error' : ''}" type="password" name="confirmPassword" aria-invalid={$errors.confirmPassword ? 'true' : undefined} placeholder="confirm password" bind:value={$form.confirmPassword} {...$constraints.confirmPassword} />
						{#if $errors.confirmPassword}<span class="text-sm text-red-700 font-semibold">{$errors.confirmPassword}</span>{/if}
						{#if $errors._errors}<span class="text-sm text-red-700 font-semibold">{$errors._errors}</span>{/if}
					</label>

					<div class="flex items-center gap-2">
						<button type="submit" class="btn variant-filled">Sign Up</button>
						{#if $submitting}<ProgressRadial width="w-8" stroke="80" />{/if}
					</div>

				</form>

				<div class="mt-1">
					<p class="text-sm">Already have an account? <a class="underline" href="/">Sign In</a></p>
				</div>
			</div>
		</div>

	</div>
</div>
