<template>
  <footer class="bg-btnetgray text-center px-4 py-12">
    <div class="space-y-1 text-xs text-white">
      <div v-for="list in copyright" :key="list.index">
        <img
          v-if="list.type === 'img'"
          :src="list.content"
          :class="list.className"
          alt=""
        >

        <component v-else :is="list.type" :class="list.className">
          {{ list.content }}
        </component>
      </div>
    </div>
    
    <div v-if="showFloatButton" class="fixed right-0 bottom-0 z-10">
      <button class="flex items-center justify-center border border-gray-100" @click="useScrollTo(0)">
        <span class="relative bg-primary w-9 h-9">
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 rotate-45 w-4 h-4 border-t-2 border-l-2 border-white" />
        </span>
      </button>
      
    </div>
    
  </footer>
</template>

<script>
import { computed } from 'vue';
import useClientSize from '../composables/useClientSize';
import useWindowScroll from '../composables/useWindowScroll';
import useScrollTo from '../composables/useScrollTo';

export default {
  props: {
    showFloat: {
      type: Boolean,
      default: true
    },
    copyright: {
      type: Array,
      default: [
        { type: "p", content: "內容監製: 今周刊" },
        { type: "p", content: "專題製作: 今周刊 數位內容部" },
        { type: "p", content: `Copyright © ${new Date().getFullYear()} 今周刊.All rights reserved. 版權所有，禁止擅自轉貼節錄` },
      ]
    },
  },

  setup(props) {
    const { height } = useClientSize();
    const { scrollTop } = useWindowScroll();

    const showFloatButton = computed(() => {
      return props.showFloat && scrollTop.value > height.value / 2;
    })
    
    return {
      showFloatButton,
      useScrollTo,
    }
  }
  
}
</script>
