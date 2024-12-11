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
        data: [100, 48, 20, 100, 200, 300, 290],
        fill: {
          target: 'origin', // Fill đến trục hoành
          above: 'rgba(87, 133, 240, 0.1)', // Màu gradient phía trên
          below: 'rgba(255, 0, 0, 0.1)', // Màu gradient phía dưới (nếu cần thiết)
        },
        borderColor: '#5785f0', // Màu đường viền
        borderWidth: 1, // Độ dày đường
        tension: 0.2, // Độ cong đường
        pointRadius: 1, // Ẩn chấm tròn
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
    <p>MRR</p>
    <p class="text-lg font-medium">2000$</p>
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="flex-auto !max-h-20 overflow-hidden"
    />
  </div>
</template>
