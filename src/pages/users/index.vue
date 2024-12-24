<template>
  <div class="card border rounded-2xl overflow-hidden">
    <div class="flex items-center justify-between pr-5">
      <div class="px-4 mt-4 mb-4">
        <p class="text-sm font-medium">Recent New Users</p>
        <p class="text-xs text-gray-400">Details of recently registered users on the platform.</p>
      </div>
      <RouterLink to="/users/create">
        <Button
          severity="secondary"
          rounded
          class="inline-flex items-center h-fit"
          size="small"
        >
          <span class="i-material-symbols-light-add"></span>
          Add new user
        </Button>
      </RouterLink>
    </div>
    <DataTable
      class="text-xs"
      :value="users"
      table-style="min-width: 50rem"
      scrollable
      :rows="5"
      :rows-per-page-options="[5, 10, 20, 50]"
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
            :src="slotProps.data.user_info.avatar"
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
          <span
            class="cursor-pointer bg-red-500 w-5 h-5 i-material-symbols-light-auto-delete"
            @click="handleDeleteUser(slotProps.data?.id)"
          ></span>
        </template>
      </Column>
      <template #footer> In total there are {{ users ? users.length : 0 }} users. </template>
    </DataTable>

    <div class="card">
      <Paginator
        :rows="10"
        :total-records="120"
      ></Paginator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import type { IUserManage } from '@/types/userManage'
import { getListUserApi, deleteUserApi } from '@/services/userManage'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()

const users = ref<IUserManage[]>([])

onMounted(() => {
  getListUsers()
})

const getListUsers = async (page = 1) => {
  try {
    const data = await getListUserApi(page)
    users.value = data.data
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
</script>
