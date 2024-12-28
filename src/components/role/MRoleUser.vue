<script lang="ts" setup>
import BaseModal from '../base/BaseModal.vue'
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

import Textarea from 'primevue/textarea'
import { createRoleApi, updateRoleApi } from '@/services/role'
import { getListPermissionApi } from '@/services/permission'
import type { IPermission } from '@/types/permission'

import ScrollPanel from 'primevue/scrollpanel'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import InputText from 'primevue/inputtext'

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'created' | 'updated'): void
}>()

const props = defineProps<{
  roleId?: string
  roleData?: { name: string; description: string; permission_ids: string[] }
}>()

const isLoading = ref(false)
const name = ref('')
const description = ref('')
const permissionId = ref<string[]>([])
const permissions = ref<IPermission[]>()

const getListPermission = async () => {
  try {
    const data = await getListPermissionApi()
    permissions.value = data.data
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const createRole = async () => {
  try {
    const data = {
      name: name.value,
      description: description.value,
      permission_ids: permissionId.value,
    }
    await createRoleApi(data)
    showToast({ description: 'Role created successfully!' })
    emits('created')
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  emits('close')
}

const updateRole = async () => {
  try {
    const data = {
      name: name.value,
      description: description.value,
      permission_ids: permissionId.value,
    }
    await updateRoleApi(props.roleId!, data)
    showToast({ description: 'Role updated successfully!' })
    emits('updated')
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  emits('close')
}

onMounted(() => {
  getListPermission()
  if (props.roleData) {
    name.value = props.roleData.name
    description.value = props.roleData.description
    permissionId.value = props.roleData.permission_ids
  }
})

const cleanActionName = (actionName: string, resourceName: string) => {
  return actionName.replace(new RegExp(resourceName, 'i'), '').trim()
}
</script>

<template>
  <BaseModal @click="emits('close')">
    <div
      class="bg-white w-[750px] mx-auto rounded-3xl shadow-lg relative my-[48px]"
      @click.stop
    >
      <div class="text-4xl w-full text-center font-semibold p-12">
        {{ props.roleId ? 'Update Role' : 'Create Role' }}
      </div>
      <form
        class="flex flex-col gap-10 mx-12"
        @submit.prevent="props.roleId ? updateRole() : createRole()"
      >
        <ScrollPanel style="height: 450px; width: 100%">
          <div class="px-4 gap-6 flex flex-col">
            <div class="">
              <label
                for="role-name"
                class="block text-sm font-medium text-gray-700"
              >
                Role Name
              </label>
              <InputText
                v-model="name"
                type="text"
                placeholder="Enter permission name"
                class="w-full text-sm"
              />
            </div>
            <div>
              <label
                for="role-name"
                class="block text-sm font-medium text-gray-700"
              >
                Role Description
              </label>
              <Textarea
                v-model="description"
                type="text"
                placeholder="Enter permission description"
                class="w-full text-sm min-h-[88px]"
              />
            </div>

            <div class="flex flex-col gap-6">
              <div
                v-for="(item, index) in permissions"
                :key="index"
              >
                <div class="font-medium text-lg mb-2">
                  {{ item.resource }}
                </div>

                <div class="flex flex-wrap gap-7">
                  <div
                    v-for="action in item.actions"
                    :key="action.id"
                    class="flex items-center gap-2"
                  >
                    <Checkbox
                      v-model="permissionId"
                      :input-id="'action-' + action.id"
                      :value="action.id"
                    />
                    <label :for="'action-' + action.id">
                      {{ cleanActionName(action.name, item.resource) }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollPanel>
        <div class="flex items-center justify-center gap-6 px-12 pb-12">
          <Button
            class="w-full h-11 flex gap-2 items-center"
            label="Cancel"
            icon="pi pi-times"
            severity="secondary"
            @click="emits('close')"
          />
          <Button
            :disabled="isLoading"
            class="w-full h-11 bg-primary flex gap-2 items-center"
            @click="props.roleId ? updateRole() : createRole()"
          >
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            {{ props.roleId ? 'Update' : 'Create' }}
          </Button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<style scoped></style>
