<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="home-content">
    <div class="banner-carousel">
      <el-carousel height="185px">
        <el-carousel-item>
          <img src="https://hkto-prod.oss-accelerate.aliyuncs.com/coinw2/channel-system/image/2023/07/18/8335fafa-274b-4ea9-8b5e-52705de7e20e.png" alt="Banner 1" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="https://hkto-prod.oss-accelerate.aliyuncs.com/coinw2/channel-system/image/2023/08/08/fe14162b-a2ef-405d-8cb7-d19904666e48.png" alt="Banner 2" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="team-stats">
      <b>{{ t('home.teamDailyNew') }} <el-icon><QuestionFilled /></el-icon>: 0</b>
    </div>

    <div class="stats-cards">
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="t('home.tabs.realtime')" name="realtime" />
        <el-tab-pane :label="t('home.tabs.yesterday')" name="yesterday" />
        <el-tab-pane :label="t('home.tabs.last7days')" name="7days" />
        <el-tab-pane :label="t('home.tabs.last30days')" name="30days" />
        <el-tab-pane :label="t('home.tabs.thisMonth')" name="thismonth" />
        <el-tab-pane :label="t('home.tabs.lastMonth')" name="lastmonth" />
        <el-tab-pane :label="t('home.tabs.thisYear')" name="thisyear" />
        <el-tab-pane :label="t('home.tabs.history')" name="history" />
      </el-tabs>

      <el-row :gutter="20">
        <el-col :span="12" :xs="24" :sm="12" :md="12" :lg="6">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.cards.registrations') }}</span>
            </template>
            <div class="stat-value">
              <el-button type="success" :icon="User" circle size="large" />
              <span class="value">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :md="12" :lg="6">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.cards.tradingVolume') }}</span>
            </template>
            <div class="stat-value">
              <el-button type="warning" :icon="Coin" circle size="large" />
              <span class="value">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :md="12" :lg="6">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.cards.tradingFees') }}</span>
            </template>
            <div class="stat-value">
              <el-button type="primary" :icon="Money" circle size="large" />
              <span class="value">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :sm="12" :md="12" :lg="6">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.cards.totalCommission') }}</span>
            </template>
            <div class="stat-value">
              <el-button type="danger" :icon="Present" circle size="large" />
              <span class="value">0</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="charts-section">
      <el-row :gutter="20">
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.dailyNewDeposit') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.dailyNewWithdrawal') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.dailyNewTransactionVolume') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.dailyTransactionFee') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.estimatedRebatesYesterday') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.estimatedRebatesToday') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.exactRebatesYesterday') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.totalDeposit') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.totalWithdrawal') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24" :lg="12">
          <el-card shadow="hover">
            <template #header>
              <span>{{ t('home.charts.activeUsers') }}</span>
            </template>
            <div class="chart-placeholder">
              <span class="value large">0</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { User, Coin, Money, Present, QuestionFilled } from '@element-plus/icons-vue'

const { t } = useI18n()
const activeTab = ref('yesterday')
</script>

<style scoped>
.home-content {
  padding: 0;
}

.banner-carousel {
  margin-bottom: 0;
}

.banner-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-stats {
  margin-bottom: 0;
  font-size: 14px;
}

.stats-cards {
  margin-bottom: 0;
}

.stat-value {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
}

.stat-value .value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.charts-section {
  margin-top: 20px;
}

.chart-placeholder {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder .value.large {
  font-size: 32px;
  font-weight: 700;
  color: #666;
}

:deep(.el-card__header) {
  font-weight: 600;
}

:deep(.el-tabs__item.is-active) {
  color: #0cb4c7;
}

:deep(.el-tabs__active-bar) {
  background-color: #0cb4c7;
}
</style>
