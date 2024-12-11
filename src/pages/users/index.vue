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
        field="name"
        header="Name"
        style="min-width: 100px"
      ></Column>
      <Column
        style="min-width: 100px"
        header="Avatar"
      >
        <template #body="slotProps">
          <img
            :src="slotProps.data.avatar"
            :alt="slotProps.data.name"
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
        header="Status"
      >
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data)"
          />
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
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
const users = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'alice.johnson@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'bob.smith@example.com',
    role: 'User',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    email: 'charlie.brown@example.com',
    role: 'Moderator',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Daisy Lee',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    email: 'daisy.lee@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Daisy Lee',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    email: 'daisy.lee@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Daisy Lee',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    email: 'daisy.lee@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Daisy Lee',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    email: 'daisy.lee@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Daisy Lee',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    email: 'daisy.lee@example.com',
    role: 'User',
    status: 'Active',
  },
])

const getSeverity = (user) => {
  switch (user.status) {
    case 'Active':
      return 'success'

    case 'Pending':
      return 'warn'

    case 'Inactive':
      return 'danger'

    default:
      return null
  }
}
</script>
