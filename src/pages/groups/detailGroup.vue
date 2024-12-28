<template>
  <div class="card border rounded-2xl">
    <div class="flex items-center justify-between pr-5">
      <div class="px-4 mt-4 mb-4">
        <p class="text-sm font-medium">Recent New Post</p>
        <p class="text-xs text-gray-400">Details of recently registered post on the platform.</p>
      </div>
    </div>
    <DataTable
      class="text-xs overflow-hidden h-[450px] data-form overflow-y-auto"
      :value="posts"
      table-style="min-width: 50rem"
      scrollable
    >
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
        field="type"
        header="Type"
        class="max-w-[120px]"
      ></Column>
      <Column
        field="react_count"
        header="Count react"
        class="max-w-[120px]"
      ></Column>
      <Column
        field="comment_count"
        header="Count comment"
        class="max-w-[120px]"
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
              @click="handledeletePost(slotProps.data?.id)"
            ></span>
          </div>
        </template>
      </Column>
      <template #footer> In total there are {{ posts ? posts.length : 0 }} posts. </template>
    </DataTable>

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
import type { IPost } from '@/types/post'
import type { IPaging } from '@/types'
import { getListPostApi, deletePostApi } from '@/services/group'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useConfirmDialog } from '@/stores/modal'
import { formatDate } from '@/utils/time'

const confirmDialog = useConfirmDialog()

const posts = ref<IPost[]>([])
const metaPage = ref<IPaging>()
const currentPage = ref(1)
const route = useRoute()

const idGroup = route.params.id as string

onMounted(() => {
  getListPost()
})

const getListPost = async (page = 1) => {
  try {
    const data = await getListPostApi(idGroup, page)
    posts.value = data.data
    metaPage.value = data.meta
    currentPage.value = page
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const deletePost = async (id: string) => {
  try {
    await deletePostApi(id)
    const index = posts.value.findIndex((i) => i.id === id)
    index > -1 && posts.value.splice(index, 1)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const handledeletePost = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this group?',
    warning: true,
  })

  if (result.isConfirmed) {
    deletePost(id)
  }
}

const onPageChange = (event: { page: number }) => {
  const newPage = event.page + 1
  getListPost(newPage)
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
