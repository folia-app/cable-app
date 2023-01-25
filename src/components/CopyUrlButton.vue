<template>
  <button :class="classes" @click="copyShareUrl" title="Copy Token URL">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="iconClasses">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  </button>

  <transition name="msgslideup">
    <div v-if="status" class="fixed z-40 w-full bottom-8 left-0 flex justify-center pointer-events-none">
      <div class="rounded h-11 flex items-center text-smm px-4 leading-none pt-px" :class="{'bg-red-500': status.type === 'error', 'bg-accent4': status.type === 'success'}">{{ status.msg }}</div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  url: { type: String, default: undefined },
  classes: { type: String, default: '' },
  iconClasses: { type: String, default: 'w-6 h-6' }
})

const status = ref()

function copyShareUrl () {
  try {
    window.navigator.clipboard.writeText(props.url ?? window.location.href)
    status.value = { type: 'success', msg: 'cable URL copied!' }
  } catch (e) {
    console.log(e)
    status.value = { type: 'error', msg: "couldn't copy cable URL!" }
  }
  setTimeout(() => { status.value = undefined }, 1500)
}
</script>

<style>
.msgslideup-enter-active,
.msgslideup-leave-active{
  transition: transform 100ms;
}
.msgslideup-enter-from,
.msgslideup-leave-to{
  transform: translateY(100%)
}
</style>