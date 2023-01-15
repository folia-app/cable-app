<template>
<Map></Map>

<transition name="slideupdown">
  <template v-if="mintsVisible">
    <div class="relative z-40">
      <Mints></Mints>
    </div>
  </template>
</transition>

<div class="fixed z-40 bottom-0 left-0 w-full flex justify-center pointer-events-none">
  <button class="p-8 pointer-events-auto transition duration-150" :class="{'transform rotate-180 text-black': mintsVisible}" @click="mintsVisible=!mintsVisible">
    <template v-if="mintsVisible">
      <SvgX class="w-5 h-5" strokeWidth="1.15"></SvgX>
    </template>
    <template v-else>
      &darr;
    </template>
  </button>
</div>
</template>

<script setup>
import { ref } from 'vue'
import Map from '../components/Map.vue'
import Mints from './Mints.vue';
import SvgX from '../components/SVG-X.vue';

const mintsVisible = ref(false)
</script>

<style>
.slideupdown-enter-active,
.slideupdown-leave-active{
  transition: all 800ms;
  height:100vh;
  overflow:hidden;
}
.slideupdown-enter-from,
.slideupdown-leave-to{
  transform: translateY(100%);
}
</style>