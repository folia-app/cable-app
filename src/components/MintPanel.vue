<template lang="pug">
.mint-panel.bg-accent4.rounded.p-2.leading-tighter
  .flex.justify-between
    div
      | minted
    div
      | #[template(v-if="$store.state.mintCount !== undefined") {{$store.state.mintCount}}]<span v-else class="animate-pulse">...</span>/545
  .flex.justify-between.text-smm
    div price
    div #[template(v-if="mintPriceETH !== undefined") {{ mintPriceETH }}]#[span(v-else).animate-pulse ...] ETH
  .mt-1
    button.btn.btn-green.w-full.border(@click="$store.dispatch('mint', {})") mint
  figure.relative.aspect-square.w-full.mt-2.rounded.border
    transition(name="quickfade")
      div(v-if="previewImgSrc")
        <img class="absolute overlay object-fit object-center opacity-30 animate-pulse" :src="previewImgSrc">
    div.absolute.overlay.flex.items-center.justify-center.text-3xl.font-bold(:class="{'animate-pulse': !previewImgSrc}") ???
  //- (view mints link)
  .mt-2.text-3xs.text-center(v-if="$store.state.mintCount > 0")
    router-link.underline(:to="{name: 'mints'}") view mints
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import store from '@/store'
  import { utils } from 'ethers'

  const mintPriceETH = ref(undefined)
  
  store.dispatch('getMintPrice', {})
    .then(wei => { mintPriceETH.value = utils.formatEther(wei) })
  
  const previewImgSrc = ref()

  onMounted(async () => {
    const mintCount = store.state.mintCount
    if (mintCount > 0) {
      previewImgSrc.value = await store.dispatch('getCableImage', { id: store.state.mintCount })
    } else {
      previewImgSrc.value = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiIHZpZXdCb3g9IjAgMCA2MDAgNjAwIiAgcHJlc2VydmVBc3BlY3RSYXRpbz0ibWVldCI+PHN0eWxlPi5uYW1lIHtmaWxsOiAjMDAwMDAwO2ZvbnQtc2l6ZTogMTRweDtmb250LWZhbWlseTogIlZlcmRhbmEiLHNhbnMtc2VyaWY7fXBhdGh7ZmlsbDogbm9uZTtzdHJva2U6ICMwMDAwMDA7c3Ryb2tlLXdpZHRoOiAxMDA7c3Ryb2tlLWRhc2hhcnJheTogMTthbmltYXRpb246IGRhc2ggMXMgbGluZWFyIGluZmluaXRlO31Aa2V5ZnJhbWVzIGRhc2ggeyB0byB7c3Ryb2tlLWRhc2hvZmZzZXQ6IDEwMDt9fTwvc3R5bGU+PHBhdGggZD0ibTU1MCAzMjMuMzFsLTUyLjk4LTE2LjA0LTY0LjcyLTMwLjc4LTExLjcxLTExLjQ3LTQuNDcgMjYuODYtNDguNTQgMTUuMzktMzIuMzYgMC0xNi4xOC03LjctMjAuMDMtMTUuMTItMjguNTEgMjIuODItMzIuMzYgMC0zMi4zNi0xNS4zOS04LjA5LTMwLjc3IDAtMzAuNzMgMjUuMzYtOS45MS00MS45Ni0zMy4yMy04OC41Ni0xMC41NS00Mi41MyAxMS45MSIgLz48dGV4dCB4PSI1MCIgeT0iNTUwIiBjbGFzcz0ibmFtZSI+Qm9yaWtlbiBTdWJtYXJpbmUgQ2FibGUgU3lzdGVtIChCU0NTKTwvdGV4dD48L3N2Zz4='
    }
  })
</script>

<style>
.quickfade-enter-active{
  transition: opacity 150ms;
}
.quickfade-enter-from{
  opacity:0
}
</style>