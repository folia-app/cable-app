<template lang="pug">
observer.cable-image.relative.group(
  :threshold="0.01",
  @visible="onVisible",
  @hidden="visible = false"
)
  //- (placeholder)
  template(v-if="!imgSrc")
    .w-full
      .aspect-square
        .absolute.overlay.flex.items-center.justify-center.animate-pulse.text-2xs
          .py-1.pl-3.pr-2 loading...

  template(v-else)
    img.block.w-full(v-if="visible", :src="imgSrc")
</template>

<script>
import Observer from "./Observer.vue";
export default {
  name: "CableImage",
  props: ["id"],
  components: { Observer },
  data() {
    return {
      visible: false,
      imgSrc: undefined,
    };
  },
  methods: {
    onVisible() {
      this.visible = true;
      this.loadImage();
    },
    onHidden() {
      this.visible = true;
    },
    loadImage() {
      if (this.imgSrc) return;
      const network = undefined; // this.network
      this.$store
        .dispatch("getCableImage", { id: this.id.toString(), network })
        .then((imgSrc) => (this.imgSrc = imgSrc));
    },
  },
};
</script>

<style>
</style>