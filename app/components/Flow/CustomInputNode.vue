<template>
  <div
    class="rounded-lg border-2 border-green-500 bg-green-50 px-4 py-3 shadow-lg dark:border-green-400 dark:bg-green-950"
  >
    <div class="flex items-center gap-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
        <Icon name="lucide:play" class="h-4 w-4" />
      </div>
      <div>
        <p class="text-xs font-medium text-green-700 dark:text-green-300">Input</p>
        <p class="text-sm font-semibold text-green-900 dark:text-green-100">{{ data.label }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Right" class="!bg-green-500" />
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
