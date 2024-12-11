<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Breadcrumb from 'primevue/breadcrumb'

const route = useRoute()
const items = computed(() => {
  const routes = route.matched
  return routes.map((route) => ({
    label: (route.meta.title as string) || 'Dashboard',
    route: route.path,
  }))
})
</script>
<template>
  <div class="w-full min-h-[54px] h-[54px] items-center flex justify-between border-b">
    <div>
      <Breadcrumb
        class="pl-0"
        :model="items"
      >
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a
              :href="href"
              v-bind="props.action"
              @click="navigate"
            >
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-medium">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </div>
    <div>
      <Avatar
        label="U"
        class="mr-2"
        style="background-color: #dee9fc; color: #1a2551"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
