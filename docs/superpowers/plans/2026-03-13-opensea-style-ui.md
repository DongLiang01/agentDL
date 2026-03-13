# OpenSea Style UI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前项目的 UI 风格改为 OpenSea 风格，包含完整的颜色系统、字体、间距、圆角、阴影等

**Architecture:** 修改 CSS 变量文件 themes.css 和全局样式 style.css，采用 OpenSea 的蓝色主调 (#2081e2)、简洁现代设计风格

**Tech Stack:** Vue 3, Element Plus, CSS Variables

---

## 文件结构

- `src/styles/themes.css` - 主题色、背景色、文字色、边框色 CSS 变量
- `src/style.css` - 全局样式、字体、基础样式
- `src/layout/MainLayout.vue` - 布局组件样式调整

---

## Chunk 1: 更新 themes.css 颜色系统

**Files:**
- Modify: `src/styles/themes.css:1-400`

- [ ] **Step 1: 备份并重写 Light 主题变量**

将以下变量更新为 OpenSea 风格：

```css
:root {
  /* OpenSea Blue 主色调 */
  --theme-primary: #2081e2;
  --theme-primary-hover: #1868b7;
  --theme-primary-light: #e8f4fd;
  
  /* 背景色 */
  --theme-bg-sidebar: #f8f9fa;
  --theme-bg-header: #ffffff;
  --theme-bg-main: #f3f4f6;
  --theme-bg-card: #ffffff;
  
  /* 文字色 */
  --theme-text-primary: #1a1a1a;
  --theme-text-secondary: #6b7280;
  --theme-text-muted: #9ca3af;
  
  /* 边框色 */
  --theme-border: #e5e7eb;
  
  /* 菜单选中态 */
  --theme-menu-active-bg: #e8f4fd;
  --theme-menu-active-text: #2081e2;
  
  /* 消息提示 */
  --theme-message-bg: #e8f4fd;
  --theme-message-text: #2081e2;
  
  /* Element Plus 主色覆盖 */
  --el-color-primary: #2081e2;
  --el-color-primary-light-3: #4a9aea;
  --el-color-primary-light-5: #7ab3f2;
  --el-color-primary-light-7: #a5ccf9;
  --el-color-primary-light-8: #c5dffa;
  --el-color-primary-light-9: #e8f4fd;
  --el-color-primary-dark-2: #1868b7;
}
```

- [ ] **Step 2: 更新 Dark 主题变量**

```css
html.dark {
  --theme-primary: #2081e2;
  --theme-primary-hover: #4a9aea;
  --theme-primary-light: #1a2a3a;
  
  --theme-bg-sidebar: #141414;
  --theme-bg-header: #1a1a1a;
  --theme-bg-main: #0d0d0d;
  --theme-bg-card: #1a1a1a;
  
  --theme-text-primary: #ffffff;
  --theme-text-secondary: #9ca3af;
  --theme-text-muted: #6b7280;
  
  --theme-border: #2d2d2d;
  
  --theme-menu-active-bg: #1a2a3a;
  --theme-menu-active-text: #2081e2;
  
  --theme-message-bg: #1a2a3a;
  --theme-message-text: #4a9aea;
  
  /* Element Plus Dark 覆盖 */
  --el-color-primary: #2081e2;
  --el-color-primary-light-3: #1868b7;
  --el-color-primary-light-5: #144f8f;
  --el-color-primary-light-7: #0f3a6b;
  --el-color-primary-light-8: #0b2a50;
  --el-color-primary-light-9: #071c38;
  --el-color-primary-dark-2: #4a9aea;
}
```

- [ ] **Step 3: 更新圆角和阴影变量**

在 themes.css 中添加：

```css
/* 圆角系统 */
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 12px;
--border-radius-xl: 16px;

/* 阴影 */
--box-shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
--box-shadow-md: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
--box-shadow-lg: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);

/* Dark 模式阴影 */
html.dark {
  --box-shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
  --box-shadow-md: 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
  --box-shadow-lg: 0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3);
}
```

- [ ] **Step 4: 更新 Element Plus 组件 Dark 模式样式**

更新 html.dark 部分的组件覆盖样式，确保按钮、输入框、卡片等组件使用新颜色

---

## Chunk 2: 更新 style.css 全局样式

**Files:**
- Modify: `src/style.css:1-100`

- [ ] **Step 1: 更新字体和基础样式**

```css
:root {
  /* 字体系统 */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  
  /* 字重 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 2: 更新全局圆角和阴影应用**

为卡片、按钮、输入框等添加圆角和阴影

---

## Chunk 3: 更新 MainLayout.vue 样式

**Files:**
- Modify: `src/layout/MainLayout.vue:280-540`

- [ ] **Step 1: 更新 logo 区域样式**

```css
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: var(--font-weight-semibold);
  color: var(--theme-primary);
  border-bottom: 1px solid var(--theme-border);
}
```

- [ ] **Step 2: 更新菜单样式**

确保菜单使用新的颜色和圆角

- [ ] **Step 3: 更新头部样式**

确保头部使用新的背景色和间距

---

## Chunk 4: 验证

**Files:**
- None (验证步骤)

- [ ] **Step 1: 运行开发服务器**

```bash
cd /Users/mac/Desktop/web_agent/teamhub-admin\ 3 && npm run dev
```

- [ ] **Step 2: 检查主题切换**

确认 Light/Dark 模式切换正常工作

- [ ] **Step 3: 检查各组件样式**

确认按钮、卡片、表格、输入框等样式正确

---

## 执行说明

1. 按顺序执行每个 Chunk
2. 每个 Step 完成后的修改应立即可见（通过刷新页面）
3. 如有问题，回退对应文件的修改
