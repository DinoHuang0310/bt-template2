<template>
  <div class="relative flex flex-wrap h-[100vh] w-full items-center pt-8 md:pt-12 overflow-hidden">
    <div
      class="fixed z-0 w-full h-[100vh] top-0 left-0 bg-center bg-cover"
      :style="{'background-image': `url('${isDev ? '' : '.'}/images/${setBackgroundImg}')`}"
    />
    <div v-if="overY" class="fixed bottom-0 left-0 h-[100vh] w-full bg-btnetgray" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import useClientSize from '../composables/useClientSize'
const { width, height } = useClientSize()

import useClientConfig from '../composables/useClientConfig'
const { isDev } = useClientConfig()

import useWindowScroll from '../composables/useWindowScroll'
const { overY } = useWindowScroll(height.value * 1.5)

const setBackgroundImg = computed(() => {
  if (width.value > 1023) {
    return 'background.jpg'
  } else if (width.value > 767) {
    return 'background_m.jpg'
  }
  return 'background_sm.jpg'
})

</script>
