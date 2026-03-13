<!--
 Copyright © 2026 TinyTrader. All rights reserved.
 Author: Raymond
 This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.uid" :placeholder="t('searchAllOrders.search.uid')" oninput="value=value.replace(/[^\d]/g, '')" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.orderId" :placeholder="t('searchAllOrders.search.orderId')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" :placeholder="t('searchAllOrders.search.userType')" clearable style="width: 130px">
          <el-option :label="t('searchAllOrders.userType.currentUser')" value="current" />
          <el-option :label="t('searchAllOrders.userType.subordinates')" value="subordinates" />
          <el-option :label="t('searchAllOrders.userType.allUsers')" value="all" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.accountType" :placeholder="t('searchAllOrders.search.accountType')" clearable style="width: 130px">
          <el-option :label="t('searchAllOrders.accountType.main')" value="main" />
          <el-option :label="t('searchAllOrders.accountType.sub')" value="sub" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.currency" :placeholder="t('searchAllOrders.search.currency')" filterable clearable style="width: 130px">
          <el-option :label="t('searchAllOrders.accountType.all')" value="" />
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
          <el-option label="FIL" value="FIL" />
          <el-option label="NEAR" value="NEAR" />
          <el-option label="APT" value="APT" />
          <el-option label="ARB" value="ARB" />
          <el-option label="OP" value="OP" />
          <el-option label="FTM" value="FTM" />
          <el-option label="AAVE" value="AAVE" />
          <el-option label="MKR" value="MKR" />
          <el-option label="GRT" value="GRT" />
          <el-option label="SAND" value="SAND" />
          <el-option label="MANA" value="MANA" />
          <el-option label="AXS" value="AXS" />
          <el-option label="THETA" value="THETA" />
          <el-option label="XTZ" value="XTZ" />
          <el-option label="EOS" value="EOS" />
          <el-option label="FLOW" value="FLOW" />
          <el-option label="CHZ" value="CHZ" />
          <el-option label="CRV" value="CRV" />
          <el-option label="LDO" value="LDO" />
          <el-option label="APE" value="APE" />
          <el-option label="RNDR" value="RNDR" />
          <el-option label="INJ" value="INJ" />
          <el-option label="IMX" value="IMX" />
          <el-option label="OP" value="OP" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.direction" :placeholder="t('searchAllOrders.search.direction')" clearable style="width: 130px">
          <el-option :label="t('searchAllOrders.direction.openLong')" value="open_long" />
          <el-option :label="t('searchAllOrders.direction.openShort')" value="open_short" />
          <el-option :label="t('searchAllOrders.direction.closeLong')" value="close_long" />
          <el-option :label="t('searchAllOrders.direction.closeShort')" value="close_short" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.status" :placeholder="t('searchAllOrders.search.status')" clearable style="width: 130px">
          <el-option :label="t('searchAllOrders.status.closed')" value="closed" />
          <el-option :label="t('searchAllOrders.status.canceled')" value="canceled" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="datetimerange"
          :range-separator="t('searchAllOrders.search.dateRange')"
          :start-placeholder="t('searchAllOrders.search.startDate')"
          :end-placeholder="t('searchAllOrders.search.endDate')"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ t('searchAllOrders.button.search') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table :key="tableKey" :data="tableData" style="width: 100%" border min-height="300">
      <el-table-column prop="no" :label="t('searchAllOrders.table.no')" width="50" />
      <el-table-column prop="uid" :label="t('searchAllOrders.table.uid')" width="80" />
      <el-table-column prop="accountType" :label="t('searchAllOrders.table.accountType')" width="80" />
      <el-table-column prop="mainAccount" :label="t('searchAllOrders.table.mainAccount')" width="80" />
      <el-table-column prop="currency" :label="t('searchAllOrders.table.currency')" width="80" />
      <el-table-column prop="margin" :label="t('searchAllOrders.table.margin')" width="80" />
      <el-table-column prop="leverage" :label="t('searchAllOrders.table.leverage')" width="80" />
      <el-table-column prop="currency2" :label="t('searchAllOrders.table.currency2')" width="80" />
      <el-table-column prop="openPrice" :label="t('searchAllOrders.table.openPrice')" width="80" />
      <el-table-column prop="dealPrice" :label="t('searchAllOrders.table.dealPrice')" width="80" />
      <el-table-column prop="averagePrice" :label="t('searchAllOrders.table.averagePrice')" width="80" />
      <el-table-column prop="openQty" :label="t('searchAllOrders.table.openQty')" width="150" />
      <el-table-column prop="dealQty" :label="t('searchAllOrders.table.dealQty')" width="150" />
      <el-table-column prop="direction" :label="t('searchAllOrders.table.direction')" width="80" />
      <el-table-column prop="status" :label="t('searchAllOrders.table.status')" width="80" />
      <el-table-column prop="type" :label="t('searchAllOrders.table.type')" width="80" />
      <el-table-column prop="orderId" :label="t('searchAllOrders.table.orderId')" width="80" />
      <el-table-column prop="orderNo" :label="t('searchAllOrders.table.orderNo')" width="80" />
      <el-table-column prop="openTime" :label="t('searchAllOrders.table.openTime')" width="80" />
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
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()

const { theme, subscribe } = useTheme()
const tableKey = ref(theme.value)

const searchForm = ref({
  uid: '',
  orderId: '',
  userType: 'current',
  accountType: 'main',
  currency: '',
  direction: '',
  status: '',
  dateRange: []
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(1)

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

:deep(.el-table) {
  font-size: 12px;
}

:deep(.el-table__empty-text) {
  font-size: 14px;
}
</style>
