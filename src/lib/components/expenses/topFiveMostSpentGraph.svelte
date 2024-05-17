<script lang="ts">
	import { Chart, type EChartsOptions } from 'svelte-echarts';

	export let getTopFiveMostSpent: any;

	const data = getTopFiveMostSpent.map((item) => {
		return {
			value: item.price,
			name: item.name
		};
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
		series: [
			{
				name: 'Top Five Most Spent',
				type: 'pie',
				radius: [5, 100],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8
				},
				data: data
			}
		]
	};
</script>

<div class="card rounded-md bg-surface-50-900-token p-4 shadow-xs">

	<div class="card-header">
		<h1 class="text-xl font-semibold">Top 5 Most Spent</h1>

		<p class="mt-2 text-gray-900-50-token">These are the top 5 expenses by amount spent</p>
	</div>
	<div class="h-[300px]">
		<Chart {options} />
	</div>
</div>
