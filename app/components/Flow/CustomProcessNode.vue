<template>
  <div class="rounded-lg border-2 border-blue-500 bg-blue-50 px-4 py-3 shadow-lg dark:border-blue-400 dark:bg-blue-950">
    <Handle type="target" :position="Position.Left" class="!bg-blue-500" />
    <div class="flex items-center gap-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
        <Icon name="lucide:cpu" class="h-4 w-4" />
      </div>
      <div>
        <p class="text-xs font-medium text-blue-700 dark:text-blue-300">Process</p>
        <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">{{ data.label }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Right" class="!bg-blue-500" />
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
