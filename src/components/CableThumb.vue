<template>
  <li class="relative">
    <figure class="aspect-square">
      <router-link :to="{name: 'home', query: { id: props.id }}">
        <CableImage :id="props.id"></CableImage>
      </router-link>
    </figure>
    <ul class="text-xs px-2">
      <li>adopted by <template v-if="owner"><a class="border-b border-dashed mouse_hover_border-solid font-bold" :href="$store.getters.marketplaceLink({ account: owner })" target="_blank" rel="noopener noreferrer"><Addr :address="owner"></Addr></a></template><template v-else><Observer class="inline" @visible="getOwner"><span class="animate-pulse">...</span></Observer></template></li>
      <li>
        <a class="group" :href="$store.getters.marketplaceLink({ token: props.id })" target="_blank" rel="noopener noreferrer"><span class="border-b border-dashed mouse_group-hover_border-solid">opensea</span> &nearr;</a>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import store from '../store';
import CableImage from './CableImage.vue'
import Observer from './Observer.vue';
import Addr from './Addr.vue';
const props = defineProps(['id'])
const owner = ref()
const getOwner = async () => {
  owner.value = await store.dispatch('getNFTOwnerByTokenId', { tokenId: props.id })
}
</script>