<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="home-content">
    <div class="banner-carousel">
      <el-carousel height="225px">
        <el-carousel-item>
          <img src="https://hkto-prod.oss-accelerate.aliyuncs.com/coinw2/channel-system/image/2023/07/18/8335fafa-274b-4ea9-8b5e-52705de7e20e.png" alt="Banner 1" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="https://hkto-prod.oss-accelerate.aliyuncs.com/coinw2/channel-system/image/2023/08/08/fe14162b-a2ef-405d-8cb7-d19904666e48.png" alt="Banner 2" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="new-system-button">
      <el-button type="primary" size="small" plain>
        {{ t('home.newSystemButton') }}
      </el-button>
    </div>

    <div class="teamNum">
      <b>{{ t('home.teamDailyNew') }} <el-icon><QuestionFilled /></el-icon>: 0</b>
    </div>

    <div class="card">
      <el-tabs v-model="activeTab">
        <el-tab-pane :label="t('home.tabs.realtime')" name="realtime">
          <span class="update-time">{{ t('home.timeOfDataUpdate') }}</span>
        </el-tab-pane>
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
              <div class="card-header-with-select">
                <span>{{ t('home.cards.tradingVolume') }}</span>
                <el-select v-model="volumeFilter" size="small" :placeholder="t('home.select')">
                  <el-option :label="t('home.all')" value="all" />
                  <el-option :label="t('home.futures')" value="futures" />
                  <el-option :label="t('home.spot')" value="spot" />
                  <el-option :label="t('home.etf')" value="etf" />
                </el-select>
              </div>
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
              <div class="card-header-with-select">
                <span>{{ t('home.cards.tradingFees') }}</span>
                <el-select v-model="feesFilter" size="small" :placeholder="t('home.select')">
                  <el-option :label="t('home.all')" value="all" />
                  <el-option :label="t('home.futures')" value="futures" />
                  <el-option :label="t('home.spot')" value="spot" />
                  <el-option :label="t('home.etf')" value="etf" />
                </el-select>
              </div>
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
              <div class="card-header-with-select">
                <span>{{ t('home.cards.totalCommission') }}</span>
                <el-select v-model="commissionFilter" size="small" :placeholder="t('home.select')">
                  <el-option :label="t('home.all')" value="all" />
                  <el-option :label="t('home.futures')" value="futures" />
                  <el-option :label="t('home.spot')" value="spot" />
                  <el-option :label="t('home.etf')" value="etf" />
                </el-select>
              </div>
            </template>
            <div class="stat-value">
              <el-button type="danger" :icon="Present" circle size="large" />
              <span class="value">0</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- All Charts in Single Group -->
    <div class="tag">
      <ul>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyNewDeposit') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyNewDeposit') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyNewDepositOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyNewWithdrawal') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyNewWithdrawal') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyNewWithdrawalOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyNewTransactionVolume') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyNewTransactionVolume') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyNewTransactionVolumeOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyTransactionFee') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyTransactionFee') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyTransactionFeeOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.estimatedRebatesYesterday') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.estimatedRebatesYesterday') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="estimatedRebatesYesterdayOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.estimatedRebatesToday') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.estimatedRebatesToday') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="estimatedRebatesTodayOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.exactRebatesYesterday') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.exactRebatesYesterday') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="exactRebatesYesterdayOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.totalDeposit') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.totalDeposit') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="totalDepositOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.totalWithdrawal') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.totalWithdrawal') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="totalWithdrawalOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.activeUsers') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.activeUsers') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="activeUsersOption" class="pie" autoresize />
        </li>
      </ul>
    </div>

    <!-- Line Charts Group -->
    <div class="tag">
      <ul>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyNewDeposit') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyNewDeposit') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyNewDepositLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyNewWithdrawal') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyNewWithdrawal') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyNewWithdrawalLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyNewTransactionVolume') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyNewTransactionVolume') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyNewTransactionVolumeLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.dailyTransactionFee') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.dailyTransactionFee') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="dailyTransactionFeeLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.estimatedRebatesYesterday') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.estimatedRebatesYesterday') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="estimatedRebatesYesterdayLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.estimatedRebatesToday') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.estimatedRebatesToday') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="estimatedRebatesTodayLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.exactRebatesYesterday') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.exactRebatesYesterday') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="exactRebatesYesterdayLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.totalDeposit') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.totalDeposit') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="totalDepositLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.totalWithdrawal') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.totalWithdrawal') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="totalWithdrawalLineOption" class="pie" autoresize />
        </li>
        <li class="el-col-24 el-col-xs-24 el-col-sm-12 el-col-lg-6">
          <div class="box">
            <div class="describe">
              {{ t('home.charts.activeUsers') }}
              <el-tooltip placement="top">
                <template #content>
                  <span>{{ t('home.charts.activeUsers') }}</span>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <v-chart :option="activeUsersLineOption" class="pie" autoresize />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { User, Coin, Money, Present, QuestionFilled } from '@element-plus/icons-vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const { t } = useI18n()
