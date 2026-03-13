<!--
  Copyright © 2026 TinyTrader. All rights reserved.
  Author: Raymond
  This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.uid" :placeholder="t('coinDeposit.search.uid')" oninput="value=value.replace(/[^\d]/g, '')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" :placeholder="t('coinDeposit.search.userType')" clearable style="width: 130px">
          <el-option :label="t('coinDeposit.userType.nonPartner')" value="non_partner" />
          <el-option :label="t('coinDeposit.userType.partner')" value="partner" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.businessDirection" :placeholder="t('coinDeposit.search.businessDirection')" clearable style="width: 130px">
          <el-option :label="t('coinDeposit.businessDirection.deposit')" value="deposit" />
          <el-option :label="t('coinDeposit.businessDirection.withdrawal')" value="withdrawal" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.currency" :placeholder="t('coinDeposit.search.currency')" filterable clearable style="width: 130px">
          <el-option label="$AKC" value="AKC" />
          <el-option label="$AKC4L" value="AKC4L" />
          <el-option label="$AKC4S" value="AKC4S" />
          <el-option label="$B" value="B" />
          <el-option label="$URL" value="URL" />
          <el-option label="$URO" value="URO" />
          <el-option label="0G" value="0G" />
          <el-option label="BTC" value="BTC" />
          <el-option label="ETH" value="ETH" />
          <el-option label="USDT" value="USDT" />
          <el-option label="BNB" value="BNB" />
          <el-option label="SOL" value="SOL" />
          <el-option label="XRP" value="XRP" />
          <el-option label="ADA" value="ADA" />
          <el-option label="DOGE" value="DOGE" />
          <el-option label="DOT" value="DOT" />
          <el-option label="AVAX" value="AVAX" />
          <el-option label="LINK" value="LINK" />
          <el-option label="MATIC" value="MATIC" />
          <el-option label="LTC" value="LTC" />
          <el-option label="UNI" value="UNI" />
          <el-option label="ATOM" value="ATOM" />
          <el-option label="ETC" value="ETC" />
          <el-option label="XLM" value="XLM" />
          <el-option label="FIL" value="FIL" />
          <el-option label="TRX" value="TRX" />
          <el-option label="NEAR" value="NEAR" />
          <el-option label="APT" value="APT" />
          <el-option label="ARB" value="ARB" />
          <el-option label="OP" value="OP" />
          <el-option label="SUI" value="SUI" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          :range-separator="t('coinDeposit.search.dateRange')"
          :start-placeholder="t('coinDeposit.search.startDate')"
          :end-placeholder="t('coinDeposit.search.endDate')"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">{{ t('coinDeposit.button.search') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExport">{{ t('coinDeposit.button.export') }}</el-button>
      </el-form-item>
      <el-form-item class="test">
        <span>{{ t('coinDeposit.updateTime') }}: {{ updateTime }}</span>
      </el-form-item>
    </el-form>

    <el-table :key="tableKey" :data="tableData" style="width: 100%" border min-height="300" v-loading="loading">
      <el-table-column prop="uid" :label="t('coinDeposit.table.uid')" width="149" />
      <el-table-column prop="userType" :label="t('coinDeposit.table.userType')" width="146" />
      <el-table-column prop="currency" :label="t('coinDeposit.table.currency')" width="146" />
      <el-table-column prop="quantity" :label="t('coinDeposit.table.quantity')" width="146">
        <template #default="scope">
          {{ formatNumber(scope.row.quantity) }}
        </template>
      </el-table-column>
      <el-table-column prop="businessDirection" :label="t('coinDeposit.table.businessDirection')" width="146">
        <template #default="scope">
          <el-tag :type="scope.row.businessDirection === t('coinDeposit.businessDirection.deposit') ? 'success' : 'warning'" size="small">
            {{ scope.row.businessDirection }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="note" :label="t('coinDeposit.table.note')" width="146" />
      <el-table-column prop="transactionTime" :label="t('coinDeposit.table.transactionTime')" width="146" />
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()

const { theme, subscribe } = useTheme()
const tableKey = ref(theme.value)

const searchForm = reactive({
  uid: '',
  userType: '',
  businessDirection: '',
  currency: '',
  dateRange: []
})

const tableData = ref([])
const allData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)
const updateTime = ref('2026-03-13 09:05:29')

