<template>
  <div
    class="rounded-lg border-2 border-amber-500 bg-amber-50 px-4 py-3 shadow-lg dark:border-amber-400 dark:bg-amber-950"
  >
    <Handle type="target" :position="Position.Left" class="!bg-amber-500" />
    <div class="flex items-center gap-2">
      <div class="flex h-8 w-8 rotate-45 items-center justify-center rounded-sm bg-amber-500 text-white">
        <Icon name="lucide:git-branch" class="-rotate-45 h-4 w-4" />
      </div>
      <div>
        <p class="text-xs font-medium text-amber-700 dark:text-amber-300">Decision</p>
        <p class="text-sm font-semibold text-amber-900 dark:text-amber-100">{{ data.label }}</p>
      </div>
    </div>
    <Handle id="yes" type="source" :position="Position.Right" :style="{ top: '30%' }" class="!bg-green-500" />
    <Handle id="no" type="source" :position="Position.Right" :style="{ top: '70%' }" class="!bg-red-500" />
    <div class="absolute -right-8 top-[30%] -translate-y-1/2">
      <span class="text-xs font-medium text-green-600 dark:text-green-400">Yes</span>
    </div>
    <div class="absolute -right-6 top-[70%] -translate-y-1/2">
      <span class="text-xs font-medium text-red-600 dark:text-red-400">No</span>
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
