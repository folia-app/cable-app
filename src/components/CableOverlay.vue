<template>
  <div ref="overlayEl" v-if="$props.id" class="fixed overlay z-40 bg-white overflow-scroll scrollbars-hidden" tabindex="0">
    <CableImage :id="$props.id"></CableImage>

    <div class="fixed h-24 z-10 w-full top-0 left-0 flex justify-end items-center text-black">
      <div class="flex items-center">
        <button class="ml-3 p-1 rounded mr-4 mouse_hover_bg-black mouse_hover_text-white" @click="closeOverlay">
          <span class="sr-only">Close</span>
          <SVGX class="w-6 h-6" strokeWidth="1.15" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import SVGX from '../components/SVG-X.vue';
  import CableImage from '../components/CableImage.vue';
  import store from '../store';
  
  const props = defineProps(['id'])

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
  })
</script>