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
  background: rgb(28, 30, 40);
  position: relative;
  display: flex;
  align-items: center;
}

.lang-selector {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.lang-link {
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
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
  width: 400px;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
}

.main .right .first_information {
  margin-top: 40px;
  font-size: 24px;
  font-weight: 500;
  color: rgb(28, 29, 40);
  display: flex;
  justify-content: center;
}

.main .right .tt {
  display: flex;
  font-size: 12px;
  font-weight: 400;
  color: rgb(28, 29, 40);
  margin-bottom: 7px;
}

.main .right input {
  border-radius: 6px;
  border: 1px solid rgba(134, 136, 156, 0.1);
  font-size: 14px;
  font-family: DINPro-Medium, DINPro;
  font-weight: 500;
  color: rgb(28, 29, 40);
  line-height: 44px;
  height: 44px;
  padding-left: 10px;
  width: 100%;
  outline: none;
  box-sizing: border-box;
}

.main .right .input1 {
  margin-bottom: 29px;
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
  right: 10px;
  cursor: pointer;
  color: #999;
}

.main .right .password .passwordType:hover {
  color: #666;
}

.main .right .errtip {
  font-size: 12px;
  font-weight: 400;
  color: rgb(230, 82, 97);
  margin-top: 6px;
  margin-bottom: 8px;
}

.main .right .btn {
  cursor: pointer;
  user-select: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  height: 45px;
  background: linear-gradient(135deg, #4c70f4 0%, #3a5ce0 100%);
  border: none;
  width: 100%;
}

.main .right .btn:hover {
  background: linear-gradient(135deg, #5a7ff5 0%, #4869e2 100%);
}

.main .right .btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.main .right .bottomtip {
  display: flex;
  justify-content: space-between;
  margin-bottom: 73px;
}

.main .right .bottomtip .check {
  font-size: 14px;
  font-family: PingFangSC-Regular, "PingFang SC";
  font-weight: 400;
  color: rgb(133, 136, 156);
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.main .right .bottomtip .check .el-checkbox__input {
  margin-right: 8px;
}

.main .right .bottomtip .check .el-checkbox__inner {
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  display: inline-block;
  position: relative;
}

.main .right .bottomtip .righttip {
  font-size: 12px;
  font-family: PingFangSC-Regular, "PingFang SC";
  font-weight: 400;
  color: rgb(133, 136, 156);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.main .right .bottomtip .righttip:hover {
  color: #4c70f4;
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
