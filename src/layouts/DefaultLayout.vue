<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import TopBar from '@/components/layout/TopBar.vue'
</script>
<template>
  <div class="container-div">
    <!-- <TopBar /> -->
    <SideBar />
    <div class="p-5 pt-0 gap-5 flex-1 relative flex flex-col overflow-auto">
      <TopBar />
      <slot />
      <footer class="text-center text-gray-400 text-xs">
        <p>&copy; 2024 All rights reserved</p>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container-div {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  width: 100%;

  .wrapper {
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }
}
</style>
