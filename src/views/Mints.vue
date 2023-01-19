<template>
  <section class="relative z-20 min-h-screen bg-white text-black">
    <ul class="grid grid-cols-2 sm_grid-cols-3 lg_grid-cols-4 text-smm">
      <template v-for="id in mintIdsSorted" :key="id">
        <CableThumb :id="id"></CableThumb>
      </template>
    </ul>

    <router-link class="fixed top-0 right-0 p-8" to="/">
      <span class="sr-only">Close</span>
      <SVGX class="w-6 h-6" strokeWidth="1.15" />
    </router-link>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CableThumb from '../components/CableThumb.vue';
import SVGX from '../components/SVG-X.vue';
import store from '../store';

const mintCount = ref(0)
const mintIdsSorted = computed(() => {
  let mintIds = new Array(mintCount.value).fill(0).map((v, i) => i + 1)
  // if (this.sort === 'updated' && this.mintIdsUpdated?.length) {
  //   // add updated mints to beginning, then de-dupe
  //   mintIds = [...this.mintIdsUpdated, ...mintIds]
  //   mintIds = [...new Set(mintIds)]
  // } else if (this.sort === 'oldest') {
  //   mintIds.reverse()
  // }
  return mintIds
})

onMounted(async () => {
  mintCount.value = (await store.dispatch('getMintCount', {})).toNumber()
})
</script>