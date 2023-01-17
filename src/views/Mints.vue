<template>
  <div class="min-h-screen bg-white text-black">
    <ul class="grid grid-cols-2 sm_grid-cols-3 lg_grid-cols-4">
      <template v-for="id in boardIdsSorted" :key="id">
        <CableThumb :id="id"></CableThumb>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CableThumb from '../components/CableThumb.vue';
import store from '../store';

const boardCount = ref(0)
const boardIdsSorted = computed(() => {
  let boardIds = new Array(boardCount.value).fill(0).map((v, i) => (boardCount.value - i).toString())
  // if (this.sort === 'updated' && this.boardIdsUpdated?.length) {
  //   // add updated boards to beginning, then de-dupe
  //   boardIds = [...this.boardIdsUpdated, ...boardIds]
  //   boardIds = [...new Set(boardIds)]
  // } else if (this.sort === 'oldest') {
  //   boardIds.reverse()
  // }
  return boardIds
})

onMounted(async () => {
  boardCount.value = await store.dispatch('getMintCount', {})
})
</script>