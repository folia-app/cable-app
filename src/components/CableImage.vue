<template lang="pug">
//- (placeholder)
template(v-if="!imgLoaded")
  .absolute.overlay.flex.items-center.justify-center.animate-pulse.text-3xs.animate-pulse loading...

transition(name="quickfade")
  template(v-if="imgSrc && visible")
    img.absolute.overlay.object-contain.object-center(:src="imgSrc", @load="imgLoaded = true")
  
observer.block.absolute.overlay.pointer-events-none(v-if="isObserving", :threshold="0.01", @visible="onVisible", @hidden="visible = false", style="height:50%")
</template>

<script>
import Observer from './Observer.vue'
export default {
  name: 'CableImage',
  props: ['id'],
  components: { Observer },
  data () {
    return {
      visible: false,
      imgSrc: undefined,
      imgLoaded: false,
      isObserving: false,
      waitToObserve: undefined
    }
  },
  methods: {
    onVisible () {
      this.visible = true
      this.loadImage()
    },
    onHidden () {
      this.visible = true
    },
    loadImage () {
      if (this.imgSrc) return
      this.$store.dispatch('getCableImage', { id: this.id.toString() })
        .then(imgSrc => this.imgSrc = imgSrc)
    }
  },
  mounted () {
    setTimeout(() => { this.isObserving = true }, 100)
  },
  watch: {
    '$route' (to, from) {
      if (to.query.sort !== from.query.sort) {
        // refresh observer because toggling newest/oldest sort causes it to freeze out on false :(
        this.isObserving = false
        this.waitToObserve = setTimeout(() => { this.isObserving = true }, 100)
      }
    }
  }
}
</script>

<style>
</style>
  