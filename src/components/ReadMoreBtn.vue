<template>
  <button class="inline-flex items-center">
    <img v-if="info && info.readmoreImg" class="w-40" :src="info.readmoreImg" alt="觀看完整文章">
    <div v-else>觀看完整文章</div>
  </button>
</template>

<script setup>
import useInfoData from '../composables/useInfoData'
const { info } = useInfoData()
</script>
