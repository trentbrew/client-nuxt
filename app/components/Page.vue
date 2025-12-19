<template>
  <component :is="fullWidth ? 'div' : 'ui-container'" :class="finalContainerClass">
    <div class="space-y-6">
      <!-- Header Section -->
      <div v-if="subtitle || title || description || $slots.header" class="space-y-2">
        <!-- Subtitle with optional back button and icon -->
        <div v-if="subtitle || showBackButton || icon" class="inline-flex items-center gap-2">
          <BackButton v-if="showBackButton" />
          <Icon v-if="icon" :name="icon" :class="iconClass" />
          <p
            v-if="subtitle"
            :class="[
              'text-xs uppercase tracking-[0.18em]',
              subtitleColor || 'text-muted-foreground',
            ]"
          >
            {{ subtitle }}
          </p>
        </div>

        <!-- Title -->
        <h1 v-if="title || $slots.title" class="text-foreground text-3xl font-semibold">
          <slot name="title">{{ title }}</slot>
        </h1>

        <!-- Description -->
        <p
          v-if="description || $slots.description"
          class="text-muted-foreground max-w-2xl text-sm"
        >
          <slot name="description">{{ description }}</slot>
        </p>

        <!-- Custom header slot -->
        <slot name="header" />

        <!-- Metadata / Actions Row -->
        <div
          v-if="metadata || $slots.metadata || $slots.actions"
          class="flex flex-wrap items-center gap-4 pt-2"
        >
          <div v-if="metadata || $slots.metadata" class="flex items-center gap-2">
            <slot name="metadata">
              <template v-if="Array.isArray(metadata)">
                <span
                  v-for="(item, i) in metadata"
                  :key="i"
                  class="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {{ item }}
                </span>
              </template>
              <span
                v-else-if="metadata"
                class="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-semibold"
              >
                {{ metadata }}
              </span>
            </slot>
          </div>
          <div v-if="$slots.actions" class="ml-auto">
            <slot name="actions" />
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-if="$slots.default" :class="contentClass">
        <slot />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
  interface PageProps {
    /** The page title */
    title?: string;
    /** Subtitle text (displayed above title) */
    subtitle?: string;
    /** Color class for subtitle (e.g., 'text-sky-300', 'text-purple-300') */
    subtitleColor?: string;
    /** Description text (displayed below title) */
    description?: string;
    /** Icon name to display next to subtitle */
    icon?: string;
    /** Icon color class */
    iconClass?: string;
    /** Show back button */
    showBackButton?: boolean;
    /** Metadata/badges to display */
    metadata?: string | string[];
    /** Custom class for the container */
    containerClass?: string;
    /** Custom class for the content area */
    contentClass?: string;
    /** SEO title (if different from display title) */
    seoTitle?: string;
    /** SEO description (if different from display description) */
    seoDescription?: string;
    /** Whether the page should be full width (no max-width constraint) */
    fullWidth?: boolean;
  }

  const props = withDefaults(defineProps<PageProps>(), {
    showBackButton: false,
    containerClass: "space-y-6 py-6",
    contentClass: "",
    fullWidth: false,
  });

  // Adjust container class based on fullWidth
  const finalContainerClass = computed(() => {
    if (props.fullWidth) {
      // For full width, ensure we have padding but no max-width
      return `${props.containerClass} w-full px-4 sm:px-6`;
    }
    return props.containerClass;
  });

  // Handle SEO meta reactively
  const seoTitle = computed(() => props.seoTitle || props.title);
  const seoDesc = computed(() => props.seoDescription || props.description);

  watchEffect(() => {
    if (seoTitle.value || seoDesc.value) {
      useSeoMeta({
        title: seoTitle.value,
        description: seoDesc.value,
        ogTitle: seoTitle.value,
        ogDescription: seoDesc.value,
        twitterTitle: seoTitle.value,
        twitterDescription: seoDesc.value,
        twitterCard: "summary_large_image",
      });

      // Set OG image if title and description are available
      if (seoTitle.value && seoDesc.value) {
        defineOgImageComponent("Site", {
          title: seoTitle.value,
          description: seoDesc.value,
        });
      }
    }
  });
</script>
