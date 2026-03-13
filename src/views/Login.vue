<!--
Copyright © 2026 TinyTrader. All rights reserved.
Author: Raymond
This software is proprietary and confidential information of TinyTrader.
-->

<template>
  <div class="container">
    <div class="lang-selector">
      <el-dropdown @command="handleLanguageChange">
        <span class="lang-link">
          {{ currentLanguage }}
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="kr">한국어</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="tr">Türkçe</el-dropdown-item>
            <el-dropdown-item command="vi">Tiếng Việt</el-dropdown-item>
            <el-dropdown-item command="ru">Русский</el-dropdown-item>
            <el-dropdown-item command="tw">繁體中文</el-dropdown-item>
            <el-dropdown-item command="pt">Português</el-dropdown-item>
            <el-dropdown-item command="ja">日本語</el-dropdown-item>
            <el-dropdown-item command="uk">Українська</el-dropdown-item>
            <el-dropdown-item command="ar">العربية</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="main">
      <div class="left">
        <img src="https://www.teamhubthe.com/assets/img/loginbg.2b200401.png" class="loginbg" alt="Login Background">
      </div>
      <div class="right">
        <div class="first_information">{{ t('login.title') }}</div>
        <span class="tt">{{ t('login.username') }}</span>
        <input
          v-model="form.username"
          maxlength="30"
          class="input1"
          :placeholder="t('login.usernamePlaceholder')"
          @keyup.enter="handleLogin"
        >
        <span class="tt">{{ t('login.password') }}</span>
        <div class="password">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            maxlength="30"
            class="input2"
            :placeholder="t('login.passwordPlaceholder')"
            @keyup.enter="handleLogin"
          >
          <i class="iconfont passwordType" :class="showPassword ? 'icon-xianshi' : 'icon-yincangbeifen'" @click="showPassword = !showPassword"></i>
        </div>
        <p v-if="errorTip" class="errtip">{{ errorTip }}</p>
        <button type="button" class="el-button btn el-button--primary" :disabled="loading" @click="handleLogin">
          <span v-if="loading">{{ t('login.loggingIn') }}</span>
          <span v-else>{{ t('login.loginBtn') }}</span>
        </button>
        <div class="bottomtip">
          <label class="el-checkbox check">
            <span class="el-checkbox__input">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" v-model="form.remember" class="el-checkbox__original">
            </span>
            <span class="el-checkbox__label">{{ t('login.remember') }}</span>
          </label>
          <button type="button" class="el-button righttip el-button--text">
            <span>{{ t('login.forgotPassword') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowDown } from '@element-plus/icons-vue'

const { t, locale } = useI18n()
const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const errorTip = ref('')
const currentLanguage = ref('English')

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const langCodeMap = {
  kr: 'ko',
  en: 'en',
  tr: 'tr',
  vi: 'vi',
  ru: 'ru',
  tw: 'zh-CN',
  pt: 'pt',
  ja: 'ja',
  uk: 'uk',
  ar: 'ar'
}

const langDisplayMap = {
  kr: '한국어',
  en: 'English',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  ru: 'Русский',
  tw: '繁體中文',
  pt: 'Português',
  ja: '日本語',
  uk: 'Українська',
  ar: 'العربية'
}

const handleLanguageChange = (command) => {
  const newLocale = langCodeMap[command] || 'en'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  currentLanguage.value = langDisplayMap[command] || 'English'
}

const handleLogin = async () => {
  errorTip.value = ''

  if (!form.username) {
    errorTip.value = t('login.pleaseEnterAccount')
    return
  }

  if (!form.password) {
    errorTip.value = t('login.pleaseEnterPassword')
    return
  }

  loading.value = true

  setTimeout(() => {
    localStorage.setItem('token', 'mock-token')
    localStorage.setItem('username', form.username)
    ElMessage.success(t('login.loginSuccessful'))
    router.push('/home')
    loading.value = false
  }, 800)
}

onMounted(() => {
  const savedLocale = localStorage.getItem('locale') || 'en'
  const savedLangKey = Object.keys(langCodeMap).find(key => langCodeMap[key] === savedLocale) || 'en'
  currentLanguage.value = langDisplayMap[savedLangKey]
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: var(--theme-bg-main, #0b0c0f);
  position: relative;
  display: flex;
  align-items: center;
}

.lang-selector {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
}

.lang-link {
  cursor: pointer;
  color: var(--theme-text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s ease;
}

.lang-link:hover {
  color: var(--theme-text-primary);
}

.container .main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  max-width: 1024px;
  padding-right: 20px;
  width: 90%;
  margin: 0 auto;
}

.main .left {
  display: block;
}

.main .left .loginbg {
  width: 450px;
}

.main .right {
  width: 420px;
  background: var(--theme-bg-card);
  border-radius: 16px;
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--theme-border);
  box-shadow: var(--box-shadow-lg);
}

.main .right .first_information {
  margin-top: 44px;
  font-size: 24px;
  font-weight: 700;
  color: var(--theme-text-primary);
  display: flex;
  justify-content: center;
  letter-spacing: -0.02em;
}

.main .right .tt {
  display: flex;
  font-size: 13px;
  font-weight: 500;
  color: var(--theme-text-secondary);
  margin-bottom: 8px;
}

.main .right input {
  border-radius: 10px;
  border: 1px solid var(--theme-border);
  font-size: 14px;
  font-family: inherit;
  font-weight: 500;
  color: var(--theme-text-primary);
  background-color: var(--theme-bg-input, var(--theme-bg-card));
  line-height: 48px;
  height: 48px;
  padding-left: 14px;
  width: 100%;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.main .right input:focus {
  border-color: var(--theme-primary);
  box-shadow: 0 0 0 3px rgba(var(--theme-primary-rgb, 32, 129, 226), 0.15);
}

.main .right input::placeholder {
  color: var(--theme-text-muted);
}

.main .right .input1 {
  margin-bottom: 24px;
}

.main .right .input2 {
  margin-bottom: 14px;
  padding-right: 40px;
}

.main .right .password {
  display: flex;
  position: relative;
  align-items: center;
}

.main .right .password .passwordType {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  cursor: pointer;
  color: var(--theme-text-muted);
  transition: color 0.15s ease;
}

.main .right .password .passwordType:hover {
  color: var(--theme-text-primary);
}

.main .right .errtip {
  font-size: 12px;
  font-weight: 500;
  color: var(--el-color-danger);
  margin-top: 6px;
  margin-bottom: 8px;
}

.main .right .btn {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  height: 48px;
  background: var(--theme-primary);
  border: none;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.1s ease;
}

.main .right .btn:hover {
  background: var(--theme-primary-hover);
}

.main .right .btn:active {
  transform: scale(0.98);
}

.main .right .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.main .right .bottomtip {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
}

.main .right .bottomtip .check {
  font-size: 14px;
  font-family: inherit;
  font-weight: 400;
  color: var(--theme-text-muted);
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.main .right .bottomtip .check .el-checkbox__input {
  margin-right: 8px;
}

.main .right .bottomtip .check .el-checkbox__inner {
  width: 16px;
  height: 16px;
  border: 1px solid var(--theme-border);
  border-radius: 4px;
  display: inline-block;
  position: relative;
}

.main .right .bottomtip .righttip {
  font-size: 13px;
  font-family: inherit;
  font-weight: 500;
  color: var(--theme-text-muted);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.15s ease;
}

.main .right .bottomtip .righttip:hover {
  color: var(--theme-primary);
}

@media screen and (max-width: 1024px) {
  .container .main {
    max-width: 900px;
  }
  .main .left .loginbg {
    width: 380px;
  }
}

@media screen and (max-width: 900px) {
  .container .main {
    justify-content: center;
    padding-right: 0;
  }
  .main .left {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .main .right {
    max-width: 360px;
    width: 90%;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
