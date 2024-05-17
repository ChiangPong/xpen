<script lang="ts">
	import { Chart, type EChartsOptions } from 'svelte-echarts';

	export let allExpensesByDay: any;

	const xdata = allExpensesByDay.map((item) => {
		return item.day;
	});

	const ydata = allExpensesByDay.map((item) => {
		return item.total;
	});

	const options: EChartsOptions = {
		legend: {
			top: '5%'
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		tooltip: {
			trigger: 'item'
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
		},
		xAxis: {
			type: 'category',
			data: xdata
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: ydata,
				type: 'line'
			}
		]

	};
</script>

<div class="card rounded-md bg-surface-50-900-token p-4 shadow-xs">

	<div class="card-header">
		<h1 class="text-xl font-semibold">Total Spent per Day</h1>

		<p class="mt-2 text-gray-900-50-token">These is how much was spent per day</p>
	</div>

	<div class="h-[600px]">
		<Chart {options} />
	</div>
</div>
