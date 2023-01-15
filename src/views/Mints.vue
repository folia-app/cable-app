<template>
  <div class="min-h-screen bg-white text-black">
    <ul class="grid grid-cols-2 sm_grid-cols-3 lg_grid-cols-4">
      <template v-for="n in 545">
        <li class="relative">
          <figure class="aspect-square border-r border-b border-gray-200">
          </figure>
          <h6 class="text-sm absolute overlay flex items-center justify-center">{{ n }}</h6>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
</script>