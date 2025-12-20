<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <div ref="pageEl" class="page-transition-wrapper">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
  import { useAppNavigate, handleBrowserNavigation } from '~/composables/useAppNavigate'

  useHead({
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' }],
  })

  const pageEl = ref<HTMLElement | null>(null)
  const appNavigate = useAppNavigate()
  const route = useRoute()

  let previousPath = ref('')
  let isInitialMount = true

  onMounted(() => {
    appNavigate.registerPageElement(pageEl.value)
    previousPath.value = route.path
    isInitialMount = false

    // Watch for route changes to handle browser back/forward navigation
    watch(
      () => route.path,
      async (newPath, oldPath) => {
        // Skip on initial mount and if paths are the same
        if (isInitialMount || !oldPath || newPath === oldPath) {
          previousPath.value = newPath
          return
        }

        // Determine direction based on path depth
        const oldDepth = oldPath.split('/').filter(Boolean).length
        const newDepth = newPath.split('/').filter(Boolean).length
        const direction: 'forward' | 'back' = newDepth < oldDepth ? 'back' : 'forward'

        // Handle browser navigation (this will be skipped if custom navigation is active)
        await handleBrowserNavigation(direction)
        previousPath.value = newPath
      },
      { flush: 'post' },
    )
  })

  onBeforeUnmount(() => {
    appNavigate.registerPageElement(null)
  })
</script>
