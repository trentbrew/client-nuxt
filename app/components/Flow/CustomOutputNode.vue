<template>
  <div
    class="rounded-lg border-2 border-purple-500 bg-purple-50 px-4 py-3 shadow-lg dark:border-purple-400 dark:bg-purple-950"
  >
    <Handle type="target" :position="Position.Left" class="!bg-purple-500" />
    <div class="flex items-center gap-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
        <Icon name="lucide:flag" class="h-4 w-4" />
      </div>
      <div>
        <p class="text-xs font-medium text-purple-700 dark:text-purple-300">Output</p>
        <p class="text-sm font-semibold text-purple-900 dark:text-purple-100">{{ data.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Handle, Position } from '@vue-flow/core'

  defineProps<{
    data: {
      label: string
    }
  }>()
</script>
