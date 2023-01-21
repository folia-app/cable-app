<template>
<Map></Map>

<router-view v-slot="{ Component, route }">
  <transition name="slideupdown">
    <component :is="Component" :key="route.name"/>
  </transition>
</router-view>

<!-- fullscreen overlay -->
<CableOverlay v-if="$store.state.fullscreenId" :id="$store.state.fullscreenId"></CableOverlay>
</template>

<script setup>
import { ref } from 'vue'
import CableOverlay from '../components/CableOverlay.vue';
import Map from '../components/Map.vue'

const mintsVisible = ref(false)
</script>

<style>
.slideupdown-enter-active,
.slideupdown-leave-active{
  transition: all 800ms;
  height:100vh;
  /* overflow:hidden; */
}
.slideupdown-enter-from,
.slideupdown-leave-to{
  transform: translateY(100%);
}
</style>