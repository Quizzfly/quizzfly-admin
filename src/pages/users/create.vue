<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
</script>
<template>
  <div class="flex h-full border shadow-sm rounded-2xl p-5 gap-6">
    <div class="w-[120px]">
      <p class="font-medium">Create user</p>
    </div>
    <form class="flex-auto">
      <div class="flex flex-col">
        <label for="username">Username</label>
        <InputText
          id="username"
          v-model="value"
          size="small"
          placeholder="Enter user name"
        />
      </div>

      <!-- field -->
      <div class="flex gap-4 mt-8 mb-8">
        <div class="flex-1 flex flex-col">
          <label for="username">Email</label>
          <InputText
            id="username"
            v-model="value"
            size="small"
            placeholder="Ex: example@gmail.com"
          />
        </div>

        <div class="flex-1 flex flex-col">
          <label for="username">Phone number</label>
          <InputText
            id="username"
            v-model="value"
            size="small"
            placeholder="Ex: +1 123 456 7890"
          />
        </div>
      </div>

      <!-- field -->
      <FileUpload
        name="demo[]"
        url="/api/upload"
        :multiple="true"
        accept="image/*"
        :max-file-size="1000000"
        @upload="onAdvancedUpload($event)"
      >
        <template #empty>
          <span>Drag and drop files to here to upload.</span>
        </template>
      </FileUpload>

      <Button
        label="Create user"
        class="mt-8"
        type="submit"
        size="small"
      />
    </form>
  </div>
</template>
