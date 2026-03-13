<!--
 Copyright © 2026 TinyTrader. All rights reserved.
 Author: Raymond
 This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.uid" :placeholder="t('transfer.search.uid')" oninput="value=value.replace(/[^\d]/g, '')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" :placeholder="t('transfer.search.userType')" clearable style="width: 130px">
          <el-option :label="t('transfer.type.nonPartner')" value="nonPartner" />
          <el-option :label="t('transfer.type.partner')" value="partner" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.direction" :placeholder="t('transfer.search.direction')" clearable style="width: 130px">
          <el-option :label="t('transfer.direction.deposit')" value="deposit" />
          <el-option :label="t('transfer.direction.withdraw')" value="withdraw" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          range-separator="-"
          :start-placeholder="t('transfer.search.startDate')"
          :end-placeholder="t('transfer.search.endDate')"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">{{ t('transfer.button.search') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ t('transfer.button.download') }}</el-button>
      </el-form-item>
      <el-form-item class="test">
        <span>{{ t('transfer.dataUpdateTime') }}: {{ updateTime }}</span>
      </el-form-item>
    </el-form>

    <el-table :data="displayData" style="width: 100%" border min-height="300">
      <el-table-column prop="uid" :label="t('transfer.table.uid')" width="180" />
      <el-table-column prop="userType" :label="t('transfer.table.userType')" width="180" />
      <el-table-column prop="currency" :label="t('transfer.table.currency')" width="180" />
      <el-table-column prop="amount" :label="t('transfer.table.amount')" width="180" />
      <el-table-column prop="direction" :label="t('transfer.table.direction')" width="180" />
      <el-table-column prop="note" :label="t('transfer.table.note')" width="180" />
      <el-table-column prop="createTime" :label="t('transfer.table.createTime')" width="180" />
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchForm = ref({
  uid: '',
  userType: '',
  direction: '',
  dateRange: []
})

const tableData = ref([
  { uid: '100001', userType: '非合伙人', currency: 'USDT', amount: '500.00', direction: '入金', note: '测试入金', createTime: '2025-11-25 10:30:00' },
  { uid: '100002', userType: '合伙人', currency: 'USDT', amount: '1000.00', direction: '出金', note: '测试出金', createTime: '2025-11-25 11:00:00' },
  { uid: '100003', userType: '非合伙人', currency: 'BTC', amount: '0.05', direction: '入金', note: 'BTC入金', createTime: '2025-11-24 15:20:00' },
  { uid: '100004', userType: '合伙人', currency: 'ETH', amount: '2.5', direction: '出金', note: 'ETH出金', createTime: '2025-11-24 16:45:00' },
  { uid: '100005', userType: '非合伙人', currency: 'USDT', amount: '2000.00', direction: '入金', note: '大额入金', createTime: '2025-11-23 09:10:00' },
  { uid: '100006', userType: '合伙人', currency: 'USDT', amount: '300.00', direction: '入金', note: '合伙人入金', createTime: '2025-11-23 14:30:00' },
  { uid: '100007', userType: '非合伙人', currency: 'USDT', amount: '150.00', direction: '出金', note: '小额出金', createTime: '2025-11-22 11:20:00' },
  { uid: '100008', userType: '合伙人', currency: 'USDT', amount: '5000.00', direction: '入金', note: '批量入金', createTime: '2025-11-22 16:00:00' },
])

const userTypeMap = {
  'nonPartner': '非合伙人',
  'partner': '合伙人'
}

const directionMap = {
  'deposit': '入金',
  'withdraw': '出金'
}

const displayData = ref([...tableData.value])

const handleSearch = () => {
  let filtered = [...tableData.value]
  
  if (searchForm.value.uid) {
    filtered = filtered.filter(item => item.uid.includes(searchForm.value.uid))
  }
  
  if (searchForm.value.userType) {
    const userTypeText = userTypeMap[searchForm.value.userType]
    filtered = filtered.filter(item => item.userType === userTypeText)
  }
  
  if (searchForm.value.direction) {
    const directionText = directionMap[searchForm.value.direction]
    filtered = filtered.filter(item => item.direction === directionText)
  }
  
  if (searchForm.value.dateRange && searchForm.value.dateRange.length === 2) {
    const [startDate, endDate] = searchForm.value.dateRange
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.createTime.split(' ')[0])
      return itemDate >= startDate && itemDate <= endDate
    })
  }
  
  displayData.value = filtered
  total.value = filtered.length
  currentPage.value = 1
}
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(8)
const updateTime = ref('2025-11-25 19:02:00')
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

.test {
  margin-left: auto;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  clear: both;
  padding: 10px 0;
  min-height: 32px;
}

:deep(.el-table) {
  font-size: 12px;
}

:deep(.el-table__empty-text) {
  font-size: 14px;
}
</style>
