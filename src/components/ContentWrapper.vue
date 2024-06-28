<template>
  <div class="relative container w-11/12 sm:w-full mx-auto">
    <div class="relative p-4 md:p-8 xl:p-12" :class="[showShadow && 'shadow-xl', contentClass]">
      <slot />
    </div>
  </div>
</template>

<script setup>
import useClientSize from '../composables/useClientSize'

const { isMobile } = useClientSize(1280)

const props = defineProps({
  showShadow: {
    type: Boolean,
    default: false,
  },
  contentClass: {
    type: String,
    default: ''
  },
})

</script>