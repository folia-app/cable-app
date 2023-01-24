<template>
  <section class="relative min-h-screen bg-white text-black">
    <header class="sticky h-20 mb-32 z-10 w-full top-0 left-0 flex justify-between items-center">
      <div class="pl-10">
        <template v-if="mintCount === undefined">
          <div class="btn border pl-7 pr-6 animate-pulse">loading...</div>
        </template>
        <template v-else-if="mintCount > 1">
          <button class="btn rounded btn-white text-smm border pl-7" @click.prevent="toggleSort" style="align-items:stretch">
            <div class=" whitespace-nowrap pointer-events-none" style="width: 3.8em">
              {{ isSortNewest ? 'newest' : 'oldest' }}
            </div> 
            <div class="flex items-center" :class="{'transform rotate-180 origin-center': !isSortNewest }">
              <svg-chevron-down class=" w-6 h-6 mx-3 pointer-events-none" strokeWidth="1.25" />
            </div>
          </button>
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
    
    
    <!-- list -->
    <transition name="fade">
      <ul v-if="mintCount !== undefined" class="grid grid-cols-2 sm_grid-cols-3 lg_grid-cols-4 xl_grid-cols-5 text-smm">
        <template v-for="n in 1">
          <template v-for="id in mintIdsSorted" :key="id">
            <!-- items... -->
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
import { useRoute, useRouter } from 'vue-router'
import SvgChevronDown from '@/components/SvgChevronDown.vue'

const route = useRoute()
const router = useRouter()

const emit = defineEmits(['sortChange'])

const mintCount = computed(() => store.state.mintCount)

const isSortNewest = ref(true)
function toggleSort () {
  isSortNewest.value = !isSortNewest.value
  emit('sortChange')
  // replace rt so CableImage refreshes observer
  router.replace(isSortNewest.value ? {} : { query: { sort: 'oldest' }})
}

const mintIdsSorted = computed(() => {
  let mintIds = new Array(mintCount.value).fill(0).map((v, i) => i + 1)
  if (isSortNewest.value) {
    mintIds.reverse()
  }
  return mintIds
})
</script>

<style>
.fade-enter-active{
  transition: opacity 500ms
}
.fade-enter-from{
  opacity:0;
}
</style>