<template>
<Map></Map>

<!-- mints overlay via /cables route -->
<div ref="scrollbody" :class="['fixed z-20 overlay bg-white overflow-scroll transition-transform duration-800 flex', {'translate-y-full': !isMintsView}]">
  <div :class="['w-full transition duration-800', {'opacity-0': !isMintsView }]">
    <Mints v-if="renderMints" @sortChange="scrollbody.scrollTo(0,0)"></Mints>
  </div>
</div>

<!-- fullscreen overlay -->
<CableOverlay v-if="$store.state.fullscreenId" :id="$store.state.fullscreenId"></CableOverlay>

<!-- mint listener -->
<contract-listener v-if="$store.state.mintCount < 545" @update="$store.dispatch('getMintCount', {})" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router';
import CableOverlay from '../components/CableOverlay.vue';
import Map from '../components/Map.vue'
import Mints from './Mints.vue'
import ContractListener from '@/components/ContractListener.vue'

const route = useRoute()

const isMintsView = computed(() => route.name === 'mints')

const renderMints = ref(route.name === 'mints')

watch(() => route.name, name => {
  if (name === 'mints') {
    renderMints.value = true
  }
})

const scrollbody = ref()
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