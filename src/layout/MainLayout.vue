<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="main-layout homeweb">
    <el-container class="el-container">
      <el-aside class="os-aside" :width="isCollapse ? '72px' : sidebarWidth">
        <!-- Logo区域 -->
        <div class="os-logo">
          <div class="os-logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="var(--theme-primary)"/>
              <path d="M8 14L12 10L16 14L20 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 18L12 14L16 18L20 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
            </svg>
          </div>
          <span v-if="!isCollapse" class="os-logo-text">{{ t('layout.logo') }}</span>
        </div>

        <!-- 导航菜单 -->
        <nav class="os-nav">
          <el-menu
            :default-active="activeMenu"
            class="os-menu"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            router
            @select="handleMenuSelect"
          >
            <el-menu-item index="/home" class="os-menu-item">
              <el-icon><House /></el-icon>
              <span>{{ t('menu.homePage') }}</span>
            </el-menu-item>

            <el-sub-menu index="rebate" class="os-submenu">
              <template #title>
                <el-icon><Coin /></el-icon>
                <span>{{ t('menu.searchRebate') }}</span>
              </template>
              <el-menu-item index="/rebate-summary" class="os-menu-item os-menu-item--sub">{{ t('menu.rebateSummary') }}</el-menu-item>
              <el-menu-item index="/rebate-records" class="os-menu-item os-menu-item--sub">{{ t('menu.rebateRecords') }}</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="partner" class="os-submenu">
              <template #title>
                <el-icon><User /></el-icon>
                <span>{{ t('menu.partnerManagement') }}</span>
              </template>
              <el-menu-item index="partner-config" class="os-menu-item os-menu-item--sub">{{ t('menu.partnerConfig') }}</el-menu-item>
              <el-menu-item index="partner-list" class="os-menu-item os-menu-item--sub">{{ t('menu.partnerList') }}</el-menu-item>
              <el-menu-item index="referral-links" class="os-menu-item os-menu-item--sub">{{ t('menu.referralLinks') }}</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/search-all-orders" class="os-menu-item">
              <el-icon><Document /></el-icon>
              <span>{{ t('menu.searchAllOrders') }}</span>
            </el-menu-item>

            <el-sub-menu index="deposit" class="os-submenu">
              <template #title>
                <el-icon><Ticket /></el-icon>
                <span>{{ t('menu.depositWithdraw') }}</span>
              </template>
              <el-menu-item index="otc-deposit" class="os-menu-item os-menu-item--sub">{{ t('menu.otcDeposit') }}</el-menu-item>
              <el-menu-item index="coin-deposit" class="os-menu-item os-menu-item--sub">{{ t('menu.coinDeposit') }}</el-menu-item>
              <el-menu-item index="/transfer" class="os-menu-item os-menu-item--sub">{{ t('menu.transfer') }}</el-menu-item>
              <el-menu-item index="/external-deposit" class="os-menu-item os-menu-item--sub">{{ t('menu.externalDeposit') }}</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="security" class="os-menu-item">
              <el-icon><Coin /></el-icon>
              <span>{{ t('menu.securityCenter') }}</span>
            </el-menu-item>
          </el-menu>
        </nav>
      </el-aside>

      <el-container class="el-container main_con is-vertical">
        <el-header class="os-header" style="height: auto;">
          <div class="os-header-inner">
            <div class="os-header-left">
              <button class="os-collapse-btn-header" @click="isCollapse = !isCollapse" :title="t('layout.collapseExpand')">
                <el-icon :size="18">
                  <Fold v-if="!isCollapse" />
                  <Expand v-else />
                </el-icon>
              </button>
            </div>
            <div class="os-header-right">
              <div class="os-rebate-select">
                <el-select v-model="rebateType" :placeholder="t('layout.select')" class="os-select" size="default">
                  <el-option :label="t('layout.futuresRebate')" value="futures" />
                  <el-option :label="t('layout.spotRebate')" value="spot" />
                  <el-option :label="t('layout.etfRebate')" value="etf" />
                  <el-option :label="t('layout.apiRebate')" value="api" />
                </el-select>
                <span class="os-ratio-badge">80%</span>
              </div>

              <div class="os-header-actions">
                <button class="os-icon-btn" title="View">
                  <el-icon :size="18"><View /></el-icon>
                </button>
                <button class="os-icon-btn" title="Fullscreen">
                  <el-icon :size="18"><FullScreen /></el-icon>
                </button>
                <button
                  class="os-icon-btn"
                  :title="theme === 'dark' ? '切换到白天模式' : '切换到黑夜模式'"
                  @click="toggleTheme"
                >
                  <el-icon :size="18">
                    <Moon v-if="theme !== 'dark'" />
                    <Sunny v-else />
                  </el-icon>
                </button>
              </div>

              <div class="os-header-divider"></div>

              <el-dropdown @command="handleLanguageChange" trigger="click">
                <button class="os-dropdown-btn">
                  {{ currentLanguage }}
                  <el-icon :size="12"><ArrowDown /></el-icon>
                </button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="zh-CN" :class="{ 'is-selected': locale === 'zh-CN' }">简体中文</el-dropdown-item>
                    <el-dropdown-item command="tw" :class="{ 'is-selected': locale === 'zh-TW' }">繁體中文</el-dropdown-item>
                    <el-dropdown-item command="en" :class="{ 'is-selected': locale === 'en' }">English</el-dropdown-item>
                    <el-dropdown-item command="kr" :class="{ 'is-selected': locale === 'ko' }">한국어</el-dropdown-item>
                    <el-dropdown-item command="ja" :class="{ 'is-selected': locale === 'ja' }">日本語</el-dropdown-item>
                    <el-dropdown-item command="vi" :class="{ 'is-selected': locale === 'vi' }">Tiếng Việt</el-dropdown-item>
                    <el-dropdown-item command="tr" :class="{ 'is-selected': locale === 'tr' }">Türkçe</el-dropdown-item>
                    <el-dropdown-item command="pt" :class="{ 'is-selected': locale === 'pt' }">Português</el-dropdown-item>
                    <el-dropdown-item command="ru" :class="{ 'is-selected': locale === 'ru' }">Русский</el-dropdown-item>
                    <el-dropdown-item command="uk" :class="{ 'is-selected': locale === 'uk' }">Українська</el-dropdown-item>
                    <el-dropdown-item command="ar" :class="{ 'is-selected': locale === 'ar' }">العربية</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown @command="handleUserCommand" trigger="click">
                <button class="os-user-btn">
                  <div class="os-avatar">{{ username.charAt(0).toUpperCase() }}</div>
                  <span class="os-username">{{ username }}</span>
                  <el-icon :size="12"><ArrowDown /></el-icon>
                </button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="password">{{ t('layout.changePassword') }}</el-dropdown-item>
                    <el-dropdown-item command="area">{{ t('layout.managementArea') }}</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>{{ t('layout.logout') }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>

        <div class="os-message-bar">
          <div class="os-message-content">
            <div class="os-message-text">{{ t('layout.messageInfo') }}</div>
            <el-badge is-dot class="item">
              <div class="os-message-more">
                {{ t('layout.more') }} <el-icon :size="12" style="transform: rotate(180deg);"><ArrowUp /></el-icon>
              </div>
            </el-badge>
          </div>
        </div>

        <el-main class="os-main">
          <router-view />
          <div v-if="rightPanelComponent" class="os-right-panel">
            <div class="os-right-panel-header">
              <span>{{ rightPanelTitle }}</span>
              <button class="os-icon-btn" @click="closeRightPanel">
                <el-icon :size="18"><Close /></el-icon>
              </button>
            </div>
            <div class="os-right-panel-content">
              <component :is="rightPanelComponent" />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'
import {
  House, Coin, User, Document, Ticket,
  Fold, Expand, View, FullScreen, ArrowDown,
  ArrowUp, Close, Sunny, Moon
} from '@element-plus/icons-vue'
import PartnerConfiguration from '../views/PartnerConfiguration.vue'
import RebateRecords from '../views/RebateRecords.vue'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()

const isCollapse = ref(false)
const rebateType = ref('futures')
const currentLanguage = ref('English')
const username = ref(localStorage.getItem('username') || '26345755')
const rightPanelComponent = ref(null)
const rightPanelTitle = ref('')
const sidebarWidth = ref('230px')

const langWidthMap = {
  'zh-CN': '200px',
  'zh-TW': '200px',
  en: '230px',
  ja: '210px',
  ko: '210px',
  vi: '230px',
  pt: '250px',
  tr: '280px',
  ru: '280px',
  uk: '280px',
  ar: '280px'
}

const { theme, toggleTheme } = useTheme()

const menuComponentMap = {
  'rebate-records': { component: RebateRecords, title: 'Rebate Records' }
}

const activeMenu = computed(() => route.path)

const langCodeMap = {
  kr: 'ko',
  en: 'en',
  tr: 'tr',
  vi: 'vi',
  ru: 'ru',
  tw: 'zh-TW',
  pt: 'pt',
  ja: 'ja',
  uk: 'uk',
  ar: 'ar',
  'zh-CN': 'zh-CN'
}

const langDisplayMap = {
  kr: '한국어',
  en: 'English',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  ru: 'Русский',
  tw: '繁體中文',
  pt: 'Português',
  ja: '日本語',
  uk: 'Українська',
  ar: 'العربية',
  'zh-CN': '简体中文'
}

const handleLanguageChange = (command) => {
  const newLocale = langCodeMap[command] || 'en'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  currentLanguage.value = langDisplayMap[command] || 'English'
  sidebarWidth.value = langWidthMap[newLocale] || '230px'
}

const handleUserCommand = (command) => {
  if (command === 'logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    router.push('/login')
  }
}

const handleMenuSelect = (index) => {
  if (menuComponentMap[index]) {
    rightPanelComponent.value = menuComponentMap[index].component
    rightPanelTitle.value = menuComponentMap[index].title
  } else {
    rightPanelComponent.value = null
    rightPanelTitle.value = ''
  }
}

const closeRightPanel = () => {
  rightPanelComponent.value = null
  rightPanelTitle.value = ''
}

onMounted(() => {
  const savedLocale = localStorage.getItem('locale') || 'en'
  const savedLangKey = Object.keys(langCodeMap).find(key => langCodeMap[key] === savedLocale) || 'en'
  currentLanguage.value = langDisplayMap[savedLangKey]
  sidebarWidth.value = langWidthMap[savedLocale] || '230px'
})
</script>

<style scoped>
/* ============================================
   Layout Shell
   ============================================ */
.main-layout {
  min-height: 100vh;
  height: 100%;
}

.homeweb {
  height: 100%;
}

.homeweb .el-container {
  width: 100%;
  height: 100%;
}

/* ============================================
   Sidebar - OpenSea Style
   ============================================ */
.os-aside {
  background-color: var(--theme-bg-sidebar);
  border-right: 1px solid var(--theme-border);
  overflow: visible;
  flex-shrink: 0;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  z-index: 10;
}

/* Logo */
.os-logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  flex-shrink: 0;
}

