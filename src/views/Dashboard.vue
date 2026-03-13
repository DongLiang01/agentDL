<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="dashboard">
    <h1>{{ t('dashboard.title') }}</h1>
    <p>{{ t('dashboard.welcome') }}, {{ username }}!</p>
    <el-button @click="handleLogout">{{ t('layout.logout') }}</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const username = ref('')

onMounted(() => {
  username.value = localStorage.getItem('username') || 'User'
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  padding: 24px;
}
</style>