const activeTab = ref('yesterday')
const volumeFilter = ref('all')
const feesFilter = ref('all')
const commissionFilter = ref('all')

// Generate sample data for last 7 days
const generateDateLabels = () => {
  const labels = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    labels.push(`${date.getMonth() + 1}/${date.getDate()}`)
  }
  return labels
}

const generateRandomData = (min, max) => {
  return Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  )
}

// Daily New Deposit Chart (Pie chart)
const dailyNewDepositOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.dailyNewDeposit'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(1000, 5000)[0], name: t('home.futures'), itemStyle: { color: '#0cb4c7' } },
        { value: generateRandomData(1000, 4000)[0], name: t('home.spot'), itemStyle: { color: '#409eff' } },
        { value: generateRandomData(500, 2000)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Daily New Withdrawal Chart (Pie chart)
const dailyNewWithdrawalOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.dailyNewWithdrawal'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(800, 4000)[0], name: t('home.futures'), itemStyle: { color: '#f56c6c' } },
        { value: generateRandomData(800, 3500)[0], name: t('home.spot'), itemStyle: { color: '#e6a23c' } },
        { value: generateRandomData(400, 1500)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Daily New Transaction Volume Chart (Pie chart)
const dailyNewTransactionVolumeOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.dailyNewTransactionVolume'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(50000, 200000)[0], name: t('home.futures'), itemStyle: { color: '#e6a23c' } },
        { value: generateRandomData(40000, 150000)[0], name: t('home.spot'), itemStyle: { color: '#67c23a' } },
        { value: generateRandomData(20000, 80000)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Daily Transaction Fee Chart (Pie chart)
const dailyTransactionFeeOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.dailyTransactionFee'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(1000, 5000)[0], name: t('home.futures'), itemStyle: { color: '#67c23a' } },
        { value: generateRandomData(800, 4000)[0], name: t('home.spot'), itemStyle: { color: '#409eff' } },
        { value: generateRandomData(400, 2000)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Estimated Rebates Yesterday Chart (Pie chart)
const estimatedRebatesYesterdayOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.estimatedRebatesYesterday'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(1000, 5000)[0], name: t('home.futures'), itemStyle: { color: '#409eff' } },
        { value: generateRandomData(800, 4000)[0], name: t('home.spot'), itemStyle: { color: '#67c23a' } },
        { value: generateRandomData(400, 2000)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Estimated Rebates Today Chart (Pie chart)
const estimatedRebatesTodayOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.estimatedRebatesToday'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(800, 4000)[0], name: t('home.futures'), itemStyle: { color: '#0cb4c7' } },
        { value: generateRandomData(600, 3500)[0], name: t('home.spot'), itemStyle: { color: '#e6a23c' } },
        { value: generateRandomData(300, 1500)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Exact Rebates Yesterday Chart (Pie chart)
const exactRebatesYesterdayOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.exactRebatesYesterday'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(900, 4500)[0], name: t('home.futures'), itemStyle: { color: '#67c23a' } },
        { value: generateRandomData(700, 3800)[0], name: t('home.spot'), itemStyle: { color: '#409eff' } },
        { value: generateRandomData(350, 1800)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Total Deposit Chart (Pie chart)
const totalDepositOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.totalDeposit'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(200000, 800000)[0], name: t('home.futures'), itemStyle: { color: '#0cb4c7' } },
        { value: generateRandomData(150000, 600000)[0], name: t('home.spot'), itemStyle: { color: '#409eff' } },
        { value: generateRandomData(80000, 300000)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Total Withdrawal Chart (Pie chart)
const totalWithdrawalOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.totalWithdrawal'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(100000, 600000)[0], name: t('home.futures'), itemStyle: { color: '#f56c6c' } },
        { value: generateRandomData(80000, 450000)[0], name: t('home.spot'), itemStyle: { color: '#e6a23c' } },
        { value: generateRandomData(40000, 200000)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// Active Users Chart (Pie chart)
const activeUsersOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: t('home.charts.activeUsers'),
      type: 'pie',
      radius: '50%',
      data: [
        { value: generateRandomData(1000, 4000)[0], name: t('home.futures'), itemStyle: { color: '#e6a23c' } },
        { value: generateRandomData(800, 3500)[0], name: t('home.spot'), itemStyle: { color: '#67c23a' } },
        { value: generateRandomData(400, 1800)[0], name: t('home.etf'), itemStyle: { color: '#909399' } }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))

// ========== Line Charts ==========

// Daily New Deposit Chart (Line chart)
const dailyNewDepositLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.dailyNewDeposit'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(1000, 5000),
      smooth: true,
      lineStyle: {
        color: '#0cb4c7'
      },
      areaStyle: {
        color: 'rgba(12, 180, 199, 0.1)'
      }
    }
  ]
}))

// Daily New Withdrawal Chart (Line chart)
const dailyNewWithdrawalLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.dailyNewWithdrawal'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(800, 4000),
      smooth: true,
      lineStyle: {
        color: '#f56c6c'
      },
      areaStyle: {
        color: 'rgba(245, 108, 108, 0.1)'
      }
    }
  ]
}))

