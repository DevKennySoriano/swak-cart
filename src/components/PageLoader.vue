<template>
  <transition name="loader-fade">
    <div v-if="isLoading" class="page-loader">
      <img src="/images/logo.png" alt="Loading" class="pulsing-logo" />
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  isLoading: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.pulsing-logo {
  width: 100px;
  height: auto;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Fade transition */
.loader-fade-enter-active {
  animation: fadeIn 0.3s ease-in;
}

.loader-fade-leave-active {
  animation: fadeOut 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
