<template lang="pug">
button.btn.rounded.btn-white.text-smm.border.pl-7(@click.prevent="toggleSort", style="align-items:stretch")
  .whitespace-nowrap.pointer-events-none(style="width: 3.8em") {{ $route.query.sort }}
  .flex.items-center(:class="{'transform rotate-180 origin-center': $route.query.sort === 'oldest' }")
    svg-chevron-down.w-6.h-6.mx-3.pointer-events-none(strokeWidth="1.25")
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import SvgChevronDown from '@/components/SvgChevronDown.vue'

const route = useRoute()
const router = useRouter()

function toggleSort () {
  const val = route.query.sort !== 'newest' ? 'newest' : 'oldest'
  router.replace({ query: { sort: val }})
}
</script>
