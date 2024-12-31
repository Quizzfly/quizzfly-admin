<template>
  <div class="card border rounded-2xl h-screen">
    <div class="flex items-center justify-between pr-5">
      <div class="flex items-center gap-5">
        <div class="px-4 mt-4 mb-4">
          <p class="text-sm font-medium">Recent payment history</p>
          <p class="text-xs text-gray-400">Details of recently payment history on the platform.</p>
        </div>
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="keyword"
            placeholder="Search payments"
            class="text-sm font-normal"
            @input="handleSearch()"
          />
        </IconField>
      </div>
    </div>
    <ScrollPanel style="height: calc(100vh - 250px); width: 100%">
      <DataTable
        class="text-xs"
        :value="users"
        table-style="min-width: 50rem"
        scrollable
      >
        <Column
          header="Subscription Name"
          style="min-width: 100px"
        >
          <template #body="slotProps">
            <p :field="slotProps">{{ slotProps.data?.subscription_plan.name }}</p>
          </template>
        </Column>
        <Column
          style="min-width: 100px"
          header="Code"
        >
          <template #body="slotProps">
            <p :field="slotProps">{{ slotProps.data.code }}</p>
          </template>
        </Column>
        <Column
          style="min-width: 100px"
          header="Created"
        >
          <template #body="slotProps">
            <p :field="slotProps">{{ formatDate(slotProps.data.created_at) }}</p>
          </template>
        </Column>
        <Column
          style="min-width: 100px"
          header="Amount"
        >
          <template #body="slotProps">
            <p :field="slotProps">{{ slotProps.data.amount }}</p>
          </template>
        </Column>
        <Column
          style="min-width: 100px"
          header="Status"
        >
          <template #body="slotProps">
            <Chip
              :field="slotProps"
              :label="slotProps.data.user_plan_status"
              :class="
                slotProps.data.user_plan_status === 'WAITING' ? 'bg-orange-300' : 'bg-green-400'
              "
            />
          </template>
        </Column>
        <template #footer> In total there are {{ users ? users.length : 0 }} payments. </template>
      </DataTable>
    </ScrollPanel>

    <div class="card">
      <Paginator
        :rows="metaPage?.limit"
        :total-records="metaPage?.total_records"
        @page="onPageChange"
      ></Paginator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import type { IUserPlan } from '@/types/userPlan'
import type { IPaging } from '@/types'
import { getListUserPlanApi } from '@/services/userPlan'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import ScrollPanel from 'primevue/scrollpanel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import { formatDate } from '@/utils/time'
import Chip from 'primevue/chip'

const users = ref<IUserPlan[]>([])
const metaPage = ref<IPaging>()
const currentPage = ref(1)
const keyword = ref('')

onMounted(() => {
  getListUsers()
})

const getListUsers = async (page = 1) => {
  try {
    const data = await getListUserPlanApi(keyword.value, page)
    users.value = data.data
    metaPage.value = data.meta
    currentPage.value = page
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const onPageChange = (event: { page: number }) => {
  const newPage = event.page + 1
  getListUsers(newPage)
}

const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutID: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const handleSearch = debounce(() => {
  getListUsers()
}, 500)
</script>

<style scoped>
.data-form {
  height: calc(100vh - 250px);
}
</style>
