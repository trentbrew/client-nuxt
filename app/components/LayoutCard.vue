<template>
  <div
    class="border-border bg-card group hover:border-primary/50 relative overflow-hidden rounded-xl border transition"
  >
    <div class="bg-muted/50 flex aspect-video items-center justify-center">
      <Icon :name="template.icon" class="text-muted-foreground/50 h-12 w-12" />
    </div>
    <div class="space-y-3 p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="space-y-1">
          <h3 class="text-foreground text-sm font-semibold">{{ template.name }}</h3>
          <p class="text-muted-foreground text-xs">{{ template.description }}</p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span
          class="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-medium"
        >
          {{ template.category }}
        </span>
        <button
          class="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition"
          @click="$emit('preview', template)"
        >
          <Icon name="lucide:eye" class="h-3.5 w-3.5" />
          Preview
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface LayoutTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    preview: string;
    icon: string;
  }

  defineProps<{
    template: LayoutTemplate;
  }>();

  defineEmits<{
    preview: [template: LayoutTemplate];
  }>();
</script>
