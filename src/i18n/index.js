/*
 * Copyright © 2026 TinyTrader. All rights reserved.
 * Author: Raymond
 * This software is proprietary and confidential information of TinyTrader.
 */

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'
import zhTW from './locales/zh-TW.json'
import ko from './locales/ko.json'
import tr from './locales/tr.json'
import vi from './locales/vi.json'
import ru from './locales/ru.json'
import pt from './locales/pt.json'
import ja from './locales/ja.json'
import uk from './locales/uk.json'
import ar from './locales/ar.json'

const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    ko,
    tr,
    vi,
    ru,
    pt,
    ja,
    uk,
    ar
  }
})

export default i18n
