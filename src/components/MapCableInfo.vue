<template>
  <div v-if="cable" class="fixed z-10 bottom-0 left-0 p-4 lg_p-8 flex items-end">
    <!-- (image) -->
    <figure v-if="owner" class="relative bg-white aspect-square cursor-pointer group mr-6 lg_mr-8" style="width:10em" @click="$store.commit('OPEN_FULLSCREEN', props.id)" aria-label="view fullscreen">
      <CableImage :id="props.id" :isUnknown="!owner" :key="props.id" />
      <div class="absolute bottom-0 right-0 p-2 mouse_hidden mouse_group-hover_block text-black">
        <SvgExpand />
      </div>
    </figure>
    <!-- info -->
    <div>
      <div class="align-baseline leading-tight">
        <h6 class="inline-block" style="margin-right:0.75em">{{ cable.name }}</h6>
        <div class="inline-block text-xs uppercase text-gray-400ff">{{ cable.length.split(' ')[0] }} <span class="text-smaller">KM</span></div>
      </div>
      <div class="text-xs">
        <template v-if="owner"><span class="text-3xs">minted by</span> <a :href="$store.getters.marketplaceLink({ account: owner })" class="ml-1 underline font-bold" target="_blank" rel="noopener noreferrer"><Addr :address="owner" :short="true" /></a></template>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '@/assets/cable-geo.json'
import CableImage from './CableImage.vue';
import { computed } from 'vue'
import Addr from './Addr.vue';
import store from '../store';
import SvgExpand from './SvgExpand.vue';
const props = defineProps(['id'])

const owner = computed(() => store.state.owners[props.id])
const cable = computed(() => data.features[props.id - 1]?.properties)
</script>