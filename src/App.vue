<template>
  <div class="relative">
    <header class="fixed flex justify-between items-center w-full top-0 px-4 py-2 bg-white border-b z-50">
      <a class="block w-16 xl:w-20" href="https://www.businesstoday.com.tw/" target="blank">
        <img src="./assets/images/businesstoday.svg" alt="businesstoday">
      </a>
      <BtNavbar :navList="info.menu" :closeByBackdrop="true" :collapse="true">
        <template v-slot:after>
          <div class="flex items-center space-x-2 py-2 px-4 lg:p-0 lg:ml-2">
            <a class="w-7 md:w-8" href="https://www.facebook.com/BToday/" target="blank">
              <img src="./assets/images/ico-facebook.svg" alt="businesstoday-facebook">
            </a>
            <a class="w-7 md:w-8" href="https://page.line.me/btoday?openQrModal=true" target="blank">
              <img src="./assets/images/ico-line.svg" alt="businesstoday-line">
            </a>
            <a class="w-7 md:w-8" href="https://www.instagram.com/btoday_ig/" target="blank">
              <img src="./assets/images/ico-instagram.svg" alt="businesstoday-instagram">
            </a>
          </div>
        </template>
      </BtNavbar>
    </header>

    <Kvarea />

    <main class="relative z-10 bg-white overflow-hidden">

      <Description id="about" />

      <ArticleWrapper
        v-for="(item, index) in info.articles"
        :key="index"
        :id="`article${index + 1}`"
        :title="item.title"
        :banner="item.image"
        :banner_m="item.image_m"
        :background="item.background"
        :link="item.url"
        :className="item.className"
      >
        <div v-for="list in item.content" :key="list.index">
          <EChart
            v-if="list.type === 'chart'"
            class="mt-8"
            :class="list.className"
            :chartOption="list.content"
          />

          <BtYouTubePlayer v-else-if="list.type === 'youtube'" :videoId="list.content" />

          <img v-else-if="list.type === 'img'" :src="list.content" alt="">

          <component v-else :is="list.type" :class="list.className">
            {{ list.content }}
          </component>
        </div>
      </ArticleWrapper>

    </main>

    <BtFooter class="relative z-10" :copyright="info ? info.copyright : null" :showFloat="false" />

    <!-- light box container -->
    <ModalsContainer />

  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal';
import useInfoData from './composables/useInfoData';
import useClientSize from './composables/useClientSize';

import BtNavbar from './components/BtNavbar/Nav.vue';
import Kvarea from './components/Kvarea.vue';
import Description from './components/Description.vue';
import BtFooter from './components/BtFooter.vue';
import ArticleWrapper from './components/ArticleWrapper.vue'
import ContentWrapper from './components/ContentWrapper.vue';
import EChart from './components/EChart.vue'
import BtYouTubePlayer from './components/BtYouTubePlayer/Player.vue'

const { isMobile } = useClientSize(1280)
const { info, getInfo } = useInfoData();

getInfo();

</script>