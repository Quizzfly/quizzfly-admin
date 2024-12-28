<template>
  <div class="w-full h-screen">
    <div class="flex gap-6 flex-wrap">
      <div
        v-for="item in roles"
        :key="item.id"
        class="flex flex-col justify-end w-[30%] flex-wrap shadow-md rounded-lg p-6 gap-4 relative max-h-[200px]"
      >
        <div class="absolute top-4 right-4 cursor-pointer">
          <span
            class="i-material-symbols-light-delete-sweep-rounded w-5 h-5 bg-red-500"
            @click="handleDeleteRole(item.id)"
          ></span>
          <!-- <div
            v-if="isShowOption"
            class="flex justify-center items-center cursor-pointer absolute px-4 py-3 text-red-600 font-normal text-sm"
            @click="handleDeleteRole(item.id)"
          >
            Delete
          </div> -->
        </div>
        <div class="text-base font-semibold">{{ item.name }}</div>
        <div class="text-sm font-medium">{{ item.description }}</div>
        <div class="flex gap-3 mt-6">
          <Button
            label="View role"
            icon="pi pi-check"
            severity="secondary"
          />
          <Button
            label="Edit role"
            icon="pi pi-check"
            severity="info"
            @click="showUpdateModal(item)"
          />
        </div>
      </div>
      <div
        class="flex flex-col justify-center items-center w-[30%] flex-wrap shadow-md rounded-lg p-6 gap-4 cursor-pointer max-h-[200px]"
      >
        <div class="flex justify-center items-center h-[100px]">
          <img
            src="@/assets/img/add-role.png"
            alt="add-role"
            class="h-full w-full"
          />
        </div>
        <p
          class="text-lg font-medium text-teal-500"
          @click="isShowModal = true"
        >
          Add new Role
        </p>
      </div>
    </div>
    <MRoleUser
      v-if="isShowModal"
      @close="closeModal"
    />
    <MRoleUser
      v-if="isShowUpdateModal"
      :role-data="roleData"
      :role-id="idRole"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { deleteRoleApi, getListRoleApi } from '@/services/role'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useConfirmDialog } from '@/stores/modal'
import type { IListRole } from '@/types/role'
import Button from 'primevue/button'
import MRoleUser from '@/components/role/MRoleUser.vue'

const confirmDialog = useConfirmDialog()
const roles = ref<IListRole[]>([])
const isShowModal = ref(false)
const isShowUpdateModal = ref(false)
const idRole = ref('')
// const isShowOption = ref(false)
const roleData = ref({
  name: '',
  description: '',
  permission_ids: [],
})

// const showOption = () => {
//   isShowOption.value = !isShowOption.value
// }

const showUpdateModal = (data: any) => {
  isShowUpdateModal.value = true
  roleData.value.name = data.name
  roleData.value.description = data.description
  roleData.value.permission_ids = data.permission_ids
  idRole.value = data.id
}

const closeModal = () => {
  isShowModal.value = false
  isShowUpdateModal.value = false
}

onMounted(() => {
  getListRole()
})

const getListRole = async () => {
  try {
    const data = await getListRoleApi()
    roles.value = data.data
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const deleteRole = async (id: string) => {
  try {
    await deleteRoleApi(id)
    const index = roles.value.findIndex((i) => i.id === id)
    index > -1 && roles.value.splice(index, 1)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const handleDeleteRole = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this role?',
    warning: true,
  })

  if (result.isConfirmed) {
    deleteRole(id)
  }
}
</script>

<style scoped lang="scss"></style>
