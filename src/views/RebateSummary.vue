<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="rebate-summary router">
    <div class="tag">
      <el-row :gutter="20">
        <el-col :span="24" :xs="24" :sm="12" :lg="8">
          <div class="box">
            <div class="describe">
              {{ t('rebateSummary.myRebate') }}（USDT）
              <el-tooltip content="" placement="top">
                <el-icon class="el-tooltip el-icon-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <div class="box">
            <div class="describe">
              {{ t('rebateSummary.selfReturnRebate') }}（USDT）
              <el-tooltip content="" placement="top">
                <el-icon class="el-tooltip el-icon-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
        </el-col>
        <el-col :span="24" :xs="24" :sm="12" :lg="8">
          <div class="box">
            <div class="describe">
              {{ t('rebateSummary.clientTransactionFee') }}（USDT）
              <el-tooltip content="" placement="top">
                <el-icon class="el-tooltip el-icon-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <div class="box">
            <div class="describe">
              {{ t('rebateSummary.clientContributionRebate') }}（USDT）
              <el-tooltip content="" placement="top">
                <el-icon class="el-tooltip el-icon-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
        </el-col>
        <el-col :span="24" :xs="24" :sm="12" :lg="8">
          <div class="box">
            <div class="describe">
              {{ t('rebateSummary.totalTransactionFee') }}（USDT）
              <el-tooltip content="" placement="top">
                <el-icon class="el-tooltip el-icon-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
          <div class="box">
            <div class="describe">
              {{ t('rebateSummary.totalRebate') }}（USDT）
              <el-tooltip content="" placement="top">
                <el-icon class="el-tooltip el-icon-question"><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
            <div class="value">0</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="summary">
      <el-form class="el-form demo-form-inline el-form--inline">
        <el-form-item class="el-form-item el-form-item--mini">
          <div class="el-form-item__content">
            <el-input v-model="searchForm.uid" class="el-input el-input--mini" :placeholder="t('rebateSummary.uid')" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item class="el-form-item el-form-item--mini">
          <div class="el-form-item__content">
            <el-input v-model="searchForm.note" class="el-input el-input--mini" :placeholder="t('rebateSummary.note')" autocomplete="off" />
          </div>
        </el-form-item>
        <el-form-item class="el-form-item el-form-item--mini">
          <div class="el-form-item__content">
            <el-select v-model="searchForm.userType" class="el-select el-select--mini" :placeholder="t('rebateSummary.userType')">
              <el-option :label="t('rebateSummary.client')" value="client" />
              <el-option :label="t('rebateSummary.agent')" value="agent" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="el-form-item el-form-item--mini">
          <div class="el-form-item__content">
            <el-select v-model="searchForm.currency" class="el-select el-select--mini" :placeholder="t('rebateSummary.currency')">
              <el-option :label="t('rebateSummary.allCurrency')" value="" />
              <el-option label="USDT" value="USDT" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="el-form-item el-form-item--mini">
          <div class="el-form-item__content">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="~"
              :start-placeholder="t('rebateSummary.start')"
              :end-placeholder="t('rebateSummary.end')"
              class="el-input el-input--mini"
            />
          </div>
        </el-form-item>
        <el-form-item class="el-form-item el-form-item--mini">
          <div class="el-form-item__content">
            <el-button type="primary" size="small" @click="handleSearch">{{ t('rebateSummary.search') }}</el-button>
            <el-button size="small" @click="handleReset">{{ t('rebateSummary.reset') }}</el-button>
          </div>
        </el-form-item>
      </el-form>

      <div class="table-container">
        <el-table :data="tableData" class="el-table" border stripe style="width: 100%;">
          <el-table-column prop="date" :label="t('rebateSummary.table.date')" width="120" />
          <el-table-column prop="uid" :label="t('rebateSummary.table.uid')" width="120" />
          <el-table-column prop="time" :label="t('rebateSummary.table.time')" width="100" />
          <el-table-column prop="symbol" :label="t('rebateSummary.table.symbol')" width="120" />
          <el-table-column prop="type" :label="t('rebateSummary.table.type')" width="100" />
          <el-table-column prop="side" :label="t('rebateSummary.table.side')" width="80" />
          <el-table-column prop="volume" :label="t('rebateSummary.table.volume')" width="140" align="right" />
          <el-table-column prop="price" :label="t('rebateSummary.table.price')" width="140" align="right" />
          <el-table-column prop="fee" :label="t('rebateSummary.table.fee')" width="120" align="right">
            <template #default="{ row }">
              <span class="fee-text">{{ row.fee }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="rebate" :label="t('rebateSummary.table.rebate')" width="120" align="right">
            <template #default="{ row }">
              <span class="rebate-text">{{ row.rebate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="currency" :label="t('rebateSummary.table.currency')" width="100" />
          <el-table-column prop="note" :label="t('rebateSummary.table.note')" min-width="120" show-overflow-tooltip />
        </el-table>

        <div class="pagination">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { QuestionFilled } from '@element-plus/icons-vue'

const { t } = useI18n()

const searchForm = reactive({
  uid: '',
  note: '',
  userType: '',
  currency: '',
  dateRange: []
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0
})

const tableData = ref([])

const handleSearch = () => {
  console.log('Search:', searchForm)
}

const handleReset = () => {
  searchForm.uid = ''
  searchForm.note = ''
  searchForm.userType = ''
  searchForm.currency = ''
  searchForm.dateRange = []
}

const handleSizeChange = (size) => {
  pagination.pageSize = size
}

const handleCurrentChange = (page) => {
  pagination.currentPage = page
}
</script>

<style scoped>
.router {
  text-align: left;
}

.tag {
  margin-bottom: 0;
}

.tag ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  color: #fff;
}

.box:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.box .describe {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.box .value {
  font-size: 28px;
  font-weight: 700;
}

.summary {
  background: #fff;
  border-radius: 8px;
  padding: 0;
}

.fee-text {
  color: #f56c6c;
}

.rebate-text {
  color: #67c23a;
  font-weight: 600;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  font-weight: 600;
}

:deep(.demo-form-inline) {
  margin-bottom: 20px;
  flex-wrap: wrap;
}
</style>
