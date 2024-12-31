<script lang="ts" setup>
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import {
  createSubscriptionApi,
  getDetailSubscriptionApi,
  updateSubscriptionApi,
} from '@/services/subscription'
import InputNumber from 'primevue/inputnumber'
import { showToast } from '@/utils/toast'
import { apiError } from '@/utils/exceptionHandler'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import type { ISubscription } from '@/types/subscription'

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'created' | 'updated'): void
}>()

const route = useRoute()
const router = useRouter()
const subscriptionId = route.params.id as string

const isLoading = ref(false)
const name = ref('')
const description = ref('')
const duration = ref(0)
const price = ref(0)
const detailSubscription = ref<ISubscription>()

const listOption = [
  {
    name: 'Generate Question By AI',
    code: 'GENERATE_QUESTION_BY_AI',
  },
  {
    name: 'Participant In Room',
    code: 'PARTICIPANT_IN_ROOM',
  },
]

const resourceLimit = ref<
  {
    name: string
    resource_type: any
    limit: number
  }[]
>([{ name: '', resource_type: '', limit: 0 }])

const setData = (data: any) => {
  name.value = data.name
  description.value = data.description
  duration.value = data.duration
  price.value = data.price
  resourceLimit.value = data.resource_limits
}

onMounted(() => {
  if (subscriptionId) {
    getDetailSubscription()
  }
})

const addResource = () => {
  resourceLimit.value.push({ name: '', resource_type: '', limit: 0 })
}

const removeResource = (index: number) => {
  if (index > 0) {
    resourceLimit.value.splice(index, 1)
  } else {
    showToast({ description: "Can't remove the first resource." })
  }
}

const getDetailSubscription = async () => {
  try {
    const data = await getDetailSubscriptionApi(subscriptionId)
    detailSubscription.value = data.data
    setData(data.data)
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
}

const createSubscription = async () => {
  const listResource: { name: string; resource_type: any; limit: number }[] = []
  resourceLimit.value.forEach((el) => {
    listResource.push({
      name: el.name,
      resource_type: el.resource_type.code,
      limit: el.limit,
    })
  })

  try {
    const data = {
      name: name.value,
      description: description.value,
      duration: duration.value,
      price: price.value,
      resource_limits: listResource,
    }

    if (subscriptionId) {
      await updateSubscriptionApi(subscriptionId, data)
      showToast({ description: 'Subscription updated successfully!' })
    } else {
      await createSubscriptionApi(data)
      showToast({ description: 'Subscription created successfully!' })
    }
  } catch (error: any) {
    showToast({
      description: apiError(error).message,
      variant: 'destructive',
    })
  }
  router.push('/payments')
  emits('close')
}
</script>
<template>
  <div class="px-6 py-9 rounded-lg shadow-md mx-16">
    <div class="text-xl w-full font-medium mb-6">
      {{ subscriptionId ? 'Update Subscription' : 'Create Subscription' }}
    </div>
    <form
      class="flex flex-col gap-10"
      @submit.prevent="createSubscription()"
    >
      <div class="gap-8 flex flex-col">
        <div class="card rounded-lg shadow-sm p-8 border gap-6 flex flex-col">
          <div>
            <label
              for="role-name"
              class="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <InputText
              v-model="name"
              type="text"
              placeholder="Enter subscription name"
              class="w-full text-sm h-11"
            />
          </div>
          <div>
            <label
              for="role-name"
              class="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Textarea
              v-model="description"
              rows="5"
              cols="30"
              placeholder="Enter subscription description"
              class="w-full text-sm min-h-[88px]"
            />
          </div>
          <div class="flex items-center gap-4 w-full">
            <div class="w-full">
              <label
                for="role-name"
                class="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <InputNumber
                v-model="duration"
                input-id="minmax"
                :min="0"
                :max="12"
                fluid
                placeholder="Enter duration"
                class="w-full text-sm h-11"
              />
            </div>
            <div class="w-full">
              <label
                for="role-name"
                class="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <InputNumber
                v-model="price"
                input-id="currency-vn"
                mode="currency"
                currency="VND"
                locale="vi-VN"
                fluid
                placeholder="Enter price"
                class="w-full text-sm h-11"
              />
            </div>
          </div>
        </div>

        <div class="card rounded-lg shadow-sm p-8 border gap-3 flex flex-col">
          <label
            for="role-name"
            class="block text-sm font-medium text-gray-700"
          >
            Resource
          </label>
          <div
            v-for="(item, index) in resourceLimit"
            :key="index"
            class="flex items-end gap-4 w-full"
          >
            <div class="w-[28%]">
              <InputText
                v-model="item.name"
                placeholder="Enter name"
                class="w-full text-sm h-11"
              />
            </div>
            <div class="w-[28%]">
              <Select
                v-model="item.resource_type"
                :options="listOption"
                option-label="name"
                placeholder="Select type"
                class="w-full h-11"
              />
            </div>
            <div class="w-[28%">
              <InputNumber
                v-model="item.limit"
                placeholder="Enter limit"
                class="w-full text-sm h-11"
              />
            </div>
            <div
              v-if="index > 0"
              class="flex justify-center items-center rounded-xl cursor-pointer h-11 w-11 border shadow-sm"
              @click="removeResource(index)"
            >
              <span class="i-material-symbols-light-close w-6 h-6"></span>
            </div>
          </div>

          <div
            class="flex justify-center items-center rounded-full cursor-pointer w-11 h-11 ml-auto border bg-emerald-500 shadow-sm"
            @click="addResource()"
          >
            <span class="i-material-symbols-light-add w-7 h-7"></span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-6 px-12 pt-8">
        <Button
          class="h-11 flex gap-2 items-center w-32"
          label="Return"
          icon="pi pi-times"
          severity="secondary"
          @click="emits('close')"
        />
        <Button
          :disabled="isLoading"
          class="h-11 w-32 bg-primary flex gap-2 items-center"
          @click="createSubscription()"
        >
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize"
          ></span>
          {{ subscriptionId ? 'Update' : 'Create' }}
        </Button>
      </div>
    </form>
  </div>
</template>