// Daily New Transaction Volume Chart (Line chart)
const dailyNewTransactionVolumeLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.dailyNewTransactionVolume'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(50000, 200000),
      smooth: true,
      lineStyle: {
        color: '#e6a23c'
      },
      areaStyle: {
        color: 'rgba(230, 162, 60, 0.1)'
      }
    }
  ]
}))

// Daily Transaction Fee Chart (Line chart)
const dailyTransactionFeeLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.dailyTransactionFee'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(1000, 5000),
      smooth: true,
      lineStyle: {
        color: '#67c23a'
      },
      areaStyle: {
        color: 'rgba(103, 194, 58, 0.1)'
      }
    }
  ]
}))

// Estimated Rebates Yesterday Chart (Line chart)
const estimatedRebatesYesterdayLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.estimatedRebatesYesterday'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(1000, 5000),
      smooth: true,
      lineStyle: {
        color: '#409eff'
      },
      areaStyle: {
        color: 'rgba(64, 158, 255, 0.1)'
      }
    }
  ]
}))

// Estimated Rebates Today Chart (Line chart)
const estimatedRebatesTodayLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.estimatedRebatesToday'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(800, 4000),
      smooth: true,
      lineStyle: {
        color: '#0cb4c7'
      },
      areaStyle: {
        color: 'rgba(12, 180, 199, 0.1)'
      }
    }
  ]
}))

// Exact Rebates Yesterday Chart (Line chart)
const exactRebatesYesterdayLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.exactRebatesYesterday'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(900, 4500),
      smooth: true,
      lineStyle: {
        color: '#67c23a'
      },
      areaStyle: {
        color: 'rgba(103, 194, 58, 0.1)'
      }
    }
  ]
}))

// Total Deposit Chart (Line chart)
const totalDepositLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.totalDeposit'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(200000, 800000),
      smooth: true,
      lineStyle: {
        color: '#0cb4c7'
      },
      areaStyle: {
        color: 'rgba(12, 180, 199, 0.1)'
      }
    }
  ]
}))

// Total Withdrawal Chart (Line chart)
const totalWithdrawalLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.totalWithdrawal'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(100000, 600000),
      smooth: true,
      lineStyle: {
        color: '#f56c6c'
      },
      areaStyle: {
        color: 'rgba(245, 108, 108, 0.1)'
      }
    }
  ]
}))

// Active Users Chart (Line chart)
const activeUsersLineOption = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: generateDateLabels()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: t('home.charts.activeUsers'),
      type: 'line',
      stack: 'Total',
      data: generateRandomData(1000, 4000),
      smooth: true,
      lineStyle: {
        color: '#e6a23c'
      },
      areaStyle: {
        color: 'rgba(230, 162, 60, 0.1)'
      }
    }
  ]
}))
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

.new-system-button {
  display: flex;
  margin-bottom: 15px;
}

.teamNum {
  margin-bottom: 0;
  font-size: 14px;
}

.card {
  margin-bottom: 0;
}

.card-header-with-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-with-select .el-select {
  width: 100px;
}

.update-time {
  display: block;
  margin-bottom: 15px;
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

.tag {
  margin-top: 20px;
}

.tag ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.tag li {
  padding: 10px;
  box-sizing: border-box;
}

.box {
  margin-bottom: 10px;
}

.describe {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.value {
  font-size: 32px;
  font-weight: 700;
  color: #666;
  margin-top: 10px;
}

.pie {
  height: 300px;
  width: 100%;
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
