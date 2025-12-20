import { animate } from 'motion-v'

let pageElement: HTMLElement | null = null
let isTransitioning = false

const isPlainLeftClick = (e: MouseEvent) => {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

export const useAppNavigate = () => {
  const router = useRouter()
  const route = useRoute()

  const registerPageElement = (el: HTMLElement | null) => {
    pageElement = el
  }

  const navigate = async (to: string, e?: MouseEvent) => {
    if (e && !isPlainLeftClick(e)) return

    if (!to || to === route.path) return

    // If we're not on the client or we don't have a target element yet, just navigate.
    if (!process.client || !pageElement) {
      await router.push(to)
      return
    }

    // Prevent router churn if user double-clicks.
    if (isTransitioning) return
    isTransitioning = true

    const el = pageElement

    try {
      // LEAVE: start immediately (no perceived lag)
      el.style.pointerEvents = 'none'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0px)'

      const leaveControls = animate(el, { opacity: [1, 0], y: [0, -8] }, { duration: 0.2, easing: 'ease-in' })

      // Wait for the leave animation to complete before changing the route.
      await leaveControls.finished

      // Keep wrapper hidden during the swap to prevent any flash.
      el.style.opacity = '0'
      el.style.transform = 'translateY(8px)'

      await router.push(to)
      await nextTick()

      // ENTER
      el.style.pointerEvents = 'none'
      el.style.opacity = '0'
      el.style.transform = 'translateY(8px)'

      const enterControls = animate(el, { opacity: [0, 1], y: [8, 0] }, { duration: 0.2, easing: 'ease-out' })

      await enterControls.finished
    } finally {
      if (pageElement) {
        pageElement.style.pointerEvents = ''
        pageElement.style.opacity = ''
        pageElement.style.transform = ''
      }
      isTransitioning = false
    }
  }

  return {
    navigate,
    registerPageElement,
  }
}
