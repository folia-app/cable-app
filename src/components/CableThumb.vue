<template>
  <li class="cable-thumb relative group mb-32">
    <router-link class="cable-thumb__imglink block" :to="{name: 'token', params: { tokenId: props.id }}">
      <figure class="relative aspect-square cursor-pointer pointer-events-none" @click="openFullscreen" aria-label="view fullscreen">
        <CableImage :id="props.id" :key="props.id"></CableImage>
      </figure>
    </router-link>
    
    <div class="border-t border-gray-200 pb-1" style="padding-left:5.9%; padding-top:6.1%;">
      <!-- buttons -->
      <div class="flex text-3xs pt-1 -ml-1">
          <!-- locate on map -->
          <router-link :to="{name: 'home', query: { id: props.id }}" class="block p-2 rounded btn-paper" title="highlight on the map">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
            </svg>

            <!-- <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 12C18 12.7879 17.8448 13.5681 17.5433 14.2961C17.2417 15.0241 16.7998 15.6855 16.2426 16.2426C15.6855 16.7998 15.0241 17.2417 14.2961 17.5433C13.5681 17.8448 12.7879 18 12 18C11.2121 18 10.4319 17.8448 9.7039 17.5433C8.97595 17.2417 8.31451 16.7998 7.75736 16.2426C7.20021 15.6855 6.75825 15.0241 6.45672 14.2961C6.15519 13.5681 6 12.7879 6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.5C12.4142 2.5 12.75 2.83579 12.75 3.25L12.75 8.75C12.75 9.16421 12.4142 9.5 12 9.5C11.5858 9.5 11.25 9.16421 11.25 8.75L11.25 3.25C11.25 2.83579 11.5858 2.5 12 2.5Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5 12C21.5 12.4142 21.1642 12.75 20.75 12.75L15.25 12.75C14.8358 12.75 14.5 12.4142 14.5 12C14.5 11.5858 14.8358 11.25 15.25 11.25L20.75 11.25C21.1642 11.25 21.5 11.5858 21.5 12Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 12C9.5 12.4142 9.16421 12.75 8.75 12.75L3.25 12.75C2.83579 12.75 2.5 12.4142 2.5 12C2.5 11.5858 2.83579 11.25 3.25 11.25L8.75 11.25C9.16421 11.25 9.5 11.5858 9.5 12Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 14.5C12.4142 14.5 12.75 14.8358 12.75 15.25L12.75 20.75C12.75 21.1642 12.4142 21.5 12 21.5C11.5858 21.5 11.25 21.1642 11.25 20.75L11.25 15.25C11.25 14.8358 11.5858 14.5 12 14.5Z" fill="currentColor"/>
            </svg> -->
          </router-link>
          <!-- expand fullscreen -->
          <router-link :to="{name: 'token', params: {tokenId: props.id}}" class="p-2 rounded btn-paper cable-thumb__fullscreen-btn" title="view fullscreen">
            <SvgExpand />
          </router-link>
          <!-- os link -->
          <a class="px-2 flex items-center rounded text-smaller group py-2 btn-paper leading-none" :href="$store.getters.marketplaceLink({ token: props.id })" target="_blank" rel="noopener noreferrer"><span class="">opensea</span></a>
        </div>
      
        <ul class="text-2xs pl-2 pr-12 leading-normal align-baseline" style="margin-top:5.9%">
        <!-- <div class="text-xs leading-snug">
          <a :href="$store.getters.marketplaceLink({ token: props.id })" target="_blank" rel="noopener noreferrer">{{ props.id }}</a>
        </div> -->
        <div style="vertical-align: baseline;">
          <h6 class="font-bold text-sm inline-block" style="margin-right:0.75em">{{ cableData.name }}</h6>
          <div class="inline-block uppercase">{{ cableData.length.split(' ')[0] }}&nbsp;<span class="text-smaller">KM</span></div>
        </div>
        <li>
          <div class="px-2 -ml-2 inline-block" :class="{'bg-yellow-500 rounded': owner && owner.toLowerCase() === $store.state.address}">
            <span class="text-smaller">owned by</span> <template v-if="owner"><a class="text-2xs leading-none underline font-bold" :href="$store.getters.marketplaceLink({ account: owner })" target="_blank" rel="noopener noreferrer"><Addr :address="owner" :youOn="true"></Addr></a></template><template v-else><Observer class="inline" @visible="getOwner"><span class="animate-pulse">...</span></Observer></template>
          </div>
        </li>
        <!-- <li class="align-baseline">
          {{ cableData.length.split(' ')[0] }} <span class="text-smaller">KM</span>
        </li> -->
      </ul>
    </div>
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
  .cable-thumb__imglink:hover + div .cable-thumb__fullscreen-btn{
    @apply bg-black text-white;
  }
}

.cable-thumb figure img{
  mix-blend-mode: multiply;
}
</style>