<template>
  <!-- Root: base layer -->
  <div class="bg-background text-foreground flex h-dvh flex-col">
    <!-- App Header: Navigation shell (matches icon rail) -->
    <header class="border-border bg-foreground/5 flex h-16 shrink-0 items-center gap-0 border-b p-0">
      <!-- Logo container: part of navigation shell -->
      <div class="flex h-16 w-16 items-center justify-center border-b border-transparent">
        <AppNavLink to="/" class="flex h-9 w-9 items-center justify-center">
          <AppLogo :size="28" color-class="text-primary" />
        </AppNavLink>
      </div>
      <div class="border-border mr-4 -ml-px h-full w-px border-l" />
      <OrgSwitcher />
      <nav class="ml-4 flex flex-1 items-center gap-2 text-sm">
        <span class="text-muted-foreground/50 mr-2 -ml-2">/</span>
        <template v-for="(item, i) in routes.breadcrumbs.value" :key="i">
          <template v-if="item?.label">
            <AppNavLink
              v-if="item.path && i !== routes.breadcrumbs.value.length - 1"
              :to="item.path"
              class="text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {{ item.label }}
            </AppNavLink>
            <span v-else class="text-primary font-medium">{{ item.label }}</span>
            <span v-if="i < routes.breadcrumbs.value.length - 1" class="text-muted-foreground/50 mx-2">/</span>
          </template>
        </template>
      </nav>
      <div class="mr-4 flex items-center">
        <button
          type="button"
          @click="commandDialog.open()"
          class="text-muted-foreground hover:text-foreground flex h-9 w-64 items-center gap-2 rounded-md border border-border bg-background/50 px-3 py-2 text-sm transition-colors hover:bg-background/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon name="lucide:search" class="h-4 w-4 shrink-0 opacity-50" />
          <span class="flex-1 text-left">Search...</span>
          <span class="hidden sm:inline-flex">
            <UiKbd>
              <span class="text-xs">⌘</span>
              K
            </UiKbd>
          </span>
        </button>
      </div>
    </header>

    <!-- Command Dialog -->
    <UiCommandDialog
      :open="commandDialog.isOpen.value"
      @update:open="(val) => (commandDialog.isOpen.value = val)"
      title="Command Palette"
      description="Search for pages and navigate quickly"
    >
      <UiCommandInput placeholder="Search pages..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <template v-for="group in commandPaletteGroups" :key="group.label">
          <UiCommandGroup :heading="group.label">
            <template v-for="routeItem in group.routes" :key="routeItem?.path || ''">
              <UiCommandItem
                v-if="routeItem?.path"
                :value="`${group.label} ${routeItem.label}`"
                @select="() => navigateTo(routeItem.path)"
              >
                <Icon :name="routeItem.icon" class="h-4 w-4" />
                <span>{{ routeItem.label }}</span>
                <UiCommandShortcut v-if="routes.getRouteBadge(routeItem)">
                  {{ routes.getRouteBadge(routeItem) }}
                </UiCommandShortcut>
              </UiCommandItem>
            </template>
          </UiCommandGroup>
        </template>
      </UiCommandList>
    </UiCommandDialog>

    <div class="flex flex-1 overflow-hidden">
      <!-- Icon Rail: Navigation shell (matches app header) -->
      <nav
        class="border-border flex w-16 flex-col items-center gap-4 border-r bg-foreground/5 px-2 py-4"
        aria-label="Icon rail"
      >
        <template v-for="item in routes.primaryRailRoutes.value" :key="item?.path || ''">
          <AppNavLink
            v-if="item?.path"
            :to="item.path"
            class="group text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex h-10 w-10 items-center justify-center rounded-xl transition"
            :class="{
              'bg-primary/15 text-foreground': routes.isRouteActive(item.path),
            }"
            :aria-label="item.label"
          >
            <Icon :name="item.icon" class="h-5 w-5" />
          </AppNavLink>
        </template>

        <div class="mt-auto flex flex-col gap-3">
          <template v-for="item in routes.secondaryRailRoutes.value" :key="item?.path || ''">
            <AppNavLink
              v-if="item?.path"
              :to="item.path"
              class="group text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex h-10 w-10 items-center justify-center rounded-xl transition"
              :class="{
                'bg-primary/15 text-foreground': routes.isRouteActive(item.path),
              }"
              :aria-label="item.label"
            >
              <Icon :name="item.icon" class="h-5 w-5" />
            </AppNavLink>
          </template>
        </div>
      </nav>

      <!-- Sidebar: Content frame (matches page header) -->
      <aside
        class="border-border bg-foreground/3 hidden w-64 flex-col border-r px-4 pt-6 pb-4 lg:flex"
        aria-label="Sidebar"
      >
        <!-- Sidebar section items animate per rail route (client-only to avoid hydration mismatches from localStorage/pins) -->
        <ClientOnly>
          <AnimatePresence mode="wait">
            <motion.div
              :key="sidebarSectionKey"
              :initial="{ opacity: 0, x: -8 }"
              :animate="{ opacity: 1, x: 0 }"
              :exit="{ opacity: 0, x: -8 }"
              :transition="{ duration: 0.22, ease: 'easeOut' }"
              class="flex min-h-0 flex-1 flex-col"
            >
              <!-- Pinned Section -->
              <div v-if="pinnedItems.length > 0" class="mb-6">
                <button
                  type="button"
                  @click="collapsed.toggleSection('pinned')"
                  class="text-muted-foreground hover:text-foreground flex w-full items-center justify-start text-xs tracking-wide uppercase transition-colors"
                >
                  <Icon
                    name="lucide:chevron-down"
                    class="mx-2 h-3.5 w-3.5 transition-transform"
                    :class="{ '-rotate-90': collapsed.isCollapsed('pinned') }"
                  />
                  <span class="font-medium">Pinned</span>
                </button>

                <AnimatePresence>
                  <motion.ul
                    v-if="!collapsed.isCollapsed('pinned')"
                    :initial="{ opacity: 0, height: 0 }"
                    :animate="{ opacity: 1, height: 'auto' }"
                    :exit="{ opacity: 0, height: 0 }"
                    :transition="{ duration: 0.2, ease: 'easeOut' }"
                    class="mt-3 space-y-1 overflow-hidden text-sm"
                  >
                    <motion.li
                      v-for="(item, i) in pinnedItems"
                      :key="item?.path || ''"
                      :initial="{ opacity: 0, x: -10 }"
                      :animate="{ opacity: 1, x: 0 }"
                      :exit="{ opacity: 0, x: -10 }"
                      :transition="{ duration: 0.28, ease: 'easeOut', delay: i * 0.035 }"
                    >
                      <div class="group relative">
                        <AppNavLink
                          v-if="item?.path"
                          :to="item.path"
                          class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 pr-8 transition"
                          :class="{ 'bg-primary/15 text-foreground': routes.isRouteActive(item.path) }"
                        >
                          <Icon :name="item.icon" class="h-4 w-4" />
                          <span class="flex-1">{{ item.label }}</span>
                          <span
                            v-if="routes.getRouteBadge(item)"
                            class="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          >
                            {{ routes.getRouteBadge(item) }}
                          </span>
                        </AppNavLink>
                        <button
                          type="button"
                          @click.stop="pinned.togglePin(item.path)"
                          class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="Unpin"
                        >
                          <Icon
                            name="lucide:pin"
                            class="h-3.5 w-3.5 fill-current text-muted-foreground hover:text-foreground"
                          />
                        </button>
                      </div>
                    </motion.li>
                  </motion.ul>
                </AnimatePresence>
              </div>

              <!-- Regular Section -->
              <div>
                <button
                  type="button"
                  @click="collapsed.toggleSection(routes.currentSectionLabel.value)"
                  class="text-muted-foreground hover:text-foreground flex w-full items-center justify-start text-xs tracking-wide uppercase transition-colors"
                >
                  <Icon
                    name="lucide:chevron-down"
                    class="mx-2 h-3.5 w-3.5 transition-transform"
                    :class="{ '-rotate-90': collapsed.isCollapsed(routes.currentSectionLabel.value) }"
                  />
                  <span class="font-medium">{{ routes.currentSectionLabel.value }}</span>
                </button>

                <AnimatePresence>
                  <motion.ul
                    v-if="!collapsed.isCollapsed(routes.currentSectionLabel.value)"
                    :initial="{ opacity: 0, height: 0 }"
                    :animate="{ opacity: 1, height: 'auto' }"
                    :exit="{ opacity: 0, height: 0 }"
                    :transition="{ duration: 0.2, ease: 'easeOut' }"
                    class="mt-3 space-y-1 overflow-hidden text-sm"
                  >
                    <motion.li
                      v-for="(item, i) in unpinnedItems"
                      :key="item?.path || ''"
                      :initial="{ opacity: 0, x: -10 }"
                      :animate="{ opacity: 1, x: 0 }"
                      :exit="{ opacity: 0, x: -10 }"
                      :transition="{ duration: 0.28, ease: 'easeOut', delay: i * 0.035 }"
                    >
                      <div class="group relative">
                        <AppNavLink
                          v-if="item?.path"
                          :to="item.path"
                          class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 pr-8 transition"
                          :class="{ 'bg-primary/15 text-foreground': routes.isRouteActive(item.path) }"
                        >
                          <Icon :name="item.icon" class="h-4 w-4" />
                          <span class="flex-1">{{ item.label }}</span>
                          <span
                            v-if="routes.getRouteBadge(item)"
                            class="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          >
                            {{ routes.getRouteBadge(item) }}
                          </span>
                        </AppNavLink>
                        <button
                          type="button"
                          @click.stop="pinned.togglePin(item.path)"
                          class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="Pin"
                        >
                          <Icon name="lucide:pin" class="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                    </motion.li>
                  </motion.ul>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
          <template #fallback>
            <div class="min-h-0 flex-1">
              <div>
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground flex w-full items-center justify-start text-xs tracking-wide uppercase transition-colors"
                >
                  <Icon name="lucide:chevron-down" class="mx-2 h-3.5 w-3.5" />
                  <span class="font-medium">{{ routes.currentSectionLabel.value }}</span>
                </button>
                <ul class="mt-3 space-y-1 text-sm">
                  <li v-for="item in routes.currentSectionLinks.value" :key="item?.path || ''">
                    <AppNavLink
                      v-if="item?.path"
                      :to="item.path"
                      class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 pr-8 transition"
                      :class="{ 'bg-primary/15 text-foreground': routes.isRouteActive(item.path) }"
                    >
                      <Icon :name="item.icon" class="h-4 w-4" />
                      <span class="flex-1">{{ item.label }}</span>
                    </AppNavLink>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </ClientOnly>

        <!-- Quick tip: elevated card element -->
        <div class="mt-auto border-border bg-card rounded-xl border p-3">
          <p class="text-foreground text-xs font-semibold">Quick tip</p>
          <p class="text-muted-foreground mt-1 text-xs leading-relaxed">
            Press Shift + Option + D to open Nuxt DevTools and inspect routes, data, and assets.
          </p>
        </div>
      </aside>

      <main class="bg-transparent flex-1 overflow-y-auto p-0" aria-label="Main content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { AnimatePresence, motion } from 'motion-v'
  import { useAppNavigate } from '~/composables/useAppNavigate'
  import { getSidebarSection } from '~/config/routes'

  const commandDialog = useCommandDialog()
  const routes = useRoutes()
  const appNavigate = useAppNavigate()
  const pinned = usePinnedItems()
  const collapsed = useCollapsedSections()

  const navigateTo = async (path: string) => {
    await appNavigate.navigate(path)
    commandDialog.close()
  }

  const sidebarSectionKey = computed(() => routes.currentSectionLabel.value)

  // Get pinned items from current section
  const pinnedItems = computed(() => {
    return pinned.getPinnedItems(routes.currentSectionLinks.value)
  })

  // Get unpinned items from current section
  const unpinnedItems = computed(() => {
    return pinned.getUnpinnedItems(routes.currentSectionLinks.value)
  })

  // Group command palette routes by section for better organization
  const commandPaletteGroups = computed(() => {
    const groups = new Map<string, typeof routes.commandPaletteRoutes.value>()

    routes.commandPaletteRoutes.value.forEach((routeItem) => {
      const section = getSidebarSection(routeItem.path)
      const sectionLabel = section?.label || 'Other'

      if (!groups.has(sectionLabel)) {
        groups.set(sectionLabel, [])
      }
      groups.get(sectionLabel)!.push(routeItem)
    })

    return Array.from(groups.entries()).map(([label, routeItems]) => ({
      label,
      routes: routeItems,
    }))
  })
</script>
