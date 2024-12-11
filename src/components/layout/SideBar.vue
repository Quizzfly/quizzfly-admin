<script setup lang="ts">
const menus = ref([
  {
    name: 'Dashboard',
    icon: 'pi pi-home',
    items: [
      { icon: 'i-material-symbols-light-home', name: 'Dashboard', to: '/' },
      { icon: 'i-material-symbols-light-groups', name: 'Groups', to: '/groups' },
    ],
  },
  {
    name: 'Users management',
    icon: 'pi pi-th-large',
    items: [
      { icon: 'i-material-symbols-light-account-circle', name: 'Users', to: '/users' },
      { icon: 'i-material-symbols-light-person-add', name: 'Add new user', to: '/users/create' },
    ],
  },
  {
    name: 'Quizzfly management',
    icon: 'pi pi-th-large',
    items: [
      { icon: 'i-material-symbols-light-quiz', name: 'All quizzfly', to: '/quizzfly' },
      {
        icon: 'i-material-symbols-light-auto-delete',
        name: 'Quizzfly deleted',
        to: '/quizzfly/deleted',
      },
    ],
  },
  {
    name: 'Room',
    icon: 'pi pi-th-large',
    items: [{ icon: 'i-material-symbols-light-quiz', name: 'Room playing', to: '/quizzfly' }],
  },
  {
    name: 'Settings',
    icon: 'pi pi-cog',
    items: [
      { icon: 'i-material-symbols-light-account-circle', name: 'Profile', to: '/profile' },
      { icon: 'i-material-symbols-light-settings', name: 'Settings', to: '/settings' },
    ],
  },
])
</script>
<template>
  <div
    class="bg-[#020618] rounded-tr-3xl rounded-br-3xl text-[#96a2b4] py-3 flex flex-col w-[237px] min-w-[237px] border-r gap-2"
  >
    <p class="font-semibold text-lg mt-5 mx-5">DASHBOARD</p>

    <div
      v-for="menu in menus"
      :key="menu.name"
      class="px-4"
    >
      <p class="text-[#96a2b4] text-xs mt-3">{{ menu.name }}</p>
      <ul class="mt-2 w-full">
        <li
          v-for="item in menu.items"
          :key="item.name"
          class="w-full flex items-center gap-2"
        >
          <router-link
            :to="item.to"
            class="w-full flex items-center gap-2 p-2 rounded-md hover:bg-[#020618] hover:text-[#ffffff]"
            active-class="router-link-exact-active"
          >
            <span
              :class="item.icon"
              class="text-2xl"
            ></span>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.router-link-exact-active {
  background-color: #f7f7f7 !important;
  color: #344054 !important;
}
</style>
