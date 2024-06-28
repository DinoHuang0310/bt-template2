<template>
  <div class="relative pb-[100%] sm:pb-[50%] overflow-hidden">
    <v-chart
      class="absolute w-full h-full top-0 left-0"
      :option="chartOption"
      autoresize
    />
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
// import { PieChart, BarChart } from "echarts/charts";
import "echarts";
// import {
//   TitleComponent,
//   TooltipComponent,
//   ToolboxComponent,
//   LegendComponent
// } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
// import { ref, provide } from "vue";

const props = defineProps({
  chartOption: {
    type: Object,
  }
})

// use([
//   CanvasRenderer,
//   PieChart,
//   BarChart,
//   TitleComponent,
//   TooltipComponent,
//   ToolboxComponent,
//   LegendComponent
// ]);

</script>
