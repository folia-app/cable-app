<template>
<Map></Map>

<router-view v-slot="{ Component, route }">
  <transition name="slideupdown" @beforeEnter="isPageTransition = true" @afterEnter="isPageTransition = false" @beforeLeave="isPageTransition = true" @afterLeave="isPageTransition = false">
    <component :is="Component" :key="route.name" :isPageTransition="isPageTransition" />
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
const isPageTransition = ref(false)
</script>

<style>
.slideupdown-enter-active,
.slideupdown-leave-active{
  transition: all 800ms;
  height:100vh;
  overflow:hidden;
}
.slideupdown-leave-active > *{
  transition:opacity 150ms;
}
.slideupdown-enter-from,
.slideupdown-leave-to{
  transform: translateY(100%);
}
.slideupdown-leave-to > *{
  opacity:0
}
</style>