<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<script setup>
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

const { theme } = useTheme()

onMounted(() => {
  console.log('Theme initialized:', theme.value)
})
</script>

<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

body {
  font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
