<template>
  <div class="flex flex-col border rounded-2xl overflow-hidden">
    <div class="flex items-center justify-between pr-5">
      <div class="flex items-center gap-5">
        <div class="px-4 mt-4 mb-4">
          <p class="text-sm font-medium">Recent New Users</p>
          <p class="text-xs text-gray-400">Details of recently registered users on the platform.</p>
        </div>
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="keyword"
            placeholder="Search user"
            class="text-sm font-normal"
            @input="handleSearch()"
          />
        </IconField>
      </div>
      <RouterLink to="/users">
        <Button
          label="See all"
          severity="secondary"
          rounded
          class="inline-flex items-center h-fit"
          size="small"
        />
      </RouterLink>
    </div>
    <ScrollPanel style="height: calc(100vh - 200px); width: 100%">
      <DataTable
        class="text-xs"
        :value="users"
        table-style="min-width: 50rem"
        scrollable
      >
        <Column
          header="Name"
          style="min-width: 100px"
        >
          <template #body="slotProps">
            <p :field="slotProps">{{ slotProps.data.user_info.name }}</p>
          </template>
        </Column>
        <Column
          style="min-width: 100px"
          header="Avatar"
        >
          <template #body="slotProps">
            <img
              v-if="slotProps.data.user_info.avatar"
              :src="slotProps.data.user_info.avatar"
              :alt="slotProps.data.user_info.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <img
              v-else
              src="@/assets/img/avatar.jpg"
              :alt="slotProps.data.user_info.name"
              class="w-10 h-10 rounded-full object-cover"
            />
          </template>
        </Column>
        <Column
          field="email"
          header="Email"
          style="min-width: 100px"
        ></Column>
        <Column
          field="role"
          header="Role"
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
                @click="handleDeleteUser(slotProps.data?.id)"
              ></span>
              <span
                v-if="slotProps.data?.deleted_at"
                class="cursor-pointer w-5 h-5 i-material-symbols-light-restore-from-trash-outline-rounded"
                @click="handleRestoreUser(slotProps.data?.id)"
              ></span>
            </div>
          </template>
        </Column>
        <template #footer> In total there are {{ users ? users.length : 0 }} users. </template>
      </DataTable>
    </ScrollPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { IUserManage } from '@/types/userManage'
import type { IPaging } from '@/types'
import { getListUserApi, deleteUserApi, restoreUserApi } from '@/services/userManage'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useConfirmDialog } from '@/stores/modal'
import ScrollPanel from 'primevue/scrollpanel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const confirmDialog = useConfirmDialog()

const users = ref<IUserManage[]>([])
const metaPage = ref<IPaging>()
const currentPage = ref(1)
const isDeleted = ref(false)
const keyword = ref('')

const listOption = ref([
  { name: 'All', code: 'ALL' },
  { name: 'Deleted', code: 'DELETED' },
])

const selectedOption = ref(listOption.value[0])

onMounted(() => {
  getListUsers()
})

watch(selectedOption, (val) => {
  if (val.name === 'All') {
    isDeleted.value = false
  } else {
    isDeleted.value = true
  }

  getListUsers()
})

const getListUsers = async (page = 1) => {
  try {
    const data = await getListUserApi(keyword.value, isDeleted.value, page)
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

const deleteUser = async (id: string) => {
  try {
    await deleteUserApi(id)
    const index = users.value.findIndex((i) => i.id === id)
    index > -1 && users.value.splice(index, 1)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const handleDeleteUser = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this user?',
    warning: true,
  })

  if (result.isConfirmed) {
    deleteUser(id)
  }
}

const restoreUser = async (id: string) => {
  try {
    await restoreUserApi(id)
    users.value.forEach((el) => {
      if (el.id == id) {
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

const handleRestoreUser = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to restore this user?',
    warning: true,
  })

  if (result.isConfirmed) {
    restoreUser(id)
  }
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
