<template>
  <div ref="overlayEl" class="w-full overflow-y-scroll text-black" tabindex="0">
    <CableImage :id="$props.id"></CableImage>
    <!-- <img :src="svg" :class="{'absolute overlay object-contain object-center': isFit, 'w-full block': !isFit}" /> -->

    <div class="fixed h-24 z-10 w-full top-0 left-0 flex justify-end items-center text-black">
      <div class="flex items-center">
        <button class="p-1 rounded mr-4 btn-white" @click="$emit('close')">
          <span class="sr-only">Close</span>
          <SVGX class="w-6 h-6" strokeWidth="1.15" />
        </button>
      </div>
    </div>

    <!-- share btn -->
    <div class="fixed z-10 bottom-0 right-0 h-24 flex items-center pr-4 text-black">
      <CopyUrlButton classes="p-2 rounded btn-white" iconClasses="w-8 h-8" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import SVGX from '../components/SVG-X.vue';
  import CableImage from '../components/CableImage.vue';
  import store from '../store';
  import CopyUrlButton from './CopyUrlButton.vue';
  
  const props = defineProps(['id'])
  const emit = defineEmits(['close'])

  let lastActiveEl
  
  const overlayEl = ref()
  const svg = ref()
  const isFit = ref(true)

  // async function toggleIsFit () {
  //   isFit.value = !isFit.value
  //   if (!isFit.value) {
  //     nextTick(() => {
  //       overlayEl.value.scrollTo(0, (overlayEl.value.scrollHeight - window.innerHeight)/2);
  //     })
  //   }
  // }

  // store.dispatch('getCableImage', { id: props.id })
  //   .then(code => { svg.value = code })

  onMounted(() => {
    lastActiveEl = document.activeElement
    overlayEl.value.focus()
  })

  onUnmounted(() => {
    lastActiveEl.focus()
  })
</script>