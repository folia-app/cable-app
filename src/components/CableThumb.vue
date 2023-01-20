<template>
  <li class="relative group my-12">
    <figure class="relative aspect-square cursor-pointer" @click="openFullscreen" aria-label="view fullscreen">
      <CableImage :id="props.id"></CableImage>
    </figure>
    <ul class="text-3xs px-2 leading-normal align-baseline">
      <!-- {{ props.id }} -->
      <div style="vertical-align: baseline;">
        <h6 class="font-bold text-xs inline-block" style="margin-right:0.75em">{{ cableData.name }}</h6>
        <div class="inline-block uppercase">{{ cableData.length.split(' ')[0] }} <span class="text-smaller">KM</span></div>
      </div>
      <li><span>adopted by</span> <template v-if="owner"><a class="text-2xs leading-none underline font-bold" :href="$store.getters.marketplaceLink({ account: owner })" target="_blank" rel="noopener noreferrer"><Addr :address="owner"></Addr></a></template><template v-else><Observer class="inline" @visible="getOwner"><span class="animate-pulse">...</span></Observer></template></li>
      <!-- <li class="align-baseline">
        {{ cableData.length.split(' ')[0] }} <span class="text-smaller">KM</span>
      </li> -->
      <!-- <li>
        <a class="text-smaller group opacity-25 mouse_hover_opacity-100 leading-none" :href="$store.getters.marketplaceLink({ token: props.id })" target="_blank" rel="noopener noreferrer"><span class="border-b border-dashedff border-gray-600 mouse_group-hover_border-solid">opensea</span> &nearr;</a>
      </li> -->
      <!-- buttons -->
      <div class="flex mt-3px -ml-1">
          <!-- locate on map -->
          <router-link :to="{name: 'home', query: { id: props.id }}" class="block p-1 mouse_hover_bg-yellow-500" title="highlight on the map">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 12C18 12.7879 17.8448 13.5681 17.5433 14.2961C17.2417 15.0241 16.7998 15.6855 16.2426 16.2426C15.6855 16.7998 15.0241 17.2417 14.2961 17.5433C13.5681 17.8448 12.7879 18 12 18C11.2121 18 10.4319 17.8448 9.7039 17.5433C8.97595 17.2417 8.31451 16.7998 7.75736 16.2426C7.20021 15.6855 6.75825 15.0241 6.45672 14.2961C6.15519 13.5681 6 12.7879 6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.5C12.4142 2.5 12.75 2.83579 12.75 3.25L12.75 8.75C12.75 9.16421 12.4142 9.5 12 9.5C11.5858 9.5 11.25 9.16421 11.25 8.75L11.25 3.25C11.25 2.83579 11.5858 2.5 12 2.5Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5 12C21.5 12.4142 21.1642 12.75 20.75 12.75L15.25 12.75C14.8358 12.75 14.5 12.4142 14.5 12C14.5 11.5858 14.8358 11.25 15.25 11.25L20.75 11.25C21.1642 11.25 21.5 11.5858 21.5 12Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 12C9.5 12.4142 9.16421 12.75 8.75 12.75L3.25 12.75C2.83579 12.75 2.5 12.4142 2.5 12C2.5 11.5858 2.83579 11.25 3.25 11.25L8.75 11.25C9.16421 11.25 9.5 11.5858 9.5 12Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 14.5C12.4142 14.5 12.75 14.8358 12.75 15.25L12.75 20.75C12.75 21.1642 12.4142 21.5 12 21.5C11.5858 21.5 11.25 21.1642 11.25 20.75L11.25 15.25C11.25 14.8358 11.5858 14.5 12 14.5Z" fill="black"/>
            </svg>
          </router-link>
          <!-- expand fullscreen -->
          <button class="p-1 mouse_hover_bg-yellow-500" @click="openFullscreen" title="view fullscreen">
            <SvgExpand />
          </button>
        </div>
    </ul>

  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import store from '../store';
import CableImage from './CableImage.vue'
import Observer from './Observer.vue';
import Addr from './Addr.vue';
import data from '@/assets/cable-geo.json'
import SvgExpand from './SvgExpand.vue';

const props = defineProps(['id'])

const cableData = computed(() => data.features[props.id - 1]?.properties)

const owner = ref()
const getOwner = async () => {
  owner.value = await store.dispatch('getNFTOwnerByTokenId', { tokenId: props.id })
}

const openFullscreen = () => store.commit('OPEN_FULLSCREEN', props.id)
</script>

<style>
@media(hover:hover) {
  figure:hover + ul > div > button{
    @apply bg-yellow-500;
  }
}
</style>