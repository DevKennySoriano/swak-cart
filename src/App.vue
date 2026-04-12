<script setup>
import { ref, onMounted } from 'vue'
import SwakCartPage from './components/SwakCartPage.vue'
import PageLoader from './components/PageLoader.vue'

const isLoading = ref(true)

onMounted(() => {
  // Simulate loading time, or remove this if you have real data loading
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})
</script>

<template>
  <PageLoader :is-loading="isLoading" />
  <SwakCartPage v-if="!isLoading" />
</template>
