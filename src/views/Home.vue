<template>
<Map></Map>

<div class="fixed z-10 bottom-0 left-0 w-full flex justify-center pointer-events-none">
  <router-link :to="{name: 'mints'}" class="p-8 pointer-events-auto text-white" @click="mintsVisible=!mintsVisible">
    ADOPTIONS
    <!-- <template v-if="mintsVisible">
      <SvgX class="w-5 h-5" strokeWidth="1.15"></SvgX>
    </template>
    <template v-else>
      
    </template> -->
  </router-link>
</div>

<router-view v-slot="{ Component, route }">
  <transition name="slideupdown">
    <component :is="Component" :key="route.name"/>
  </transition>
</router-view>
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