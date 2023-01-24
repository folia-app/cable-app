<template>
  <section class="relative z-20 min-h-screen bg-white text-black">
    <header class="sticky h-20 mb-32 z-10 w-full top-0 left-0 flex justify-between items-center">
      <div class="pl-10">
        <template v-if="mintCount === undefined">
          <div class="btn border pl-7 pr-6 animate-pulse">loading...</div>
        </template>
        <template v-else-if="mintCount > 1">
          <SortDropdown></SortDropdown>
        </template>
      </div>

      <div class="flex items-center">
        <!-- close link -->
        <router-link class="ml-3 p-1 rounded mr-4 mouse_hover_bg-black mouse_hover_text-white" to="/">
          <span class="sr-only">Close</span>
          <SVGX class="w-6 h-6" strokeWidth="1.15" />
        </router-link>
      </div>
    </header>
    
    
    <transition name="fade">
      <ul v-if="mintCount !== undefined" class="grid grid-cols-2 sm_grid-cols-3 lg_grid-cols-4 xl_grid-cols-5 text-smm">
        <template v-for="n in 1">
          <template v-for="id in mintIdsSorted" :key="id">
            <CableThumb :id="id"></CableThumb>
          </template>
        </template>
      </ul>  
    </transition>

    

    <!-- dimmer -->
    <div class="absolute overlay z-20 pointer-events-none" style="background:rgb(244 244 244); mix-blend-mode: multiply;"></div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CableThumb from '../components/CableThumb.vue';
import SVGX from '../components/SVG-X.vue';
import store from '../store';
import SortDropdown from '@/components/SortDropdown.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mintCount = ref()

const mintIdsSorted = computed(() => {
  let mintIds = new Array(mintCount.value).fill(0).map((v, i) => i + 1)
  if (route.query.sort === 'newest') {
    mintIds.reverse()
  }
  return mintIds
})

onMounted(async () => {
  mintCount.value = await store.dispatch('getMintCount', {})
})
</script>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    if (!to.query.sort) {
      to.query.sort = 'newest'
      next(to)
    }
    next()
  }
}
</script>

<style>
.fade-enter-active{
  transition: opacity 500ms
}
.fade-enter-from{
  opacity:0;
}
</style>