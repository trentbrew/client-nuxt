<template>
  <Page v-slot="{ isFullWidth }" subtitle="Layouts" subtitle-color="text-sky-300" title="Page templates"
    description="A collection of ready-to-use page layouts and templates for common UI patterns."
    container-class="space-y-8">
    <div class="grid gap-6 sm:grid-cols-2" :class="isFullWidth ? 'lg:grid-cols-4' : 'lg:grid-cols-3'">
      <LayoutCard v-for="template in templates" :key="template.id" :template="template" @preview="openPreview" />
    </div>
  </Page>
</template>

<script lang="ts"
        setup>
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
