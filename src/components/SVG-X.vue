<template lang="pug">
//- svg.block(@click="$emit('click')")
  line(x1="0", y1="0", x2="100%", y2="100%", stroke="currentColor", :stroke-width="strokeWidth")
  line(x1="0", y1="100%", x2="100%", y2="0%", stroke="currentColor", :stroke-width="strokeWidth")
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />  
</svg>

</template>

<script>
export default {
  name: 'SVG-X',
  props: {
    strokeWidth: { type: String, default: '1' }
  }
}
</script>
