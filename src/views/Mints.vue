<template>
  <section class="relative min-h-screen text-black bg-paper">
    <header class="sticky h-20 mb-32 z-10 w-full top-0 left-0 flex justify-between items-center">
      <div class="pl-4 md_pl-10 flex items-center">
        <template v-if="mintCount === undefined">
          <div class="btn border pl-7 pr-6 animate-pulse">loading...</div>
        </template>
        <template v-else-if="mintCount > 1">
          <button class="btn rounded btn-paper text-smm border pl-7" @click.prevent="toggleSort" style="align-items:stretch">
            <div class=" whitespace-nowrap pointer-events-none" style="width: 3.8em">
              {{ isSortNewest ? 'newest' : 'oldest' }}
            </div> 
            <div class="flex items-center" :class="{'transform rotate-180 origin-center': !isSortNewest }">
              <svg-chevron-down class=" w-6 h-6 mx-3 pointer-events-none" strokeWidth="1.25" />
            </div>
          </button>

          <button v-if="newMintsCount" class="btn rounded btn-green text-smm border pl-3 pr-1 ml-3 flex items-center group" @click="getMintCount">
            {{ newMintsCount }}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 pb-2px w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
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
      <section v-if="mintCount !== undefined">
        <!-- grid -->
        <ul class="grid grid-cols-2 sm_grid-cols-3 lg_grid-cols-4 xl_grid-cols-5 text-smm">
          <template v-for="n in 1">
            <template v-for="id in mintIdsSorted.slice(0, Math.min(pageSize, mintCount))" :key="id">
              <!-- items... -->
              <CableThumb :id="id"></CableThumb>
            </template>
          </template>
        </ul>
        
        <!-- lazy page loader -->
        <Observer v-if="pageSize < mintCount" class="min-h-[90vh] flex items-center justify-center text-3xs animate-pulse" :threshold="0.01" @visible="pageSize = pageSize + pageSizeStep">
          <div class="sticky bottom-8 left-0 w-full text-center">loading...</div>
        </Observer>
      </section>
    </transition>

    <!-- dimmer -->
    <!-- <div class="absolute overlay z-20 pointer-events-none" style="background:rgb(244 244 244); mix-blend-mode: multiply;"></div> -->
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CableThumb from '../components/CableThumb.vue';
import SVGX from '../components/SVG-X.vue';
import store from '../store';
import { useRoute, useRouter } from 'vue-router'
import SvgChevronDown from '@/components/SvgChevronDown.vue'
import Observer from '../components/Observer.vue';

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['sortChange'])

// mint count
const mintCount = ref(store.state.mintCount)
const newMintsCount = computed(() => mintCount.value !== undefined ? store.state.mintCount - mintCount.value : 0)

async function getMintCount () {
  mintCount.value = await store.dispatch('getMintCount', {})
}

if (mintCount.value === undefined) getMintCount()

// mint ids
const mintIdsSorted = computed(() => {
  let mintIds = new Array(mintCount.value).fill(0).map((v, i) => i + 1)
  if (isSortNewest.value) {
    mintIds.reverse()
  }
  return mintIds
})

// page size
const pageSizeStep = ref(20)
const pageSize = ref(20)

// sort
const isSortNewest = ref(true)
function toggleSort () {
  isSortNewest.value = !isSortNewest.value
  emit('sortChange')
  // replace rt so CableImage refreshes observer
  router.replace(isSortNewest.value ? {} : { query: { sort: 'oldest' }})
  // reset page size
  pageSize.value = pageSizeStep.value
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