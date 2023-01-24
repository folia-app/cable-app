<template lang="pug">
.mint-panel.bg-accent4.rounded.p-2.leading-tighter
  .flex.justify-between
    div
      | minted
    div
      | #[template(v-if="$store.state.mintCount !== undefined") {{$store.state.mintCount}}]<span v-else class="animate-pulse">...</span>/545
  .flex.justify-between.text-smm
    div price
    div #[template(v-if="mintPriceETH !== undefined") {{ mintPriceETH.toString().substr(0, 10) }}&hellip;]#[span(v-else).animate-pulse ...] ETH
  
  //- mint btn
  .mt-1
    button.btn.btn-green.w-full.border(@click="$store.dispatch('mint', {})", :disabled="isConnectedToWrongNetwork") mint

  //- (switch network)
  .my-1.bg-black.px-2.pt-4.pb-2.rounded.text-accent4.text-xs(v-if="isConnectedToWrongNetwork || switchError")
    h6.font-bold.text-center.mt-2px WRONG NETWORK
    p.mt-3.text-2xs.px-1.text-center your connected wallet is not on <span class="uppercase font-bold">{{ appNetworkName }}</span> network
    //- .my-2.text-center &darr;
    button.mt-4.btn.w-full.border(@click="switchNetwork") switch network ꩜
    //- switch error
    p.mt-3.mb-1.text-2xs.px-1.text-center.text-legend-orange(v-if="switchError", v-html="switchError")
  
  
  //- preview img
  figure.relative.aspect-square.w-full.mt-2.rounded.bg-white
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
  import networks from '@/networks'

  const mintPriceETH = ref(undefined)
  
  store.dispatch('getMintPrice', {})
    .then(wei => { mintPriceETH.value = utils.formatEther(wei) })
  
  const previewImgSrc = ref()

  const isConnectedToWrongNetwork = computed(() => store.state.address && store.state.givenNetworkId !== store.state.appDefaultNetworkId)
  const appNetworkName = networks[store.state.appDefaultNetworkId].name

  // async function mint () {
  //   if (!store.state.address) {
  //     await store.dispatch('connect')
  //   }
  // }
  
  const status = ref()

  const switchError = ref(false)
  async function switchNetwork () {
    try {
      switchError.value = false

      // if (this.$route.query.network) {
      //   // if route loaded a network, update it so network-change refresh doesn't try to load previous network
      //   this.replaceRouteNetworkQuery()
      // }

      await store.dispatch('switchNetwork', { chainId: store.state.appDefaultNetworkId })

      status.value = undefined
    } catch (e) {
      console.error(e)
      if (e.message === 'No provider to change network') {
        await store.dispatch('disconnect')
        switchError.value = `oops! couldn't switch networks. try <b>RECONNECTING</b> your wallet with <b class="uppercase">${appNetworkName}</b> or <b>MAINNET</b> network selected`
        return
      }
      switchError.value = `oops! did you cancel switching?`
    }
  }

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