.os-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.os-logo-text {
  font-size: 17px;
  font-weight: 700;
  color: var(--theme-text-primary);
  white-space: nowrap;
  letter-spacing: -0.02em;
}

/* Navigation */
.os-nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 10px;
}

.os-nav::-webkit-scrollbar {
  width: 4px;
}

.os-nav::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 2px;
}

.os-nav:hover::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
}

/* Menu base reset */
.os-menu {
  border-right: none !important;
  background-color: transparent !important;
  padding: 0;
}

/* Menu items - OpenSea pill style */
:deep(.os-menu .el-menu-item) {
  height: 42px;
  line-height: 42px;
  margin: 2px 0;
  border-radius: var(--theme-menu-item-radius) !important;
  color: var(--theme-text-secondary) !important;
  background-color: transparent !important;
  font-size: 14px;
  font-weight: 500;
  padding: 0 12px !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px;
  transition: all 0.15s ease;
}

:deep(.os-menu .el-menu-item:hover) {
  background-color: var(--theme-menu-hover-bg) !important;
  color: var(--theme-text-primary) !important;
}

:deep(.os-menu .el-menu-item.is-active) {
  background-color: var(--theme-menu-active-bg) !important;
  color: var(--theme-menu-active-text) !important;
  font-weight: 600;
}

