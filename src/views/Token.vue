<template>
<div class="fixed z-40 overlay bg-white flex">
  <CableOverlay :id="$route.params.tokenId" @close="goBack"/>
</div>
</template>

<script>
import CableOverlay from '@/components/CableOverlay.vue'
let lastRt
export default {
  components: { CableOverlay },
  // metaInfo () {
  //   // const title = `${this.$route.params.networkName?.toUpperCase()}_world_${this.boardId}`
  //   // const descrip = null
  //   // const img = `https://straylight.folia.app/.netlify/functions/boardimg/${this.$store.getters.chainId(this.$route.params)}/${this.boardId}.png`
    
  //   // setTimeout(() => { window.prerenderReady = true }, 200)

  //   // return this.$store.getters.meta({ title, descrip, img })
  // },
  methods: {
    goBack () {
      if (lastRt?.name) {
        return this.$router.go(-1)
      }
      this.$router.push('/')
    }
  },
  beforeRouteEnter (to, from, next) {
    lastRt = from
    next()
  }
}
</script>