<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="main-layout homeweb">
    <el-container class="el-container">
      <el-aside class="el-aside" :width="isCollapse ? '64px' : '200px'">
        <div class="logo">
          <span v-if="!isCollapse" style="font-size: 18px;">{{ t('layout.logo') }}</span>
          <span v-else style="font-size: 18px;">{{ t('layout.logoShort') }}</span>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo el-menu sidebar-menu"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          style="background-color: #fff; border-right: none;"
        >
          <el-menu-item index="/home">
            <el-icon><House /></el-icon>
            <span>{{ t('menu.homePage') }}</span>
          </el-menu-item>
          <el-sub-menu index="rebate">
            <template #title>
              <el-icon><Coin /></el-icon>
              <span>{{ t('menu.searchRebate') }}</span>
            </template>
            <el-menu-item index="/rebate-summary">{{ t('menu.rebateSummary') }}</el-menu-item>
            <el-menu-item index="/rebate-records">{{ t('menu.rebateRecords') }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="partner">
            <template #title>
              <el-icon><User /></el-icon>
              <span>{{ t('menu.partnerManagement') }}</span>
            </template>
            <el-menu-item index="partner-config">{{ t('menu.partnerConfig') }}</el-menu-item>
            <el-menu-item index="partner-list">{{ t('menu.partnerList') }}</el-menu-item>
            <el-menu-item index="referral-links">{{ t('menu.referralLinks') }}</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="orders">
            <el-icon><Document /></el-icon>
            <span>{{ t('menu.searchAllOrders') }}</span>
          </el-menu-item>
          <el-sub-menu index="deposit">
            <template #title>
              <el-icon><Ticket /></el-icon>
              <span>{{ t('menu.depositWithdraw') }}</span>
            </template>
            <el-menu-item index="otc-deposit">{{ t('menu.otcDeposit') }}</el-menu-item>
            <el-menu-item index="coin-deposit">{{ t('menu.coinDeposit') }}</el-menu-item>
            <el-menu-item index="transfer">{{ t('menu.transfer') }}</el-menu-item>
            <el-menu-item index="external-deposit">{{ t('menu.externalDeposit') }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="agreement">
            <template #title>
              <el-icon><House /></el-icon>
              <span>{{ t('menu.viewAgreement') }}</span>
            </template>
            <el-menu-item index="regulatory">{{ t('menu.regulatoryGuidelines') }}</el-menu-item>
            <el-menu-item index="agent-agreement">{{ t('menu.agentAgreement') }}</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="materials">
            <el-icon><Ticket /></el-icon>
            <span>{{ t('menu.materialDownload') }}</span>
          </el-menu-item>
          <el-menu-item index="security">
            <el-icon><Coin /></el-icon>
            <span>{{ t('menu.securityCenter') }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <div class="el-aside-bg"></div>
      <el-container class="el-container main_con is-vertical">
        <el-header class="el-header header" style="height: auto;">
          <div class="head" id="Top">
            <div class="head_top">
              <div class="head_top_left">
                <el-icon class="isCollapse" :title="t('layout.collapseExpand')" @click="isCollapse = !isCollapse">
                  <Fold v-if="!isCollapse" />
                  <Expand v-else />
                </el-icon>
              </div>
              <div class="head_top_right">
                <div class="rebate-select-container">
                  <el-select v-model="rebateType" :placeholder="t('layout.select')" class="rate">
                    <el-option :label="t('layout.futuresRebate')" value="futures" />
                    <el-option :label="t('layout.spotRebate')" value="spot" />
                    <el-option :label="t('layout.etfRebate')" value="etf" />
                    <el-option :label="t('layout.apiRebate')" value="api" />
                  </el-select>
                  <span class="ratio">80%</span>
                </div>
                <div><el-icon><View /></el-icon></div>
                <div><el-icon><FullScreen /></el-icon></div>
                <div>
                  <el-dropdown @command="handleLanguageChange">
                    <span class="el-dropdown-link el-dropdown-selfdefine">
                      {{ currentLanguage }}
                      <el-icon><ArrowDown /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="kr">{{ t('layout.languages.kr') }}</el-dropdown-item>
                        <el-dropdown-item command="en">{{ t('layout.languages.en') }}</el-dropdown-item>
                        <el-dropdown-item command="tr">{{ t('layout.languages.tr') }}</el-dropdown-item>
                        <el-dropdown-item command="vi">{{ t('layout.languages.vi') }}</el-dropdown-item>
                        <el-dropdown-item command="ru">{{ t('layout.languages.ru') }}</el-dropdown-item>
                        <el-dropdown-item command="tw">{{ t('layout.languages.tw') }}</el-dropdown-item>
                        <el-dropdown-item command="pt">{{ t('layout.languages.pt') }}</el-dropdown-item>
                        <el-dropdown-item command="ja">{{ t('layout.languages.ja') }}</el-dropdown-item>
                        <el-dropdown-item command="uk">{{ t('layout.languages.uk') }}</el-dropdown-item>
                        <el-dropdown-item command="ar">{{ t('layout.languages.ar') }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div>
                  <el-dropdown @command="handleUserCommand">
                    <span class="el-dropdown-link el-dropdown-selfdefine">
                      {{ username }}
                      <el-icon><ArrowDown /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="password">{{ t('layout.changePassword') }}</el-dropdown-item>
                        <el-dropdown-item command="area">
                          {{ t('layout.managementArea') }}
                        </el-dropdown-item>
                        <el-dropdown-item command="logout" divided>{{ t('layout.logout') }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </el-header>

        <div class="message-container">
          <div class="message">
            <div class="info">{{ t('layout.messageInfo') }}</div>
            <el-badge is-dot class="item">
              <div class="more">
                {{ t('layout.more') }} <el-icon class="el-select__caret el-input__icon" style="transform: rotate(180deg);"><ArrowUp /></el-icon>
              </div>
            </el-badge>
          </div>
        </div>

        <el-main class="el-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  House, Coin, User, Document, Ticket,
  Fold, Expand, View, FullScreen, ArrowDown,
  ArrowUp
} from '@element-plus/icons-vue'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()

const isCollapse = ref(false)
const rebateType = ref('futures')
const currentLanguage = ref('English')
const username = ref(localStorage.getItem('username') || '26345755')

const activeMenu = computed(() => route.path)

const langCodeMap = {
  kr: 'ko',
  en: 'en',
  tr: 'tr',
  vi: 'vi',
  ru: 'ru',
  tw: 'zh-CN',
  pt: 'pt',
  ja: 'ja',
  uk: 'uk',
  ar: 'ar'
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
  ar: 'العربية'
}

const handleLanguageChange = (command) => {
  const newLocale = langCodeMap[command] || 'en'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  currentLanguage.value = langDisplayMap[command] || 'English'
}

const handleUserCommand = (command) => {
  if (command === 'logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    router.push('/login')
  }
}

onMounted(() => {
  const savedLocale = localStorage.getItem('locale') || 'en'
  const savedLangKey = Object.keys(langCodeMap).find(key => langCodeMap[key] === savedLocale) || 'en'
  currentLanguage.value = langDisplayMap[savedLangKey]
})
</script>

<style scoped>
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

.el-aside {
  background-color: #fff;
  overflow: auto;
  flex-shrink: 0;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 24px;
  font-weight: 600;
  color: rgb(28, 29, 40);
}

.el-aside-bg {
  background-color: #fff;
}

.main_con {
  background-color: #f5f7fa;
}

.header {
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
}

.head {
  width: 100%;
}

.head_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.head_top_left {
  display: flex;
  align-items: center;
}

.head_top_left .isCollapse {
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.head_top_right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.rebate-select-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ratio {
  font-weight: 600;
  color: #0cb4c7;
}

.el-dropdown-link {
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
}

.message-container {
  padding: 0;
}

.message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #e6f7ff;
  border-radius: 4px;
  cursor: pointer;
}

.message .info {
  color: #1890ff;
}

.message .more {
  color: #1890ff;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.el-main {
  width: 100%;
  color: rgb(51, 51, 51);
  box-sizing: border-box;
  padding: 0;
  height: 100%;
  overflow: auto;
}

:deep(.sidebar-menu .el-menu-item),
:deep(.sidebar-menu .el-submenu__title) {
  color: #85889c;
  background-color: #fff;
}

:deep(.sidebar-menu .el-menu-item.is-active) {
  color: #4c70f4;
  background-color: #efffff;
}

:deep(.el-header) {
  padding: 0 20px;
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
  padding: 20px;
}
</style>
