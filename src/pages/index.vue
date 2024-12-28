<script setup lang="ts">
import UserChart from '@/components/dashboard/UserChart.vue'
import GroupChart from '@/components/dashboard/GroupChart.vue'
import EarnedChart from '@/components/dashboard/EarnedChart.vue'
import TableUser from '@/components/dashboard/TableUser.vue'
import QuizzflyChart from '@/components/dashboard/QuizzflyChart.vue'
</script>

<template>
  <div class="flex flex-col overflow-hidden pt-8 gap-6">
    <div class="w-full grid grid-cols-4 max-xl:grid-cols-2 gap-6">
      <UserChart />
      <GroupChart />
      <EarnedChart />
      <QuizzflyChart />
    </div>

    <TableUser />
  </div>
</template>
