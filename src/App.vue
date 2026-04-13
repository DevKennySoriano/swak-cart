<script setup>
import { onMounted, ref } from 'vue'
import HomePage from './components/HomePage.vue'
import SwakCartPage from './components/SwakCartPage.vue'
import PageLoader from './components/PageLoader.vue'

const isLoading = ref(true)
const hasStarted = ref(false)

function handleStart() {
  if (isLoading.value || hasStarted.value) return
  isLoading.value = true
  setTimeout(() => {
    hasStarted.value = true
    isLoading.value = false
  }, 800)
}

onMounted(() => {
  setTimeout(() => {
    if (!hasStarted.value) {
      isLoading.value = false
    }
  }, 800)
})
</script>

<template>
  <PageLoader :is-loading="isLoading" />
  <HomePage v-if="!hasStarted && !isLoading" @start="handleStart" />
  <SwakCartPage v-if="!isLoading && hasStarted" />
</template>
