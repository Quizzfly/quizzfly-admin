<script setup lang="ts">
import Chart from 'primevue/chart'
import { getListUserPlanApi } from '@/services/userPlan'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'

onMounted(() => {
  chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})

onMounted(() => {
  getPaymentHistory()
})

const chartData = ref()
const chartOptions = ref()
const totalAmount = ref(0)
const keyword = ref('')

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

const getPaymentHistory = async (page = 1, limit = 100) => {
  try {
    const data = await getListUserPlanApi(keyword.value, page, limit)
    data.data.forEach((el) => {
      if (el.amount) {
        totalAmount.value += el.amount
      }
    })
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
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
    <p class="text-lg font-medium">{{ totalAmount }}$</p>
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="flex-auto !max-h-20 overflow-hidden"
    />
  </div>
</template>
