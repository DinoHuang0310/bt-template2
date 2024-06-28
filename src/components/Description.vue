<template>
  <div
    v-show="description"
    class="relative py-16 border-b"
    :class="[description && description.className]"
  >
    <ContentWrapper v-if="description && description.content">
      <div class="flex justify-center">
        <div class="space-y-6 first-letter:text-4xl first-letter:float-left first-letter:tracking-widest first-letter:font-light first-letter:pr-0.5">
          <div v-for="list in description.content" :key="list.index">
            <EChart
              v-if="list.type === 'chart'"
              :class="list.className"
              :chartOption="list.content"
            />

            <BtYouTubePlayer
              v-else-if="list.type === 'youtube'"
              :videoId="list.content"
              :class="list.className"
            />

            <img
              v-else-if="list.type === 'img'"
              :src="list.content"
              :class="list.className"
              alt=""
            >

            <component v-else :is="list.type" :class="list.className">
              {{ list.content }}
            </component>
          </div>
        </div>
      </div>
    </ContentWrapper>

    <div class="absolute h-10 left-1/2 bottom-0 border-l border-btnetgray" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

import ContentWrapper from './ContentWrapper.vue'
import BtYouTubePlayer from './BtYouTubePlayer/Player.vue';
import EChart from './EChart.vue';

import useInfoData from '../composables/useInfoData'
const { info } = useInfoData()

const description = computed(() => info.value.description || null)

</script>
