<template>
  <div>
    <div class="relative flex">
      <div v-if="showNavigation" class="w-10">
        <div class="swiper-button-prev" ref="prevRef" />
      </div>

      <div class="swiper flex-1" ref="swiperRef">
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide" v-for="list in sliderData" :key="list.index">
            <template v-if="$slots.listItem">
              <slot name="listItem" :item="list" />
            </template>
            
            <a
              v-else
              :href="list.url"
              target="blank"
              class="relative block w-full group"
            >
              <div
                v-if="theme === 'inside-title'"
                class="aspect-[4/3] bg-cover bg-center duration-500 group-hover:md:opacity-75"
                :style="{'background-image': `url('${list.image}')`}"
              >
                <p class="absolute w-full bottom-0 left-0 px-3 py-2 text-white bg-black/60">
                  <span class="line-clamp-2">{{ list.title }}</span>
                </p>
              </div>

              <div v-if="theme === 'outside-title'">
                <div
                  class="relative aspect-[4/3] bg-cover bg-center"
                  :style="{'background-image': `url('${list.image}')`}"
                >
                  <div
                    class="absolute w-full h-full top-0 left-0 flex justify-center items-center opacity-0 group-hover:md:opacity-100 transform duration-500 bg-black/70"
                  >
                    <div class="text-white text-sm border border-white px-4 py-2">了解更多</div>
                  </div>
                </div>
                <p class="py-1">
                  <span class="line-clamp-2">{{ list.title }}</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div v-if="showNavigation" class="w-10">
        <div v-if="showNavigation" class="swiper-button-next" ref="nextRef" />
      </div>
    </div>

    <!-- pagination -->
    <div v-if="showPagination" class="swiper-pagination" ref="paginationRef" />

  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';

import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';

export default {
  props: {
    sliderData: {
      type: Array,
      default: [],
    },
    theme: {
      type: String,
      default: 'inside-title'
    },
    showNavigation: {
      type: Boolean,
    },
    showPagination: {
      type: Boolean,
    },
    params: {
      type: Object,
      default: {
        spaceBetween: 30,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        },
        autoplay: {
          delay: 5000,
        },
        pagination: true,
        navigation: true,
      }
    }
  },

  setup(props) {

    const swiperRef = ref(null);
    const paginationRef = ref(null);
    const nextRef = ref(null);
    const prevRef = ref(null);

    let swiper = null;

    watch(props.sliderData, () => {
      nextTick(() => swiper.update());
    })

    onMounted(() => {
      // initialize swiper
      swiper = new Swiper(swiperRef.value, {
        ...props.params,
        pagination: {
          el: paginationRef.value,
          clickable: true
        },
        navigation: {
          nextEl: nextRef.value,
          prevEl: prevRef.value,
        },
      });
    })

    onUnmounted(() => {
      swiper.destroy();
    })

    return {
      swiperRef,
      paginationRef,
      nextRef,
      prevRef
    }
  }
}
</script>

<style>
/* swiper reset css */
.swiper-button-next, .swiper-button-prev {
  color: var(--color-primary);
}
.swiper-pagination-bullet-active {
  background-color: var(--color-primary);
}
.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
  position: relative;
  bottom: 0;
}
.swiper-button-next, .swiper-rtl .swiper-button-prev {
  right: 0;
}
.swiper-button-prev, .swiper-rtl .swiper-button-next {
  left: 0;
}
</style>