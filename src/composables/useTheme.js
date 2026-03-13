/*
 * Copyright © 2026 TinyTrader. All rights reserved.
 * Author: Raymond
 * This software is proprietary and confidential information of TinyTrader.
 */

import { ref, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'teamhub-theme'
const ALLOWED_THEMES = ['light', 'dark']
const DEFAULT_THEME = 'dark'

function validateTheme(value) {
  return ALLOWED_THEMES.includes(value) ? value : DEFAULT_THEME
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return validateTheme(stored)
  } catch (e) {
    return DEFAULT_THEME
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch (e) {
    console.warn('Failed to save theme to localStorage:', e)
  }
}

function applyThemeToDOM(theme) {
  const html = document.documentElement
  if (theme === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

export function useTheme() {
  const theme = ref(DEFAULT_THEME)
  const listeners = ref([])

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyThemeToDOM(theme.value)
    setStoredTheme(theme.value)
    listeners.value.forEach(fn => fn(theme.value))
  }

  const setTheme = (newTheme) => {
    theme.value = validateTheme(newTheme)
    applyThemeToDOM(theme.value)
    setStoredTheme(theme.value)
    listeners.value.forEach(fn => fn(theme.value))
  }

  const subscribe = (fn) => {
    listeners.value.push(fn)
    return () => {
      listeners.value = listeners.value.filter(f => f !== fn)
    }
  }

  const handleStorageChange = (event) => {
    if (event.key === STORAGE_KEY && event.newValue !== null) {
      const newTheme = validateTheme(event.newValue)
      if (newTheme !== theme.value) {
        theme.value = newTheme
        applyThemeToDOM(theme.value)
        listeners.value.forEach(fn => fn(theme.value))
      }
    }
  }

  onMounted(() => {
    theme.value = getStoredTheme()
    applyThemeToDOM(theme.value)

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && !ALLOWED_THEMES.includes(stored)) {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (e) {
      // Ignore cleanup errors
    }

    window.addEventListener('storage', handleStorageChange)
  })

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange)
  })

  return {
    theme,
    toggleTheme,
    setTheme,
    subscribe
  }
}