const formatNumber = (num) => {
  if (num === null || num === undefined) return '-'
  return Number(num).toFixed(4)
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const handleSizeChange = (val) => {
  pageSize.value = val
}

const handleSearch = () => {
  const { uid, userType, businessDirection, currency, dateRange } = searchForm
  
  let filtered = allData.value
  
  if (uid) {
    filtered = filtered.filter(item => item.uid.includes(uid))
  }
  
  if (userType) {
    const userTypeMap = {
      'non_partner': t('coinDeposit.userType.nonPartner'),
      'partner': t('coinDeposit.userType.partner')
    }
    filtered = filtered.filter(item => item.userType === userTypeMap[userType])
  }
  
  if (businessDirection) {
    const directionMap = {
      'deposit': t('coinDeposit.businessDirection.deposit'),
      'withdrawal': t('coinDeposit.businessDirection.withdrawal')
    }
    filtered = filtered.filter(item => item.businessDirection === directionMap[businessDirection])
  }
  
  if (currency) {
    filtered = filtered.filter(item => item.currency === currency)
  }
  
  if (dateRange && dateRange.length === 2) {
    const [startTime, endTime] = dateRange
    filtered = filtered.filter(item => {
      if (!item.transactionTime) return false
      const itemTime = new Date(item.transactionTime).getTime()
      const start = new Date(startTime).setHours(0, 0, 0, 0)
      const end = new Date(endTime).setHours(23, 59, 59, 999)
      return itemTime >= start && itemTime <= end
    })
  }
  
  tableData.value = filtered
  total.value = filtered.length
  currentPage.value = 1
}

const handleExport = () => {
  ElMessage.info('下載功能敬請期待')
}

const fetchData = async () => {
  loading.value = true
  try {
    const mockData = [
      {
        uid: '22345678',
        userType: '非合夥人',
        currency: 'BTC',
        quantity: '2.5000',
        businessDirection: '入金',
        note: '鏈上充值',
        transactionTime: '2026-03-12 10:30:25'
      },
      {
        uid: '22345679',
        userType: '合夥人',
        currency: 'ETH',
        quantity: '25.5000',
        businessDirection: '入金',
        note: '鏈上充值',
        transactionTime: '2026-03-12 11:45:10'
      },
      {
        uid: '22345680',
        userType: '非合夥人',
        currency: 'USDT',
        quantity: '10000.0000',
        businessDirection: '出金',
        note: '鏈上提現',
        transactionTime: '2026-03-12 14:20:55'
      },
      {
        uid: '22345681',
        userType: '非合夥人',
        currency: 'BTC',
        quantity: '1.8500',
        businessDirection: '入金',
        note: '鏈上充值',
        transactionTime: '2026-03-12 15:10:30'
      },
      {
        uid: '22345682',
        userType: '合夥人',
        currency: 'ETH',
        quantity: '50.0000',
        businessDirection: '出金',
        note: '鏈上提現',
        transactionTime: '2026-03-12 16:05:00'
      },
      {
        uid: '22345683',
        userType: '非合夥人',
        currency: 'BNB',
        quantity: '100.0000',
        businessDirection: '入金',
        note: '鏈上充值',
        transactionTime: '2026-03-11 09:15:20'
      },
      {
        uid: '22345684',
        userType: '非合夥人',
        currency: 'SOL',
        quantity: '200.0000',
        businessDirection: '出金',
        note: '鏈上提現',
        transactionTime: '2026-03-11 10:22:45'
      },
      {
        uid: '22345685',
        userType: '合夥人',
        currency: 'USDT',
        quantity: '50000.0000',
        businessDirection: '入金',
        note: '鏈上充值',
        transactionTime: '2026-03-11 13:30:10'
      },
      {
        uid: '22345686',
        userType: '非合夥人',
        currency: 'BTC',
        quantity: '5.1000',
        businessDirection: '入金',
        note: '鏈上充值',
        transactionTime: '2026-03-10 16:45:30'
      },
      {
        uid: '22345687',
        userType: '非合夥人',
        currency: 'ETH',
        quantity: '80.0000',
        businessDirection: '出金',
        note: '鏈上提現',
        transactionTime: '2026-03-10 18:20:15'
      }
    ]
    
    allData.value = mockData
    tableData.value = mockData
    total.value = mockData.length
  } catch (error) {
    ElMessage.error('獲取數據失敗')
  } finally {
    loading.value = false
  }
}

fetchData()

onMounted(() => {
  subscribe((newTheme) => {
    tableKey.value = newTheme
  })
})
</script>

<style scoped>
.content {
  padding: 20px;
}

.demo-form-inline {
  margin-bottom: 20px;
}

.demo-form-inline .el-form-item {
  margin-bottom: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  clear: both;
  padding: 10px 0;
  min-height: 32px;
}

:deep(.el-pagination) {
  justify-content: flex-start;
}

:deep(.el-table) {
  font-size: 12px;
}

:deep(.el-table__empty-text) {
  font-size: 14px;
}

:deep(.el-input),
:deep(.el-select) {
  width: 150px;
}

:deep(.el-date-editor) {
  width: 240px !important;
}

:deep(.test) {
  margin-left: 20px;
}

:deep(.test .el-form-item__content) {
  font-size: 12px;
  color: var(--theme-text-secondary);
}
</style>
