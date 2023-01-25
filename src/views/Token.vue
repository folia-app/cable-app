<template>
<div class="fixed z-40 overlay bg-white flex">
  <CableOverlay :id="$route.params.tokenId" @close="goBack"/>
</div>
</template>

<script>
import CableOverlay from '@/components/CableOverlay.vue'
import geoJSON from '@/assets/cable-geo.json'
let lastRt
export default {
  components: { CableOverlay },
  metaInfo () {
    const title = geoJSON.features.find(f => f.id === this.$route.params?.tokenId?.toString())?.properties.name
    const img = `https://res.cloudinary.com/folia/image/fetch/w_1200/f_gif/${window.location.origin}/.netlify/functions/tokenimg/${this.$route.params.tokenId}`
    
    setTimeout(() => { window.prerenderReady = true }, 200)

    return this.$store.getters.meta({ title, img })
  },
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