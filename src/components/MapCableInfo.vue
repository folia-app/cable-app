<template>
  <div v-if="cable" class="fixed z-10 bottom-0 left-0 flex items-end">
    <!-- (image) -->
    <figure v-if="owner" class="relative bg-white aspect-square" style="width:10em">
      <CableImage :id="props.id" :isUnknown="!owner" :key="props.id" />
    </figure>
    <!-- info -->
    <div class="p-8">
      <div style="vertical-align: baseline;">
        <h6 class="inline-block" style="margin-right:0.75em">{{ cable.name }}</h6>
        <div class="inline-block text-xs uppercase text-gray-400">{{ cable.length.split(' ')[0] }} <span style="font-size:0.75em">KM</span></div>
      </div>
      <div class="text-xs">
        <template v-if="owner">adopted by <span class="font-bold"><Addr :address="owner" :short="true" /></span></template>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '../../public/data/cable-geo.json'
import CableImage from './CableImage.vue';
import { computed } from 'vue'
import Addr from './Addr.vue';
import store from '../store';
const props = defineProps(['id'])

const owner = computed(() => store.state.owners[props.id])
const cable = computed(() => data.features[props.id]?.properties)
</script>