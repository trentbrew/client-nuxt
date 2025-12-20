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
  import { useAppNavigate } from '~/composables/useAppNavigate'

  useHead({
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' }],
  })

  const pageEl = ref<HTMLElement | null>(null)
  const appNavigate = useAppNavigate()

  onMounted(() => {
    appNavigate.registerPageElement(pageEl.value)
  })

  onBeforeUnmount(() => {
    appNavigate.registerPageElement(null)
  })
</script>