:deep(.os-menu .el-menu-item .el-icon) {
  font-size: 18px;
  width: 18px;
  color: inherit !important;
  margin-right: 0;
}

/* Sub-menu title - OpenSea style */
:deep(.os-menu .el-sub-menu__title) {
  height: 42px;
  line-height: 42px;
  margin: 2px 0;
  border-radius: var(--theme-menu-item-radius) !important;
  color: var(--theme-text-secondary) !important;
  background-color: transparent !important;
  font-size: 14px;
  font-weight: 500;
  padding: 0 12px !important;
  display: flex !important;
  align-items: center !important;
  transition: all 0.15s ease;
}

:deep(.os-menu .el-sub-menu__title:hover) {
  background-color: var(--theme-menu-hover-bg) !important;
  color: var(--theme-text-primary) !important;
}

:deep(.os-menu .el-sub-menu__title .el-icon) {
  font-size: 18px;
  width: 18px;
  color: inherit !important;
  margin-right: 10px;
}

:deep(.os-menu .el-sub-menu__title .el-sub-menu__icon-arrow) {
  color: var(--theme-text-muted) !important;
  font-size: 12px;
  right: 12px;
}

/* Active sub-menu title */
:deep(.os-menu .el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--theme-menu-active-text) !important;
}

/* Sub-menu items - indented */
:deep(.os-menu .el-sub-menu .el-menu) {
  background-color: transparent !important;
  padding: 0 0 0 8px;
}

:deep(.os-menu .el-sub-menu .el-menu .el-menu-item) {
  height: 38px;
  line-height: 38px;
  font-size: 13px;
  padding-left: 42px !important;
  margin: 1px 0;
  border-radius: var(--theme-menu-item-radius) !important;
}

/* Collapsed state */
:deep(.os-menu.el-menu--collapse .el-menu-item) {
  padding: 0 !important;
  justify-content: center;
}

