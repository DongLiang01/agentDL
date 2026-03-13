<!--
  Copyright © 2026 TinyTrader. All rights reserved.
  Author: Raymond
  This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.uid" :placeholder="t('otcDeposit.search.uid')" oninput="value=value.replace(/[^\d]/g, '')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" :placeholder="t('otcDeposit.search.userType')" clearable style="width: 130px">
          <el-option :label="t('otcDeposit.userType.client')" value="client" />
          <el-option :label="t('otcDeposit.userType.agent')" value="agent" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.businessDirection" :placeholder="t('otcDeposit.search.businessDirection')" clearable style="width: 130px">
          <el-option :label="t('otcDeposit.businessDirection.deposit')" value="deposit" />
          <el-option :label="t('otcDeposit.businessDirection.withdrawal')" value="withdrawal" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          :range-separator="t('otcDeposit.search.dateRange')"
          :start-placeholder="t('otcDeposit.search.startDate')"
          :end-placeholder="t('otcDeposit.search.endDate')"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">{{ t('otcDeposit.button.search') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExport">{{ t('otcDeposit.button.export') }}</el-button>
      </el-form-item>
      <el-form-item class="test">
        <span>{{ t('otcDeposit.updateTime') }}: {{ updateTime }}</span>
      </el-form-item>
    </el-form>

    <el-table :key="tableKey" :data="tableData" style="width: 100%" border min-height="300" v-loading="loading">
      <el-table-column prop="uid" :label="t('otcDeposit.table.uid')" width="145" />
      <el-table-column prop="userType" :label="t('otcDeposit.table.userType')" width="139" />
      <el-table-column prop="currency" :label="t('otcDeposit.table.currency')" width="139" />
      <el-table-column prop="quantity" :label="t('otcDeposit.table.quantity')" width="139">
        <template #default="scope">
          {{ formatNumber(scope.row.quantity) }}
        </template>
      </el-table-column>
      <el-table-column prop="businessDirection" :label="t('otcDeposit.table.businessDirection')" width="139">
        <template #default="scope">
          <el-tag :type="scope.row.businessDirection === t('otcDeposit.businessDirection.deposit') ? 'success' : 'warning'" size="small">
            {{ scope.row.businessDirection }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="note" :label="t('otcDeposit.table.note')" width="139" />
      <el-table-column prop="transactionTime" :label="t('otcDeposit.table.transactionTime')" width="139" />
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
  dateRange: []
})

const tableData = ref([])
const allData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)
const updateTime = ref('2026-03-13 00:26:36')

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
  const { uid, userType, businessDirection, dateRange } = searchForm
  
  let filtered = allData.value
  
  if (uid) {
    filtered = filtered.filter(item => item.uid.includes(uid))
  }
  
  if (userType) {
    filtered = filtered.filter(item => 
      item.userType.toLowerCase() === userType.toLowerCase()
    )
  }
  
  if (businessDirection) {
    filtered = filtered.filter(item => 
      item.businessDirection.toLowerCase() === businessDirection.toLowerCase()
    )
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
  ElMessage.info('Export functionality coming soon')
}

const fetchData = async () => {
  loading.value = true
  try {
    const mockData = [
      {
        uid: '12345678',
        userType: 'Client',
        currency: 'BTC',
        quantity: '1.2500',
        businessDirection: 'Deposit',
        note: 'OTC Deposit',
        transactionTime: '2026-03-12 10:30:25'
      },
      {
        uid: '12345679',
        userType: 'Agent',
        currency: 'ETH',
        quantity: '15.5000',
        businessDirection: 'Deposit',
        note: 'OTC Deposit',
        transactionTime: '2026-03-12 11:45:10'
      },
      {
        uid: '12345680',
        userType: 'Client',
        currency: 'USDT',
        quantity: '5000.0000',
        businessDirection: 'Withdrawal',
        note: 'OTC Withdrawal',
        transactionTime: '2026-03-12 14:20:55'
      },
      {
        uid: '12345681',
        userType: 'Client',
        currency: 'BTC',
        quantity: '0.8500',
        businessDirection: 'Deposit',
        note: 'OTC Deposit',
        transactionTime: '2026-03-12 15:10:30'
      },
      {
        uid: '12345682',
        userType: 'Agent',
        currency: 'ETH',
        quantity: '20.0000',
        businessDirection: 'Withdrawal',
        note: 'OTC Withdrawal',
        transactionTime: '2026-03-12 16:05:00'
      },
      {
        uid: '12345683',
        userType: 'Client',
        currency: 'BNB',
        quantity: '50.0000',
        businessDirection: 'Deposit',
        note: 'OTC Deposit',
        transactionTime: '2026-03-11 09:15:20'
      },
      {
        uid: '12345684',
        userType: 'Client',
        currency: 'SOL',
        quantity: '100.0000',
        businessDirection: 'Withdrawal',
        note: 'OTC Withdrawal',
        transactionTime: '2026-03-11 10:22:45'
      },
      {
        uid: '12345685',
        userType: 'Agent',
        currency: 'USDT',
        quantity: '10000.0000',
        businessDirection: 'Deposit',
        note: 'OTC Deposit',
        transactionTime: '2026-03-11 13:30:10'
      },
      {
        uid: '12345686',
        userType: 'Client',
        currency: 'BTC',
        quantity: '2.1000',
        businessDirection: 'Deposit',
        note: 'OTC Deposit',
        transactionTime: '2026-03-10 16:45:30'
      },
      {
        uid: '12345687',
        userType: 'Client',
        currency: 'ETH',
        quantity: '30.0000',
        businessDirection: 'Withdrawal',
        note: 'OTC Withdrawal',
        transactionTime: '2026-03-10 18:20:15'
      }
    ]
    
    allData.value = mockData
    tableData.value = mockData
    total.value = mockData.length
  } catch (error) {
    ElMessage.error('Failed to fetch data')
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
