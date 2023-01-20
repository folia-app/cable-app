<template>
  <div ref="overlayEl" v-if="$props.id" class="fixed overlay z-40 bg-white overflow-scroll scrollbars-hidden" tabindex="0">
    <!-- <CableImage :id="$props.id"></CableImage> -->
    <img :src="svg" class="absolute overlay object-contain object-center" />

    <button class="fixed top-0 right-0 p-8 mouse_hover_bg-yellow-500" to="/" @click="closeOverlay">
      <span class="sr-only">Close</span>
      <SVGX class="w-6 h-6 text-black" strokeWidth="1.15" />
    </button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import SVGX from '../components/SVG-X.vue';
  import CableImage from '../components/CableImage.vue';
  import store from '../store';
  
  const props = defineProps(['id'])
  const svg = ref()

  let lastActiveEl
  
  const overlayEl = ref()

  function closeOverlay () {
    lastActiveEl.focus()
    store.commit('CLOSE_FULLSCREEN')
  }

  onMounted(() => {
    lastActiveEl = document.activeElement
    overlayEl.value.focus()
    overlayEl.value.scrollTo(0, (overlayEl.value.scrollHeight - window.innerHeight)/2);

    // get svg
    store.dispatch('getCableImage', { id: props.id })
      .then(imgSrc => { svg.value = imgSrc })
  })
</script>