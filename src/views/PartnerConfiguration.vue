<!--
 Copyright © 2026 TinyTrader. All rights reserved.
 Author: Raymond
 This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="content router">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchForm.uid" :placeholder="t('partnerConfig.search.uid')" oninput="value=value.replace(/[^\d]/g, '')" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.note" :placeholder="t('partnerConfig.search.note')" />
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="searchForm.futuresRebateRatio" :placeholder="t('partnerConfig.search.futuresRebateRatio')" :min="0" :max="100" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" :placeholder="t('partnerConfig.search.type')" clearable style="width: 130px">
          <el-option :label="t('partnerConfig.type.client')" value="client" />
          <el-option :label="t('partnerConfig.type.agent')" value="agent" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ t('partnerConfig.button.search') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" disabled>{{ t('partnerConfig.button.addPartner') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" disabled>{{ t('partnerConfig.button.modifyInfo') }}</el-button>
      </el-form-item>
      <el-form-item class="test">
        <span> {{ t('partnerConfig.updateTime') }}: {{ currentTime }}</span>
      </el-form-item>
    </el-form>

    <el-table :key="tableKey" :data="tableData" style="width: 100%" :height="tableHeight" border>
      <el-table-column type="selection" width="80" />
      <el-table-column prop="uid" :label="t('partnerConfig.table.uid')" width="113" />
      <el-table-column prop="country" :label="t('partnerConfig.table.country')" width="107" />
      <el-table-column prop="futuresRebateRatio" :label="t('partnerConfig.table.futuresRebateRatio')" width="107" />
      <el-table-column prop="apiRebateRatio" :label="t('partnerConfig.table.apiRebateRatio')" width="107" />
      <el-table-column prop="spotRebateRatio" :label="t('partnerConfig.table.spotRebateRatio')" width="107" />
      <el-table-column prop="etfRebateRatio" :label="t('partnerConfig.table.etfRebateRatio')" width="107" />
      <el-table-column prop="note" :label="t('partnerConfig.table.note')" width="107" />
      <el-table-column prop="loginName" :label="t('partnerConfig.table.loginName')" width="107" />
      <el-table-column prop="mobileNumber" :label="t('partnerConfig.table.mobileNumber')" width="107" />
      <el-table-column prop="email" :label="t('partnerConfig.table.email')" width="107" />
    </el-table>

    <el-button-group class="pagination">
      <el-button type="primary" disabled>{{ t('partnerConfig.button.back') }}</el-button>
      <el-button type="primary" disabled>{{ t('partnerConfig.button.next') }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>

    <el-dialog v-model="addPartnerDialogVisible" :title="t('partnerConfig.dialog.addPartner')" width="400px">
      <el-form :model="partnerForm" label-width="120px">
        <el-form-item :label="t('partnerConfig.dialog.uid')">
          <el-input v-model="partnerForm.uid" />
        </el-form-item>
        <el-form-item :label="t('partnerConfig.dialog.type')">
          <el-select v-model="partnerForm.type" :placeholder="t('partnerConfig.search.type')">
            <el-option :label="t('partnerConfig.type.client')" value="client" />
            <el-option :label="t('partnerConfig.type.agent')" value="agent" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('partnerConfig.dialog.futuresRebate')">
          <el-input-number v-model="partnerForm.futuresRebate" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('partnerConfig.dialog.apiRebate')">
          <el-input-number v-model="partnerForm.apiRebate" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('partnerConfig.dialog.spotRebate')">
          <el-input-number v-model="partnerForm.spotRebate" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('partnerConfig.dialog.etfRebate')">
          <el-input-number v-model="partnerForm.etfRebate" :min="0" :max="100" />
        </el-form-item>
        <el-form-item :label="t('partnerConfig.dialog.note')">
          <el-input v-model="partnerForm.note" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addPartnerDialogVisible = false">{{ t('partnerConfig.button.cancel') }}</el-button>
        <el-button type="primary" @click="handleAddPartner">{{ t('partnerConfig.button.ok') }}</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="changePasswordDialogVisible" :title="t('partnerConfig.dialog.changePassword')" width="400px">
      <el-form :model="passwordForm" label-width="120px">
        <el-form-item :label="t('partnerConfig.dialog.newPassword')">
          <el-input v-model="passwordForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item :label="t('partnerConfig.dialog.confirmPassword')">
          <el-input v-model="passwordForm.confirmPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="changePasswordDialogVisible = false">{{ t('partnerConfig.button.cancel') }}</el-button>
        <el-button type="primary" @click="handleChangePassword">{{ t('partnerConfig.button.ok') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()

const { theme, subscribe } = useTheme()
const tableKey = ref(theme.value)

const searchForm = ref({
  uid: '',
  note: '',
  futuresRebateRatio: undefined,
  type: 'client'
})

const tableData = ref([])
const tableHeight = ref(400)
const currentTime = ref('')

const addPartnerDialogVisible = ref(false)
const changePasswordDialogVisible = ref(false)

const partnerForm = ref({
  uid: '',
  type: 'client',
  futuresRebate: 0,
  apiRebate: 0,
  spotRebate: 0,
  etfRebate: 0,
  note: ''
})

const passwordForm = ref({
  newPassword: '',
  confirmPassword: ''
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toISOString().slice(0, 19).replace('T', ' ')
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  window.addEventListener('resize', handleResize)
  handleResize()
  subscribe((newTheme) => {
    tableKey.value = newTheme
  })
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  const windowHeight = window.innerHeight
  tableHeight.value = windowHeight - 350
}

const handleAddPartner = () => {
  console.log('Add partner:', partnerForm.value)
  addPartnerDialogVisible.value = false
}

const handleChangePassword = () => {
  console.log('Change password:', passwordForm.value)
  changePasswordDialogVisible.value = false
}

defineExpose({
  searchForm,
  tableData,
  addPartnerDialogVisible,
  changePasswordDialogVisible
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

.test {
  margin-left: auto;
}

.test span {
  color: var(--theme-text-secondary);
  font-size: 14px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

:deep(.el-table) {
  font-size: 12px;
}

:deep(.el-table__empty-text) {
  font-size: 14px;
}
</style>
