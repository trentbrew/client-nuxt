<template>
  <div class="space-y-6 py-6">
    <div class="space-y-2">
      <p class="text-xs tracking-[0.18em] text-purple-300 uppercase">Settings</p>
      <h1 class="text-foreground text-3xl font-semibold">Project settings</h1>
      <p class="text-muted-foreground max-w-2xl text-sm">
        Customize your experience with toggles and preferences.
      </p>
    </div>

    <div class="space-y-3">
      <ClientOnly>
        <div
          class="border-border bg-card flex items-center justify-between rounded-xl border px-4 py-3 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div class="bg-primary/10 flex size-9 items-center justify-center rounded-lg">
              <Icon
                :name="colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'"
                class="text-primary size-4"
              />
            </div>
            <div>
              <p class="text-foreground text-sm font-semibold">Dark theme</p>
              <p class="text-muted-foreground text-xs">
                {{ colorMode.value === "dark" ? "Dark mode enabled" : "Light mode enabled" }}
              </p>
            </div>
          </div>
          <UiSwitch v-model="isDark" />
        </div>
        <template #fallback>
          <div
            class="border-border bg-card flex items-center justify-between rounded-xl border px-4 py-3 shadow-sm"
          >
            <div class="flex items-center gap-3">
              <div class="bg-primary/10 flex size-9 items-center justify-center rounded-lg">
                <Icon name="lucide:sun" class="text-primary size-4" />
              </div>
              <div>
                <p class="text-foreground text-sm font-semibold">Dark theme</p>
                <p class="text-muted-foreground text-xs">Loading...</p>
              </div>
            </div>
            <UiSwitch :model-value="false" disabled />
          </div>
        </template>
      </ClientOnly>
      <div
        class="border-border bg-card flex items-center justify-between rounded-xl border px-4 py-3 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div class="bg-muted flex size-9 items-center justify-center rounded-lg">
            <Icon name="lucide:bell" class="text-muted-foreground size-4" />
          </div>
          <div>
            <p class="text-foreground text-sm font-semibold">Notifications</p>
            <p class="text-muted-foreground text-xs">
              Route the bell icon to your notifier preferences.
            </p>
          </div>
        </div>
        <span class="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold"
          >Pending</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $colorMode: colorMode } = useNuxtApp();

  const isDark = computed({
    get: () => colorMode.value === "dark",
    set: (checked) => toggleTheme(checked),
  });

  const toggleTheme = (checked: boolean) => {
    if (checked) {
      colorMode.preference = "dark";
    } else {
      colorMode.preference = "light";
    }
  };
</script>
