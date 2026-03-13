<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form class="el-form demo-form-inline el-form--inline">
      <el-form-item class="el-form-item el-form-item--mini">
        <div class="el-form-item__content">
          <el-select v-model="searchForm.transactionType" class="el-select el-select--mini" :placeholder="t('rebateRecords.pleaseSelect')" clearable style="width: 130px">
            <el-option>
              <el-tree
                :data="transactionTypeTree"
                :props="treeProps"
                node-key="value"
                :highlight-current="true"
                :default-expanded-keys="['futures']"
                :current-node-key="searchForm.transactionType"
                @node-click="handleNodeClick"
              />
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item class="el-form-item el-form-item--mini">
        <div class="el-form-item__content">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="To"
            :start-placeholder="t('rebateRecords.startDate')"
            :end-placeholder="t('rebateRecords.endDate')"
            class="el-date-editor el-range-editor el-input__inner el-date-editor--daterange el-range-editor--mini"
            clearable
          />
        </div>
      </el-form-item>
      <el-form-item class="el-form-item el-form-item--mini">
        <div class="el-form-item__content">
          <el-button type="primary" size="mini" @click="selectYesterday">{{ t('rebateRecords.yesterday') }}</el-button>
        </div>
      </el-form-item>
      <el-form-item class="el-form-item el-form-item--mini">
        <div class="el-form-item__content">
          <el-button type="primary" size="mini" @click="selectToday">{{ t('rebateRecords.today') }}</el-button>
        </div>
      </el-form-item>
      <el-form-item class="el-form-item el-form-item--mini">
        <div class="el-form-item__content">
          <el-button type="primary" size="mini" @click="handleSearch">{{ t('rebateRecords.search') }}</el-button>
        </div>
      </el-form-item>
      <el-form-item class="el-form-item el-form-item--mini" style="float: right;">
        <div class="el-form-item__content">
          <span>{{ t('rebateRecords.distributionNote') }}</span>
        </div>
      </el-form-item>
    </el-form>

    <el-table
      :key="tableKey"
      :data="tableData"
      class="el-table el-table--fit el-table--enable-row-hover"
      style="width: 100%;"
      border
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="currency" :label="t('rebateRecords.table.currency')" width="180" />
      <el-table-column prop="estimatedRebate" :label="t('rebateRecords.table.estimatedRebate')" width="180" align="right">
        <template #default="{ row }">
          <span class="rebate-text">{{ row.estimatedRebate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="actualRebate" :label="t('rebateRecords.table.actualRebate')" width="180" align="right">
        <template #default="{ row }">
          <span class="actual-rebate-text">{{ row.actualRebate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transactionType" :label="t('rebateRecords.table.transactionType')" width="180" />
      <el-table-column prop="arrivalTime" :label="t('rebateRecords.table.arrivalTime')" width="180" />
      <el-table-column prop="issueStatus" :label="t('rebateRecords.table.issueStatus')" width="180">
        <template #default="{ row }">
          <el-tag v-if="row.issueStatus === 'Issued'" type="success">{{ t('rebateRecords.table.issued') }}</el-tag>
          <el-tag v-else-if="row.issueStatus === 'Pending'" type="warning">{{ t('rebateRecords.table.pending') }}</el-tag>
          <el-tag v-else type="info">{{ row.issueStatus }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-button-group pagination" v-if="false">
      <el-button type="primary" size="mini" disabled>
        <el-icon><ArrowLeft /></el-icon>
        <span>{{ t('rebateRecords.back') }}</span>
      </el-button>
      <el-button type="primary" size="mini" disabled>
        <span>{{ t('rebateRecords.next') }}</span>
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()

const { theme, subscribe } = useTheme()
const tableKey = ref(theme.value)

const searchForm = reactive({
  transactionType: 'non-api',
  dateRange: []
})

const transactionTypeTree = computed(() => [
  {
    label: t('rebateRecords.transactionType.futures'),
    value: 'futures',
    children: [
      { label: t('rebateRecords.transactionType.nonApi'), value: 'non-api' },
      { label: t('rebateRecords.transactionType.api'), value: 'api' }
    ]
  },
  {
    label: t('rebateRecords.transactionType.spot'),
    value: 'spot'
  },
  {
    label: t('rebateRecords.transactionType.etf'),
    value: 'etf'
  }
])

const treeProps = {
  children: 'children',
  label: 'label'
}

const tableData = ref([])

const handleNodeClick = (data) => {
  if (!data.children || data.children.length === 0) {
    searchForm.transactionType = data.value
  }
}

const selectYesterday = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const startOfDay = new Date(yesterday.setHours(0, 0, 0, 0))
  const endOfDay = new Date(yesterday.setHours(23, 59, 59, 999))
  searchForm.dateRange = [startOfDay, endOfDay]
}

const selectToday = () => {
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0))
  const endOfDay = new Date(today.setHours(23, 59, 59, 999))
  searchForm.dateRange = [startOfDay, endOfDay]
}

const handleSearch = () => {
  console.log('Search:', searchForm)
}

onMounted(() => {
  subscribe((newTheme) => {
    tableKey.value = newTheme
  })
})
</script>

<style scoped>
.content {
  padding: 0;
  background: var(--theme-bg-card);
}

.content form {
  text-align: left;
}

.content form .el-input,
.content form .el-input-number {
  width: 130px;
  position: relative;
}

.content form .el-input-number .el-input__inner,
.content form .el-input .el-input__inner {
  text-align: left;
  font-family: inherit;
}

.content table th {
  background: var(--theme-bg-hover);
}

.content table .cell {
  font-size: 12px;
  font-family: inherit;
  font-weight: 400;
  color: var(--theme-text-secondary);
  line-height: 18px;
}

.rebate-text {
  color: var(--el-color-success);
  font-weight: 600;
}

.actual-rebate-text {
  color: var(--brand-primary);
  font-weight: 600;
}

.pagination {
  margin-top: 20px;
  display: flex;
}

:deep(.el-select-dropdown__item .el-tree) {
  padding: 0;
}

:deep(.el-select-dropdown__item) {
  height: auto;
  padding: 0;
}

:deep(.el-tree-node__label) {
  font-weight: 400;
}

:deep(.el-tree .is-current .el-tree-node__label) {
  color: var(--theme-primary);
  font-weight: 700;
}

:deep(.el-tree .is-current .el-tree-node__children .el-tree-node__label) {
  color: var(--theme-text-secondary);
  font-weight: 400;
}
</style>
