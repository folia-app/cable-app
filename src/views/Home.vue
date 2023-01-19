<template>
<Map></Map>

<router-view v-slot="{ Component, route }">
  <transition name="slideupdown">
    <component :is="Component" :key="route.name"/>
  </transition>
</router-view>

<!-- fullscreen overlay -->
<div ref="overlayEl" v-if="store.state.fullscreenId" class="fixed overlay z-40 bg-white overflow-scroll scrollbars-hidden" tabindex="0">
  <CableImage :id="store.state.fullscreenId"></CableImage>

  <button class="fixed top-0 right-0 p-8 mouse_hover_bg-yellow-500" to="/" @click="closeOverlay">
    <span class="sr-only">Close</span>
    <SVGX class="w-6 h-6 text-black" strokeWidth="1.15" />
    <img class="hidden" src="nope" @error="onOverlayEnter" />
  </button>
</div>
</template>

<script setup>
import { ref } from 'vue'
import Map from '../components/Map.vue'
import SVGX from '../components/SVG-X.vue';
import CableImage from '../components/CableImage.vue';
import store from '../store';

const mintsVisible = ref(false)

let lastActiveEl
const overlayEl = ref()
function onOverlayEnter () {
  lastActiveEl = document.activeElement
  overlayEl.value.focus()
  overlayEl.value.scrollTo(0, (overlayEl.value.scrollHeight - window.innerHeight)/2);
} 
function closeOverlay () {
  lastActiveEl.focus()
  store.commit('CLOSE_FULLSCREEN')
}
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