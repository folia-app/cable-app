<template>
  <div v-if="cable" class="fixed z-10 bottom-0 left-0 p-4 md_p-8 flex items-end" style="max-width:calc(100% - 40px)">
    <!-- (image) -->
    <router-link v-if="owner" :to="{name: 'token', params:{ tokenId: props.id}}" class="relative bg-white aspect-square cursor-pointer group mr-4 lg_mr-8 w-44 md_w-10em flex-shrink-0" @click="$store.commit('OPEN_FULLSCREEN', props.id)" aria-label="view fullscreen">
      <CableImage :id="props.id" :key="props.id" />
      <div class="absolute bottom-0 right-0 p-2 mouse_hidden mouse_group-hover_block text-black">
        <SvgExpand />
      </div>
    </router-link>
    
    <!-- info -->
    <div class="text-sm md_text-lg xl_text-xl">
      <div class=" align-baseline leading-tight">
        <h6 class="inline-block" style="margin-right:0.75em">{{ cable.name }}</h6>
        <div class="inline-block text-smaller uppercase text-gray-400ff">{{ cable.length.split(' ')[0] }} <span class="text-smaller">KM</span></div>
      </div>
      <div class="text-smaller">
        <template v-if="owner"><span class="text-smaller">owned by</span> <a :href="$store.getters.marketplaceLink({ account: owner })" class="ml-1 underline font-bold" target="_blank" rel="noopener noreferrer"><Addr :address="owner" :short="true" /></a></template>
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