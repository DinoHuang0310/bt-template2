<template>
  <canvas ref="starRef" />
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  starCount: {
    type: Number,
    default: 400
  },
  starSpeed: {
    type: Number,
    default: -1
  },
  starColor: {
    type: String,
    required: false,
  },
  rotate: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: window.innerWidth
  },
  height: {
    type: Number,
    default: window.innerHeight
  },
})

// const colorPool = [
//   '#041b70',
//   '#033d88',
//   '#034e97',
//   '#00b0ef',
//   '#0affff',
// ]
const colorPool = [
  '#00ffff',
  '#00ffff',
  '#00caff',
  '#0090ff',
  '#007dc7',
  '#0052b1',
]

const starRef = ref(null)

function xor128(x, y, z, w) {
  x = x || 123456789;
  y = y || 362436069;
  z = z || 521288629;
  w = w || 88675123;

  return () => {
    let t = x ^ (x << 11);
    x = y;
    y = z;
    z = w;
    w = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8));
    return w;
  };
}

onMounted(() => {
  const canvas = starRef.value;
  const ctx = canvas.getContext('2d');

  canvas.width = props.width;
  canvas.height = props.height;

  const scale = Math.max(canvas.width, canvas.height);
  ctx.translate(canvas.width * 0.5, canvas.height * 0.5);

  ctx.rotate(-30 / 180 * Math.PI);
  ctx.scale(0.9 * scale, 0.85 * scale);
  ctx.translate(-0.5, -0.5);
  ctx.translate(0.4, 0.05);

  const t = Math.floor(Math.random() * 255) + 1

  const animation = () => {
    let i, p, x, y, z, w;
    let random = xor128(t)

    // 轉速
    let r3 = props.starSpeed / 1000;

    ctx.clearRect(-2, -2, 4, 4);

    ctx.rotate(r3 % (2 * Math.PI));

    for (i = 0; i < props.starCount; i += 1) {
      // 座標
      p = random();
      x = (p & 0xff) / 128 - 1; // (-1, 1)
      y = (p >>> 8 & 0xff) / 128 - 1;
      z = (p >>> 16 & 0xff) / 128 - 1;
      w = (p >>> 24 & 0xff) / 256;

      // 透明度
      ctx.globalAlpha = 0.9 / (x * x + y * y);

      // draw star
      ctx.save();
      ctx.fillStyle = props.starColor || colorPool[(i + colorPool.length) % colorPool.length];
      ctx.translate(0.6 * x, y);
      ctx.scale(0.0005 * w, 0.0005 * w);
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.restore();
    }
    
    if (props.rotate) {
      window.requestAnimationFrame(animation);
    }
    
  }

  window.requestAnimationFrame(animation);

})
</script>
