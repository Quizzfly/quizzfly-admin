<template>
  <div class="card border rounded-2xl">
    <div class="flex items-center justify-between pr-5">
      <div class="flex items-center gap-5">
        <div class="px-4 mt-4 mb-4">
          <p class="text-sm font-medium">Recent New group</p>
          <p class="text-xs text-gray-400">Details of recently registered group on the platform.</p>
        </div>
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="keywords"
            placeholder="Search group"
            class="text-sm font-normal"
            @input="handleSearch()"
          />
        </IconField>
      </div>
      <Select
        v-model="selectedOption"
        :options="listOption"
        option-label="name"
        placeholder="Select option"
        class="w-[138px]"
      />
    </div>
    <ScrollPanel style="width: 100%; height: calc(100vh - 250px)">
      <DataTable
        class="text-xs overflow-hidden overflow-y-auto cursor-pointer"
        :value="groups"
        table-style="min-width: 50rem"
        scrollable
        @row-click="handleToDetail"
      >
        <Column
          header="Name"
          style="min-width: 100px"
        >
          <template #body="slotProps">
            <p v-if="slotProps.data.name">{{ slotProps.data.name }}</p>
            <p v-else>Untitled</p>
          </template>
        </Column>
        <Column
          style="min-width: 100px"
          header="Cover Image"
        >
          <template #body="slotProps">
            <img
              v-if="slotProps.data.background"
              :src="slotProps.data.background"
              :alt="slotProps.data.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <img
              v-else
              src="@/assets/img/bg-image-3.jpg"
              :alt="slotProps.data.name"
              class="w-10 h-10 rounded-full object-cover"
            />
          </template>
        </Column>
        <Column
          header="Created"
          style="min-width: 100px"
        >
          <template #body="slotProps">
            <p>{{ formatDate(slotProps.data.created_at) }}</p>
          </template>
        </Column>
        <Column
          field="description"
          header="Description"
          class="max-w-[120px] col-description"
        ></Column>
        <Column
          style="min-width: 100px"
          header="Action"
          class="text-left"
        >
          <template #body="slotProps">
            <div class="flex items-center">
              <span
                class="cursor-pointer bg-red-500 w-5 h-5 i-material-symbols-light-auto-delete"
                @click="handledeleteGroup(slotProps.data?.id)"
              ></span>
            </div>
          </template>
        </Column>
        <template #footer> In total there are {{ groups ? groups.length : 0 }} groups. </template>
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
import type { IGroup } from '@/types/group'
import type { IPaging } from '@/types'
import { getListGroupApi, deleteGroupApi } from '@/services/group'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useConfirmDialog } from '@/stores/modal'
import { formatDate } from '@/utils/time'
import router from '@/routers/router'
import ScrollPanel from 'primevue/scrollpanel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

const confirmDialog = useConfirmDialog()

const groups = ref<IGroup[]>([])
const metaPage = ref<IPaging>()
const currentPage = ref(1)
const keywords = ref('')
const listOption = ref([
  { name: 'All', code: 'ALL' },
  { name: 'Deleted', code: 'DELETED' },
])

const selectedOption = ref(listOption.value[0])

onMounted(() => {
  getListGroup()
})

const handleToDetail = (data: any) => {
  router.push(`/groups/${data.data.id}`)
}

const getListGroup = async (page = 1) => {
  try {
    const data = await getListGroupApi(keywords.value, page)
    groups.value = data.data
    metaPage.value = data.meta
    currentPage.value = page
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const deleteGroup = async (id: string) => {
  try {
    await deleteGroupApi(id)
    const index = groups.value.findIndex((i) => i.id === id)
    index > -1 && groups.value.splice(index, 1)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const handledeleteGroup = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this group?',
    warning: true,
  })

  if (result.isConfirmed) {
    deleteGroup(id)
  }
}

const onPageChange = (event: { page: number }) => {
  const newPage = event.page + 1
  getListGroup(newPage)
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
  if (keywords.value) {
    getListGroup()
  }
}, 500)
</script>

<style scoped lang="scss">
:deep {
  .data-form {
    min-height: 300px;
  }

  .col-description {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
