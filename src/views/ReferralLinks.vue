<!--
 Copyright © 2026 TinyTrader. All rights reserved.
 Author: Raymond
 This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <div class="url">
      <div>
        <b>{{ t('referralLinks.referralLink') }}</b>
      </div>
      <div>
        <el-link type="primary" :disabled="true">
          {{ t('referralLinks.directUsers') }}: https://www.coinw.com/en_US/register?r=26345755
        </el-link>
        <el-button style="margin-left: 20px;" @click="copyLink">{{ t('referralLinks.copyLink') }}</el-button>
      </div>
    </div>

    <div>
      <div class="codeHeader">
        <span>{{ t('referralLinks.partnerLinks') }}:</span>
        <el-button>{{ t('referralLinks.createNewLink') }}</el-button>
      </div>

      <el-table :key="tableKey" :data="tableData" style="width: 100%" border min-height="300">
        <el-table-column prop="referralCode" :label="t('referralLinks.table.referralCode')" width="132" />
        <el-table-column :label="t('referralLinks.table.spotCommission') + '/' + t('referralLinks.table.inferiorSpotCommission')" width="129" align="center">
          <template #default="scope">
            <span>{{ scope.row.spotCommission }}/{{ scope.row.inferiorSpotCommission }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="t('referralLinks.table.etfCommission') + '/' + t('referralLinks.table.inferiorEtfCommission')" width="129" align="center">
          <template #default="scope">
            <span>{{ scope.row.etfCommission }}/{{ scope.row.inferiorEtfCommission }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="t('referralLinks.table.futuresCommission') + '/' + t('referralLinks.table.inferiorFuturesCommission')" width="129" align="center">
          <template #default="scope">
            <span>{{ scope.row.futuresCommission }}/{{ scope.row.inferiorFuturesCommission }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="t('referralLinks.table.apiCommission') + '/' + t('referralLinks.table.inferiorApiCommission')" width="129" align="center">
          <template #default="scope">
            <span>{{ scope.row.apiCommission }}/{{ scope.row.inferiorApiCommission }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="numberOfInvites" :label="t('referralLinks.table.numberOfInvites')" width="129" align="center" />
        <el-table-column prop="note" :label="t('referralLinks.table.note')" width="129" align="center" />
        <el-table-column :label="t('referralLinks.table.operate')" width="250" align="center">
          <template #default="scope">
            <el-button size="small" @click="handleEditMemo(scope.row)">{{ t('referralLinks.button.editMemo') }}</el-button>
            <el-button size="small" @click="handleViewReferralList(scope.row)">{{ t('referralLinks.button.viewReferralList') }}</el-button>
          </template>
        </el-table-column>
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

    <el-dialog v-model="referralListDialogVisible" :title="t('referralLinks.dialog.referralList')" width="700px">
      <div>Referral list content</div>
    </el-dialog>

    <el-dialog v-model="createNewLinkDialogVisible" :title="t('referralLinks.dialog.createNewLink')" width="750px">
      <el-form :model="linkForm" label-width="150px">
        <el-form-item :label="t('referralLinks.dialog.spotCommission')">
          <el-input-number v-model="linkForm.spotCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.inferiorSpotCommission')">
          <el-input-number v-model="linkForm.inferiorSpotCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.etfCommission')">
          <el-input-number v-model="linkForm.etfCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.inferiorEtfCommission')">
          <el-input-number v-model="linkForm.inferiorEtfCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.futuresCommission')">
          <el-input-number v-model="linkForm.futuresCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.inferiorFuturesCommission')">
          <el-input-number v-model="linkForm.inferiorFuturesCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.apiCommission')">
          <el-input-number v-model="linkForm.apiCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.inferiorApiCommission')">
          <el-input-number v-model="linkForm.inferiorApiCommission" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('referralLinks.dialog.note')">
          <el-input v-model="linkForm.note" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createNewLinkDialogVisible = false">{{ t('referralLinks.button.cancel') }}</el-button>
        <el-button type="primary" @click="handleCreateLink">{{ t('referralLinks.button.ok') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="editMemoDialogVisible" :title="t('referralLinks.dialog.editMemo')" width="500px">
      <el-form :model="memoForm" label-width="100px">
        <el-form-item :label="t('referralLinks.dialog.memo')">
          <el-input v-model="memoForm.memo" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editMemoDialogVisible = false">{{ t('referralLinks.button.cancel') }}</el-button>
        <el-button type="primary" @click="handleSaveMemo">{{ t('referralLinks.button.ok') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="partnerReferralLinkDialogVisible" :title="t('referralLinks.dialog.partnerReferralLink')" width="700px">
      <div>Partner referral link content</div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()

const { theme, subscribe } = useTheme()
const tableKey = ref(theme.value)

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(1)

const referralListDialogVisible = ref(false)
const createNewLinkDialogVisible = ref(false)
const editMemoDialogVisible = ref(false)
const partnerReferralLinkDialogVisible = ref(false)

const linkForm = ref({
  spotCommission: 0,
  inferiorSpotCommission: 0,
  etfCommission: 0,
  inferiorEtfCommission: 0,
  futuresCommission: 0,
  inferiorFuturesCommission: 0,
  apiCommission: 0,
  inferiorApiCommission: 0,
  note: ''
})

const memoForm = ref({
  memo: ''
})

const copyLink = () => {
  const link = 'https://www.coinw.com/en_US/register?r=26345755'
  navigator.clipboard.writeText(link).then(() => {
    ElMessage({
      message: t('referralLinks.message.copySuccess'),
      type: 'success',
      showClose: true,
      duration: 3000,
      customClass: 'copy-success-message'
    })
  }).catch(() => {
    ElMessage({
      message: t('referralLinks.message.copyFailed'),
      type: 'error',
      showClose: true,
      duration: 3000
    })
  })
}

const handleEditMemo = (row) => {
  memoForm.value.memo = row.note
  editMemoDialogVisible.value = true
}

const handleViewReferralList = (row) => {
  referralListDialogVisible.value = true
}

const handleCreateLink = () => {
  console.log('Create link:', linkForm.value)
  createNewLinkDialogVisible.value = false
}

const handleSaveMemo = () => {
  console.log('Save memo:', memoForm.value)
  editMemoDialogVisible.value = false
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

.url {
  margin-bottom: 20px;
}

.url > div {
  margin-bottom: 10px;
}

.url b {
  font-size: 16px;
}

.codeHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 0;
}

.codeHeader span {
  font-weight: 600;
  font-size: 14px;
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

:deep(.el-message) {
  top: 20px !important;
}
</style>
