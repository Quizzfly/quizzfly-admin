<template>
  <div class="flex gap-9">
    <div
      class="flex flex-col justify-end flex-wrap shadow-md rounded-lg p-6 gap-4 relative w-[300px] max-h-[200px]"
    >
      <div class="text-base font-semibold">{{ roleInfo?.name }}</div>
      <div class="text-sm font-medium">{{ roleInfo?.description }}</div>
      <div class="flex gap-3 mt-6">
        <Button
          label="Edit role"
          icon="pi pi-check"
          severity="info"
          @click="showUpdateModal(roleInfo)"
        />
      </div>
    </div>
    <div class="card border rounded-2xl">
      <div class="flex items-center justify-between pr-5">
        <div class="flex items-center gap-5">
          <div class="px-4 mt-4 mb-4">
            <p class="text-sm font-medium">Recent New Users</p>
            <p class="text-xs text-gray-400">
              Details of recently registered users on the platform.
            </p>
          </div>
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="keywords"
              placeholder="Search user"
              class="text-sm font-normal"
              @input="handleSearch()"
            />
          </IconField>
        </div>
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
              <Select
                :options="listRole"
                option-label="name"
                option-value="id"
                placeholder="Select role"
                class="w-[138px]"
                @change="assignRole($event.value, slotProps.data.id)"
              />
            </template>
          </Column>
          <template #footer> In total there are {{ users ? users.length : 0 }} users. </template>
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
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import { getRoleInforAndPermissionApi, getListRoleApi, assignRoleForUserApi } from '@/services/role'
import { getListUserByRoleApi } from '@/services/userManage'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import ScrollPanel from 'primevue/scrollpanel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import MRoleUser from '@/components/role/MRoleUser.vue'
import Button from 'primevue/button'
import Select from 'primevue/select'
import type { IUserManage } from '@/types/userManage'
import type { IListRole } from '@/types/role'

const route = useRoute()

const idRole = route.params.id as string

const users = ref<IUserManage[]>([])
const roleInfo = ref()
const metaPage = ref()
const currentPage = ref(1)
const keywords = ref('')
const isShowModal = ref(false)
const isShowUpdateModal = ref(false)
const roleData = ref({
  name: '',
  description: '',
  permission_ids: [],
})
const listRole = ref<IListRole[]>([])

onMounted(() => {
  getRoleInfoGroup()
  getListUserRole()
  getListRole()
})

const showUpdateModal = (data: any) => {
  isShowUpdateModal.value = true
  roleData.value.name = data.name
  roleData.value.description = data.description
  roleData.value.permission_ids = data.permission_ids
}

const closeModal = () => {
  isShowModal.value = false
  isShowUpdateModal.value = false
}

const getListUserRole = async (page = 1) => {
  try {
    const data = await getListUserByRoleApi(idRole, keywords.value, page)
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

const getListRole = async () => {
  try {
    const data = await getListRoleApi()
    listRole.value = data.data
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const getRoleInfoGroup = async () => {
  try {
    const data = await getRoleInforAndPermissionApi(idRole)
    roleInfo.value = data.data
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const assignRole = async (idRole: string, userId: string) => {
  try {
    await assignRoleForUserApi(idRole, userId)
    showToast({
      description: 'Role assigned successfully!',
    })
    getListUserRole(currentPage.value)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const onPageChange = (event: { page: number }) => {
  const newPage = event.page + 1
  getListUserRole(newPage)
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
  getListUserRole()
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
