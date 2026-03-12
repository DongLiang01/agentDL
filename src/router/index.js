/*
 * Copyright © 2026 TinyTrader. All rights reserved.
 * Author: Raymond
 * This software is proprietary and confidential information of TinyTrader.
 */

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../layout/MainLayout.vue'
import Home from '../views/Home.vue'
import RebateSummary from '../views/RebateSummary.vue'
import RebateRecords from '../views/RebateRecords.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login' }
  },
  {
    path: '/',
    component: MainLayout,
    redirect: '/home',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { title: 'Home Page Overview' }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Home,
        meta: { title: 'Dashboard' }
      },
      {
        path: 'rebate-summary',
        name: 'RebateSummary',
        component: RebateSummary,
        meta: { title: 'Rebate Summary' }
      },
      {
        path: 'rebate-records',
        name: 'RebateRecords',
        component: RebateRecords,
        meta: { title: 'Rebate Records' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/home')
  } else {
    next()
  }
})

export default router
