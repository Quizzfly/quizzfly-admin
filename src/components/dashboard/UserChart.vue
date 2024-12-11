<script setup lang="ts">
import Chart from 'primevue/chart'

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: 'black',
        borderWidth: 1,
        tension: 0.2,
        pointRadius: 1,
      },
    ],
  }
}

const setChartOptions = () => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ẩn label của chart
      },
    },
    scales: {
      x: {
        display: false, // Ẩn lưới trục X
      },
      y: {
        display: false, // Ẩn lưới trục Y
      },
    },
  }
}
</script>
<template>
  <div class="flex flex-col overflow-hidden h-[160px] border rounded-xl shadow-sm p-4">
    <p>Users</p>
    <p class="text-lg font-medium">12312</p>
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="flex-auto !max-h-20 overflow-hidden"
    />
  </div>
</template>
