<template>
  <h2
    class="text-2xl xl:text-4xl text-center font-medium text-white -translate-y-1/2"
    :class="classes"
  >
    <div class="relative inline-block p-2 sm:px-4 sm:py-3 border-2 border-white text-shadow shadow-lg">
      <slot />
    </div>
  </h2>
</template>

<script setup>
const props = defineProps({
  classes: {
    type: String,
    default: ''
  }
})
</script>

