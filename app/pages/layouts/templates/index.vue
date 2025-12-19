<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <p class="text-xs tracking-[0.18em] text-sky-300 uppercase">Layouts</p>
      <h1 class="text-foreground text-3xl font-semibold">Page templates</h1>
      <p class="text-muted-foreground max-w-2xl text-sm">
        A collection of ready-to-use page layouts and templates for common UI patterns.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <LayoutCard
        v-for="template in templates"
        :key="template.id"
        :template="template"
        @preview="openPreview"
      />
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

  const templates = ref<LayoutTemplate[]>([
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Analytics dashboard with stats cards, charts, and data tables.",
      category: "Admin",
      preview: "/layouts/templates/dashboard",
      icon: "lucide:layout-dashboard",
    },
    {
      id: "settings",
      name: "Settings",
      description: "User settings page with grouped form sections and toggles.",
      category: "Admin",
      preview: "/layouts/templates/settings",
      icon: "lucide:settings",
    },
    {
      id: "profile",
      name: "Profile",
      description: "User profile page with avatar, bio, and activity feed.",
      category: "Admin",
      preview: "/layouts/templates/profile",
      icon: "lucide:user",
    },
    {
      id: "pricing",
      name: "Pricing",
      description: "Pricing comparison table with feature lists and CTAs.",
      category: "Marketing",
      preview: "/layouts/templates/pricing",
      icon: "lucide:credit-card",
    },
    {
      id: "landing",
      name: "Landing page",
      description: "Hero section with features, testimonials, and footer.",
      category: "Marketing",
      preview: "/previews/landing.png",
      icon: "lucide:rocket",
    },
    {
      id: "blog",
      name: "Blog",
      description: "Blog listing with cards, filters, and pagination.",
      category: "Content",
      preview: "/previews/blog.png",
      icon: "lucide:newspaper",
    },
    {
      id: "auth",
      name: "Authentication",
      description: "Login, signup, and password reset forms.",
      category: "Auth",
      preview: "/previews/auth.png",
      icon: "lucide:lock",
    },
    {
      id: "empty",
      name: "Empty state",
      description: "Placeholder for empty data views with action prompts.",
      category: "Utility",
      preview: "/previews/empty.png",
      icon: "lucide:inbox",
    },
    {
      id: "error",
      name: "Error pages",
      description: "404, 500, and maintenance page templates.",
      category: "Utility",
      preview: "/previews/error.png",
      icon: "lucide:alert-triangle",
    },
  ]);

  const openPreview = async (template: LayoutTemplate) => {
    await navigateTo(template.preview);
  };
</script>
