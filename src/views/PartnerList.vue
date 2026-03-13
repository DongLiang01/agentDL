<!--
 Copyright © 2026 TinyTrader. All rights reserved.
 Author: Raymond
 This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.uid" :placeholder="t('partnerList.search.uid')" oninput="value=value.replace(/[^\d]/g, '')" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.note" :placeholder="t('partnerList.search.note')" />
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="searchForm.feeRatio" :placeholder="t('partnerList.search.feeRatio')" :min="0" :max="100" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" :placeholder="t('partnerList.search.userType')" clearable style="width: 130px">
          <el-option :label="t('partnerList.type.client')" value="client" />
          <el-option :label="t('partnerList.type.agent')" value="agent" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ t('partnerList.button.search') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain><i class="el-icon-d-arrow-right"></i></el-button>
      </el-form-item>
    </el-form>

    <el-table :key="tableKey" :data="tableData" style="width: 100%" border min-height="300">
      <el-table-column prop="uid" :label="t('partnerList.table.uid')" width="100" />
      <el-table-column prop="partnerIdentity" :label="t('partnerList.table.partnerIdentity')" width="110" />
      <el-table-column prop="futuresRebateRatio" :label="t('partnerList.table.futuresRebateRatio')" width="110" />
      <el-table-column prop="totalFuturesRebate" :label="t('partnerList.table.totalFuturesRebate')" width="145">
        <template #header>
          <span>{{ t('partnerList.table.totalFuturesRebate') }}</span>
          <el-tooltip :content="t('partnerList.table.totalFuturesRebate')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="totalFuturesServiceCharge" :label="t('partnerList.table.totalFuturesServiceCharge')" width="195">
        <template #header>
          <span>{{ t('partnerList.table.totalFuturesServiceCharge') }}</span>
          <el-tooltip :content="t('partnerList.table.totalFuturesServiceCharge')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="spotRebateRatio" :label="t('partnerList.table.spotRebateRatio')" width="100" />
      <el-table-column prop="totalSpotRebate" :label="t('partnerList.table.totalSpotRebate')" width="145">
        <template #header>
          <span>{{ t('partnerList.table.totalSpotRebate') }}</span>
          <el-tooltip :content="t('partnerList.table.totalSpotRebate')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="totalSpotServiceCharge" :label="t('partnerList.table.totalSpotServiceCharge')" width="195">
        <template #header>
          <span>{{ t('partnerList.table.totalSpotServiceCharge') }}</span>
          <el-tooltip :content="t('partnerList.table.totalSpotServiceCharge')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="etfRebateRatio" :label="t('partnerList.table.etfRebateRatio')" width="100" />
      <el-table-column prop="totalEtfRebate" :label="t('partnerList.table.totalEtfRebate')" width="145">
        <template #header>
          <span>{{ t('partnerList.table.totalEtfRebate') }}</span>
          <el-tooltip :content="t('partnerList.table.totalEtfRebate')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="totalEtfServiceCharge" :label="t('partnerList.table.totalEtfServiceCharge')" width="195">
        <template #header>
          <span>{{ t('partnerList.table.totalEtfServiceCharge') }}</span>
          <el-tooltip :content="t('partnerList.table.totalEtfServiceCharge')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="currencyName" :label="t('partnerList.table.currencyName')" width="110" />
      <el-table-column prop="teamTotalDeposit" :label="t('partnerList.table.teamTotalDeposit')" width="150">
        <template #header>
          <span>{{ t('partnerList.table.teamTotalDeposit') }}</span>
          <el-tooltip :content="t('partnerList.table.teamTotalDeposit')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="teamTotalWithdrawal" :label="t('partnerList.table.teamTotalWithdrawal')" width="170">
        <template #header>
          <span>{{ t('partnerList.table.teamTotalWithdrawal') }}</span>
          <el-tooltip :content="t('partnerList.table.teamTotalWithdrawal')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="teamTotalNumber" :label="t('partnerList.table.teamTotalNumber')" width="170">
        <template #header>
          <span>{{ t('partnerList.table.teamTotalNumber') }}</span>
          <el-tooltip :content="t('partnerList.table.teamTotalNumber')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="teamTotalDepositUsers" :label="t('partnerList.table.teamTotalDepositUsers')" width="185" align="center">
        <template #header>
          <span>{{ t('partnerList.table.teamTotalDepositUsers') }}</span>
          <el-tooltip :content="t('partnerList.table.teamTotalDepositUsers')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="firstDepositTime" :label="t('partnerList.table.firstDepositTime')" width="185" align="center">
        <template #header>
          <span>{{ t('partnerList.table.firstDepositTime') }}</span>
          <el-tooltip :content="t('partnerList.table.firstDepositTime')">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="note" :label="t('partnerList.table.note')" width="100" />
      <el-table-column prop="loginName" :label="t('partnerList.table.loginName')" width="100" />
      <el-table-column prop="mobileNumber" :label="t('partnerList.table.mobileNumber')" width="115" />
      <el-table-column prop="email" :label="t('partnerList.table.email')" width="160" />
      <el-table-column prop="registrationTime" :label="t('partnerList.table.registrationTime')" width="175" />
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
import { ElPagination } from 'element-plus'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()

const { theme, subscribe } = useTheme()
const tableKey = ref(theme.value)

const searchForm = ref({
  uid: '',
  note: '',
  feeRatio: undefined,
  userType: 'client'
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(1)

const handleCurrentChange = (val) => {
  currentPage.value = val
}

const handleSizeChange = (val) => {
  pageSize.value = val
}

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

:deep(.el-icon-question) {
  margin-left: 5px;
  cursor: pointer;
  color: var(--theme-text-secondary);
}

:deep(.el-tooltip) {
  white-space: pre-wrap;
}
</style>
