<template>
  <div class="card border rounded-2xl h-screen">
    <div class="flex items-center justify-between pr-5">
      <div class="flex items-center gap-5">
        <div class="px-4 mt-4 mb-4">
          <p class="text-sm font-medium">Recent New Quizzfly</p>
          <p class="text-xs text-gray-400">
            Details of recently registered quizzfly on the platform.
          </p>
        </div>
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="keywords"
            placeholder="Search quizzfly"
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
    <ScrollPanel style="height: calc(100vh - 250px); width: 100%">
      <DataTable
        class="text-xs overflow-hidden"
        :value="quizzfly"
        table-style="min-width: 50rem"
        scrollable
      >
        <Column
          header="Name owner"
          style="min-width: 100px"
        >
          <template #body="slotProps">
            <div class="flex items-center gap-2">
              <img
                v-if="slotProps.data.avatar"
                :src="slotProps.data.avatar"
                :alt="slotProps.data.title"
                class="w-10 h-10 rounded-full object-cover"
              />
              <img
                v-else
                src="@/assets/img/bg-image-3.jpg"
                :alt="slotProps.data.title"
                class="w-10 h-10 rounded-full object-cover"
              />
              <p v-if="slotProps.data.username">{{ slotProps.data.username }}</p>
              <p v-else>Owner</p>
            </div>
          </template>
        </Column>
        <Column
          header="Title"
          style="min-width: 100px"
        >
          <template #body="slotProps">
            <p v-if="slotProps.data.title">{{ slotProps.data.title }}</p>
            <p v-else>Untitled</p>
          </template>
        </Column>
        <Column
          field="quizzfly_status"
          header="Status"
          style="min-width: 100px"
        ></Column>
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
                v-if="!slotProps.data?.deleted_at"
                class="cursor-pointer bg-red-500 w-5 h-5 i-material-symbols-light-auto-delete"
                @click="handleDeleteQuizzfly(slotProps.data?.id)"
              ></span>
              <span
                v-if="slotProps.data?.deleted_at"
                class="cursor-pointer w-5 h-5 i-material-symbols-light-restore-from-trash-outline-rounded"
                @click="handleRestoreQuizzfly(slotProps.data?.id)"
              ></span>
              <p class="mx-2 w-[1px] bg-slate-400 h-[12px]"></p>
              <span
                v-if="slotProps.data?.is_public"
                class="cursor-pointer w-5 h-5 i-material-symbols-light-visibility-off-outline"
                @click="handleUnPublishQuizzfly(slotProps.data?.id)"
              ></span>
              <span
                v-else
                class="cursor-pointer w-5 h-5 i-material-symbols-light-visibility-outline"
                @click="handlePublishQuizzfly(slotProps.data?.id)"
              ></span>
            </div>
          </template>
        </Column>
        <template #footer>
          In total there are {{ quizzfly ? quizzfly.length : 0 }} quizzfly.
        </template>
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
import type { IQuizzfly } from '@/types/quizzfly'
import type { IPaging } from '@/types'
import {
  getListQuizzlfyApi,
  deleteQuizzflyApi,
  publicQuizzlfyApi,
  unPublicQuizzlfyApi,
  restoreQuizzlfyApi,
} from '@/services/quizzfly'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useConfirmDialog } from '@/stores/modal'
import ScrollPanel from 'primevue/scrollpanel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

const confirmDialog = useConfirmDialog()

const quizzfly = ref<IQuizzfly[]>([])
const metaPage = ref<IPaging>()
const currentPage = ref(1)
const isDeleted = ref(false)
const keywords = ref('')
const listOption = ref([
  { name: 'All', code: 'ALL' },
  { name: 'Deleted', code: 'DELETED' },
])

const selectedOption = ref(listOption.value[0])

onMounted(() => {
  getListQuizzfly()
})

const onPageChange = (event: { page: number }) => {
  const newPage = event.page + 1
  getListQuizzfly(newPage)
}

watch(selectedOption, (val) => {
  if (val.name === 'All') {
    isDeleted.value = false
  } else {
    isDeleted.value = true
  }

  getListQuizzfly()
})

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
    getListQuizzfly()
  }
}, 400)

const getListQuizzfly = async (page = 1) => {
  try {
    const data = await getListQuizzlfyApi(keywords.value, isDeleted.value, page)
    quizzfly.value = data.data
    metaPage.value = data.meta
    currentPage.value = page
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const deleteQuizzfly = async (id: string) => {
  try {
    await deleteQuizzflyApi(id)
    const index = quizzfly.value.findIndex((i) => i.id === id)
    index > -1 && quizzfly.value.splice(index, 1)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const publishQuizzfly = async (id: string) => {
  try {
    await publicQuizzlfyApi(id)
    quizzfly.value.forEach((el) => {
      if (el.id === id) {
        el.is_public = true
      }
    })
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const restoreQuizzfly = async (id: string) => {
  try {
    await restoreQuizzlfyApi(id)
    quizzfly.value.forEach((el) => {
      if (el.id === id) {
        el.deleted_at = null
      }
    })
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const unPublishQuizzfly = async (id: string) => {
  try {
    await unPublicQuizzlfyApi(id)
    quizzfly.value.forEach((el) => {
      if (el.id === id) {
        el.is_public = false
      }
    })
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const handleDeleteQuizzfly = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this quizzfly?',
    warning: true,
  })

  if (result.isConfirmed) {
    deleteQuizzfly(id)
  }
}

const handleUnPublishQuizzfly = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to unPublish this quizzfly?',
    warning: true,
  })

  if (result.isConfirmed) {
    unPublishQuizzfly(id)
  }
}

const handlePublishQuizzfly = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to publish this quizzfly?',
    warning: true,
  })

  if (result.isConfirmed) {
    publishQuizzfly(id)
  }
}

const handleRestoreQuizzfly = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to restore this quizzfly?',
    warning: true,
  })

  if (result.isConfirmed) {
    restoreQuizzfly(id)
  }
}
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