:deep(.os-menu.el-menu--collapse .el-sub-menu__title) {
  padding: 0 !important;
  justify-content: center;
}

:deep(.os-menu.el-menu--collapse .el-sub-menu__title .el-icon) {
  margin-right: 0;
}

:deep(.os-menu.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow) {
  display: none;
}

/* ============================================
   Header - OpenSea Style
   ============================================ */
.os-header {
  padding: 0 !important;
  background-color: var(--theme-bg-header);
  border-bottom: 1px solid var(--theme-border);
  flex-shrink: 0;
}

.os-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
}

.os-header-left {
  display: flex;
  align-items: center;
}

.os-collapse-btn-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  color: var(--theme-text-secondary);
  transition: all 0.15s ease;
  margin-right: 16px;
}

.os-collapse-btn-header:hover {
  background-color: var(--theme-menu-hover-bg);
  color: var(--theme-text-primary);
}

.os-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Rebate select */
.os-rebate-select {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.os-select .el-input__wrapper) {
  border-radius: 10px !important;
  background-color: var(--theme-bg-input) !important;
  box-shadow: none !important;
  border: 1px solid var(--theme-border);
  padding: 2px 12px;
  height: 36px;
}

:deep(.os-select .el-input__wrapper:hover) {
  border-color: var(--theme-text-muted);
}

:deep(.os-select .el-input__wrapper.is-focus) {
  border-color: var(--theme-primary);
}

.os-ratio-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  background-color: var(--theme-primary);
  color: #ffffff;
  border-radius: 20px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
}

/* Header icon buttons */
.os-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--theme-text-secondary);
  transition: all 0.15s ease;
}

.os-icon-btn:hover {
  background-color: var(--theme-menu-hover-bg);
  color: var(--theme-text-primary);
}

.os-header-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.os-header-divider {
  width: 1px;
  height: 24px;
  background-color: var(--theme-border);
  margin: 0 8px;
}

/* Dropdown buttons */
.os-dropdown-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid var(--theme-border);
  background: transparent;
  cursor: pointer;
  color: var(--theme-text-secondary);
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;
  font-family: inherit;
}

.os-dropdown-btn:hover {
  border-color: var(--theme-text-muted);
  color: var(--theme-text-primary);
  background-color: var(--theme-menu-hover-bg);
}

/* User button */
.os-user-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px 4px 4px;
  border-radius: 24px;
  border: 1px solid var(--theme-border);
  background: transparent;
  cursor: pointer;
  color: var(--theme-text-primary);
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;
  font-family: inherit;
}

.os-user-btn:hover {
  border-color: var(--theme-text-muted);
  background-color: var(--theme-menu-hover-bg);
}

.os-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--theme-primary), var(--theme-primary-hover));
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.os-username {
  white-space: nowrap;
}

/* ============================================
   Message Bar - OpenSea Style
   ============================================ */
.os-message-bar {
  padding: 0;
  flex-shrink: 0;
}

.os-message-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  background: var(--theme-message-bg);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.os-message-content:hover {
  filter: brightness(0.97);
}

.os-message-text {
  color: var(--theme-message-text);
  font-size: 13px;
  font-weight: 500;
}

.os-message-more {
  color: var(--theme-message-text);
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
}

/* ============================================
   Main Content - OpenSea Style
   ============================================ */
.os-main {
  width: 100%;
  color: var(--theme-text-primary);
  box-sizing: border-box;
  padding: 24px !important;
  height: 100%;
  overflow: auto;
  background-color: var(--theme-bg-main);
}

.main_con {
  background-color: var(--theme-bg-main);
}

/* ============================================
   Right Panel - OpenSea Style
   ============================================ */
.os-right-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: calc(100vh - 64px);
  background: var(--theme-bg-card);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.08);
  z-index: 100;
  overflow: auto;
  padding: 0;
  border-left: 1px solid var(--theme-border);
  border-radius: var(--border-radius-lg) 0 0 var(--border-radius-lg);
}

.os-right-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--theme-border);
  background: var(--theme-bg-card);
  font-weight: 600;
  font-size: 16px;
  color: var(--theme-text-primary);
  position: sticky;
  top: 0;
  z-index: 1;
}

.os-right-panel-content {
  height: calc(100% - 60px);
  overflow: auto;
}

/* ============================================
   Element Plus Overrides (scoped)
   ============================================ */
:deep(.el-header) {
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
}

:deep(.el-aside),
:deep(.el-header) {
  box-sizing: border-box;
  flex-shrink: 0;
}

:deep(.el-aside),
:deep(.el-main) {
  overflow: auto;
}

:deep(.el-main) {
  display: block;
  flex: 1 1 auto;
}

:deep(.el-dropdown-menu__item.is-selected) {
  color: var(--brand-primary);
  font-weight: 600;
}
</style>
