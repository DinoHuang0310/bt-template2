<template>
  <div class="relative bg-contain bg-no-repeat bg-bottom overflow-hidden">
    <div
      class="relative pb-[60%] sm:pb-[40%] lg:pb-[30%] 2xl:pb-[25%] overflow-hidden"
      style="clip-path: inset(0 0 0 0)"
    >
      <div
        class="fixed lg:absolute top-0 w-full h-[100vh] lg:h-full bg-center bg-cover lg:bg-fixed"
        :style="{'background-image': `url('${setBanner}')`}"
      />
    </div>
    
    <div :style="{'background': background}" :class="className">
      <ContentWrapper
        class="-translate-y-[15vw] sm:-translate-y-[8vw]"
        contentClass="bg-white rounded-lg"
        :showShadow="true"
      >
        <article class="space-y-6">
          <h2 class="text-xl xl:text-3xl font-black">
            <span class="break-words" v-html="title" />
          </h2>

          <slot />

          <div class="text-center mt-8">
            <ReadMoreBtn v-show="link" @click="handleClick" />
          </div>
        </article>
      </ContentWrapper>
    </div>
  </div>
</template>

<script setup>
import ContentWrapper from './ContentWrapper.vue'
import Title from './Title.vue'
import ReadMoreBtn from './ReadMoreBtn.vue'
import { computed, nextTick, onMounted, ref } from 'vue'

import useClientSize from '../composables/useClientSize'
const { isMobile } = useClientSize()

const props = defineProps({
  banner: {
    type: String,
    default: ''
  },
  banner_m: {
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: '#f0f0f0'
  },
  className: {
    type: String,
  },
  title: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
})

const setStar = ref(false)
const wrapperRef = ref(null)

const handleClick = () => {
  if (props.link) {
    window.open(props.link, '_blank');
  }
}

const setBanner = computed(() => {
  if (props.banner_m) {
    return isMobile.value ? props.banner_m : props.banner
  }
  return props.banner;
})

onMounted(() => {
  nextTick(() => {
    setStar.value = true
  })
})
</script>