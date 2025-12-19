<template>
  <div class="bg-background text-foreground flex h-dvh flex-col">
    <header
      class="border-border bg-card flex h-16 shrink-0 items-center gap-0 border-b p-0 backdrop-blur"
    >
      <div class="flex h-16 w-16 items-center justify-center border-b border-b-[#333] bg-[#1a1a1a]">
        <NuxtLink to="/" class="flex h-9 w-9 items-center justify-center">
          <img src="/logo.png" alt="Logo" class="h-7 w-7 object-contain" />
        </NuxtLink>
      </div>
      <div class="border-border mr-4 -ml-px h-full w-px border-l" />
      <OrgSwitcher />
      <nav class="ml-4 flex flex-1 items-center gap-2 text-sm">
        <span class="text-muted-foreground/50 mr-2">/</span>
        <template v-for="(item, i) in breadcrumbs" :key="i">
          <NuxtLink
            v-if="item.link && i !== breadcrumbs.length - 1"
            :to="item.link"
            class="text-muted-foreground/70 hover:text-foreground transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="text-primary font-medium">{{ item.label }}</span>
          <span v-if="i < breadcrumbs.length - 1" class="text-muted-foreground/50 mx-2">/</span>
        </template>
      </nav>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <nav
        class="border-border flex w-16 flex-col items-center gap-4 border-r bg-[#1a1a1a] px-2 py-4 backdrop-blur"
        aria-label="Icon rail"
      >
        <NuxtLink
          v-for="item in railLinks"
          :key="item.to"
          :to="item.to"
          class="group text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-10 w-10 items-center justify-center rounded-xl transition"
          :class="{
            'bg-accent text-accent-foreground shadow-[0_0_0_1px_hsl(var(--border))]': isActive(
              item.to
            ),
          }"
          :aria-label="item.label"
        >
          <Icon :name="item.icon" class="h-5 w-5" />
        </NuxtLink>

        <div class="mt-auto flex flex-col gap-3">
          <NuxtLink
            v-for="item in railSecondary"
            :key="item.to"
            :to="item.to"
            class="group text-muted-foreground hover:bg-accent hover:text-accent-foreground flex h-10 w-10 items-center justify-center rounded-xl transition"
            :class="{
              'bg-accent text-accent-foreground shadow-[0_0_0_1px_hsl(var(--border))]': isActive(
                item.to
              ),
            }"
            :aria-label="item.label"
          >
            <Icon :name="item.icon" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </nav>

      <aside
        class="border-border bg-sidebar-background/60 hidden w-64 flex-col gap-6 border-r px-4 py-6 backdrop-blur lg:flex"
        aria-label="Sidebar"
      >
        <div class="space-y-3">
          <p class="text-muted-foreground text-xs tracking-wide uppercase">
            {{ currentSectionLabel }}
          </p>
          <ul class="space-y-1 text-sm">
            <li v-for="item in currentSectionLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-foreground/80 hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 transition"
                :class="{ 'bg-accent text-accent-foreground': isActive(item.to) }"
              >
                <Icon :name="item.icon" class="h-4 w-4" :class="item.tint" />
                <span class="flex-1">{{ item.label }}</span>
                <span
                  v-if="item.badge"
                  class="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold"
                >
                  {{ item.badge }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="border-border bg-muted/50 rounded-xl border p-3">
          <p class="text-foreground text-xs font-semibold">Quick tip</p>
          <p class="text-muted-foreground mt-1 text-xs leading-relaxed">
            Press Shift + Option + D to open Nuxt DevTools and inspect routes, data, and assets.
          </p>
        </div>
      </aside>

      <main
        class="bg-background flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
        aria-label="Main content"
      >
        <div class="mx-auto max-w-6xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();

  const railLinks = [
    { to: "/forms/feed", label: "Home", icon: "lucide:home" },
    { to: "/layouts/playground", label: "Layouts", icon: "lucide:layout-dashboard" },
    { to: "/activity/feed", label: "Activity", icon: "lucide:activity" },
    { to: "/settings/project", label: "Settings", icon: "lucide:settings" },
  ];

  const railSecondary = [
    { to: "/settings/notifications", label: "Notifications", icon: "lucide:bell" },
    { to: "/settings/profile", label: "Profile", icon: "lucide:user" },
  ];

  const navSections: Record<
    string,
    {
      label: string;
      links: Array<{ to: string; label: string; icon: string; tint?: string; badge?: string }>;
    }
  > = {
    "/forms": {
      label: "Forms",
      links: [
        {
          to: "/forms/feed",
          label: "Live counter",
          icon: "lucide:loader-2",
          tint: "text-emerald-300",
        },
        {
          to: "/forms/new",
          label: "Create form",
          icon: "lucide:square-plus",
          tint: "text-sky-300",
        },
        {
          to: "/forms/library",
          label: "Templates",
          icon: "lucide:library",
          tint: "text-indigo-300",
        },
      ],
    },
    "/layouts": {
      label: "Layouts",
      links: [
        {
          to: "/layouts/templates",
          label: "Templates",
          icon: "lucide:layout-grid",
          tint: "text-violet-300",
        },
        {
          to: "/layouts/playground",
          label: "Playground",
          icon: "lucide:layout-template",
          tint: "text-sky-300",
        },
        {
          to: "/layouts/shells",
          label: "Shells",
          icon: "lucide:panels-top-left",
          tint: "text-cyan-300",
        },
        {
          to: "/layouts/sections",
          label: "Sections",
          icon: "lucide:rows",
          tint: "text-emerald-300",
        },
      ],
    },
    "/tokens": {
      label: "Design tokens",
      links: [
        { to: "/tokens", label: "Overview", icon: "lucide:swatch-book", tint: "text-indigo-300" },
        { to: "/tokens/colors", label: "Colors", icon: "lucide:palette", tint: "text-pink-300" },
        { to: "/tokens/type", label: "Typography", icon: "lucide:type", tint: "text-amber-300" },
      ],
    },
    "/activity": {
      label: "Activity",
      links: [
        { to: "/activity/feed", label: "Feed", icon: "lucide:activity", tint: "text-orange-300" },
        {
          to: "/activity/analytics",
          label: "Analytics",
          icon: "lucide:chart-line",
          tint: "text-lime-300",
        },
        {
          to: "/activity/responses",
          label: "Responses",
          icon: "lucide:inbox",
          tint: "text-sky-300",
          badge: "24",
        },
      ],
    },
    "/settings": {
      label: "Settings",
      links: [
        {
          to: "/settings/project",
          label: "Project",
          icon: "lucide:settings",
          tint: "text-purple-300",
        },
        { to: "/settings/profile", label: "Profile", icon: "lucide:user", tint: "text-sky-300" },
        {
          to: "/settings/notifications",
          label: "Notifications",
          icon: "lucide:bell",
          tint: "text-pink-300",
          badge: "3",
        },
      ],
    },
  };

  const currentSectionKey = computed(() => {
    const keys = Object.keys(navSections).sort((a, b) => b.length - a.length);
    return keys.find((key) => route.path.startsWith(key)) || "/";
  });

  const currentSection = computed(
    () => navSections[currentSectionKey.value as keyof typeof navSections]
  );
  const currentSectionLinks = computed(() => currentSection.value?.links || []);
  const currentSectionLabel = computed(() => currentSection.value?.label || "Navigation");

  const isActive = (path: string) => route.path === path;

  const breadcrumbs = computed(() => {
    const items: Array<{ label: string; link?: string; icon?: string }> = [];

    if (currentSection.value) {
      const sectionLink = currentSection.value.links[0]?.to || currentSectionKey.value;
      items.push({ label: currentSection.value.label, link: sectionLink });

      const currentPage = currentSection.value.links.find((l) => l.to === route.path);
      if (currentPage) {
        items.push({ label: currentPage.label });
      } else {
        const pathSegments = route.path.split("/").filter(Boolean);
        if (pathSegments.length > 2) {
          const parentPath = `/${pathSegments.slice(0, -1).join("/")}`;
          const parentPage = currentSection.value.links.find((l) => l.to === parentPath);
          if (parentPage) {
            items.push({ label: parentPage.label, link: parentPath });
          }

          const templateName = pathSegments[pathSegments.length - 1];
          if (templateName) {
            items.push({
              label: templateName.charAt(0).toUpperCase() + templateName.slice(1),
            });
          }
        }
      }
    }

    return items;
  });
</script>
