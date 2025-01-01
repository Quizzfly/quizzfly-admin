<template>
  <div class="w-full h-screen">
    <div class="flex gap-6 flex-wrap">
      <div
        v-for="item in subscriptions"
        :key="item.id"
        class="flex flex-col justify-between w-[30%] flex-wrap shadow-md rounded-lg p-6 gap-4 relative max-h-[400px]"
      >
        <div class="absolute top-4 right-4 cursor-pointer">
          <span
            class="i-material-symbols-light-delete-sweep-rounded w-5 h-5 bg-red-500"
            @click="handleDeleteSubscription(item.id)"
          ></span>
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-base font-semibold">{{ item.name }}</div>
          <div class="text-sm font-medium description">{{ item.description }}</div>
        </div>
        <div class="flex gap-3 mt-6">
          <Button
            label="Edit Subscription"
            class="text-sm"
            icon="pi pi-check"
            severity="info"
            @click="router.push(`/payments/update/${item.id}`)"
          />
        </div>
      </div>
      <div
        class="flex flex-col justify-center items-center w-[30%] flex-wrap shadow-md rounded-lg p-6 gap-4 cursor-pointer max-h-[300px]"
        @click="router.push('/payments/create')"
      >
        <div class="flex justify-center items-center h-[100px]">
          <img
            src="@/assets/img/add-role.png"
            alt="add-role"
            class="h-full w-full"
          />
        </div>
        <p class="text-sm font-medium text-teal-500">Add new Subscription</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getListSubscriptionApi, deleteSubscriptionApi } from '@/services/subscription'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import { useConfirmDialog } from '@/stores/modal'
import type { ISubscription } from '@/types/subscription'
import Button from 'primevue/button'

const confirmDialog = useConfirmDialog()
const subscriptions = ref<ISubscription[]>([])
const router = useRouter()

onMounted(() => {
  getListSubscription()
})

const getListSubscription = async () => {
  try {
    const data = await getListSubscriptionApi()
    subscriptions.value = data.data
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const deleteSubscription = async (id: string) => {
  try {
    await deleteSubscriptionApi(id)
    const index = subscriptions.value.findIndex((i) => i.id === id)
    index > -1 && subscriptions.value.splice(index, 1)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const handleDeleteSubscription = async (id: string) => {
  const result = await confirmDialog.open({
    title: 'Are you sure?',
    question: 'Do you really want to delete this subscription?',
    warning: true,
  })

  if (result.isConfirmed) {
    deleteSubscription(id)
  }
}
</script>

<style scoped lang="scss">
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  line-height: 1.5;
  max-height: calc(1.5em * 3);
}
</style>
