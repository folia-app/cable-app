<template lang="pug">
.mint-panel.bg-accent4.rounded.p-2.leading-tighter.overflow-scroll(style="max-height:calc(100vh - 64px)")
  .flex.justify-between
    div
      | minted
    div
      | #[template(v-if="$store.state.mintCount !== undefined") {{$store.state.mintCount}}]<span v-else class="animate-pulse">...</span>/545
  .flex.justify-between.text-smm
    div price
    div #[template(v-if="mintPriceETH !== undefined") {{ mintPriceETH.toString().substr(0, 10) }}&hellip;]#[span(v-else).animate-pulse ...] ETH
  
  //- mint btn
  .mt-1.mb-2
    button.btn.btn-green.w-full.border(@click="mint", :disabled="isSoldOut || isConnectedToWrongNetwork") {{ isSoldOut ? 'SOLD OUT' : 'mint' }}
  
  //- (status)
  .p-2.pb-2.text-center.rounded.relative(v-if="status", :class="{'bg-black text-legend-orange pb-4': status.type === 'error'}")
    h6.mt-2.mb-2.text-xs.font-bold.uppercase(v-if="status.type")
      | {{ status.type === 'error' ? 'MINT ERROR' : 'OOPS' }}
    p.text-2xs(:class="{'animate-pulse': status.msg.includes('...')}") {{ status.msg }}
    //- (kill item)
    button.absolute.top-0.right-0.h-full.p-1.flex.items-start(v-if="status.type === 'error'", @click="status = undefined")
      svg-x.text-current(style="width:13px;height:13px")
  
  //- (tx's list)
  ul.mt-2
    li.p-2.pb-2.text-center.rounded.border.-mt-px.relative(v-for="tx in txs", :class="{'bg-black text-legend-orange pb-4': tx.status === 'error'}")
      h6.mt-2.mb-2.text-xs.font-bold.uppercase(v-if="tx.status === 'error'")
        | MINT ERROR
      p.text-2xs
        //- (success link)
        template(v-if="tx.status === 'success'")
          router-link.underline(:to="{name: 'mints'}") MINTED 1 CABLE!
        //- (msg)
        span(v-else, :class="{'animate-pulse': tx.msg.includes('...') }") {{tx.msg}}
      //- kill item btn
      button.absolute.top-0.right-0.h-full.p-px.flex.items-start(v-if="tx.status !== 'pending'", @click="removeTxItem(tx)")
        svg-x.text-current(style="width:13px;height:13px")

  //- (switch network)
  .my-1.bg-black.p-2.rounded.text-accent4.text-xs(v-if="isConnectedToWrongNetwork || switchError")
    h6.mt-3.font-bold.text-center WRONG NETWORK
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
  import SvgX from './SVG-X.vue'

  const mintPriceETH = ref(undefined)
  
  store.dispatch('getMintPrice', {})
    .then(wei => { mintPriceETH.value = utils.formatEther(wei) })
  
  const previewImgSrc = ref()

  const isConnectedToWrongNetwork = computed(() => store.state.address && store.state.givenNetworkId !== store.state.appDefaultNetworkId)
  const appNetworkName = networks[store.state.appDefaultNetworkId].name

  const isSoldOut = computed(() => store.state.mintCount >= 545)
  
  const status = ref()
  const txs = ref([])

  async function mint () {
    if (!store.state.address) {
      await store.dispatch('connect')
      if (isConnectedToWrongNetwork.value) {
        // user will see switch network prompt
        return
      }
    }

    let id = new Date().getTime()
    try {
      status.value = { msg: 'confirm transaction in your wallet...' }

      // confirm -> create tx...
      const tx = await store.dispatch('mint', {})
      
      // store tx
      txs.value.push({ id, tx, status: 'pending', msg: 'waiting for tx confirmation...' })
      // clear status for new tx
      status.value = undefined

      // wait for confirmation...
      const receipt = await tx.wait()

      console.log('minted!', receipt)

      // success
      const theTx = txs.value.find(tx => tx.id === id)
      theTx.status = 'success'

      // update count
      store.dispatch('getMintCount', {})
    } catch (e) {
      console.error(e)

      // error msg
      let msg = (e.reason || e.message || e)
      msg = msg === 'execution reverted: PAUSED' ? 'MINTING NOT OPEN YET' : msg
      msg = msg.toLowerCase().includes('insufficient funds') ? 'Insufficient ETH in your wallet :(' : msg
      // detail?
      msg += e.data?.message ? '<br>' + e.data.message : ''
      
      // show error to user
      const theTx = txs.value.find(tx => tx.id === id)
      if (theTx) {
        theTx.status = 'error'
        theTx.msg = msg
      } else {
        status.value = { type: 'error', msg }
      }
    }
  }

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

  function removeTxItem ({ id }) {
    const index = txs.value.findIndex(tx => tx.id === id)
    txs.value.splice(index, 1)
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