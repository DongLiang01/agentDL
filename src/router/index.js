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
import PartnerConfiguration from '../views/PartnerConfiguration.vue'
import PartnerList from '../views/PartnerList.vue'
import ReferralLinks from '../views/ReferralLinks.vue'
import SearchAllOrders from '../views/SearchAllOrders.vue'
import OTCDepositWithDraw from '../views/OTCDepositWithDraw.vue'
import CoinsDepositWithdraw from '../views/CoinsDepositWithdraw.vue'
import Transfer from '../views/Transfer.vue'
import ExternalTotalAmount from '../views/ExternalTotalAmount.vue'

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
      },
      {
        path: 'partner-config',
        name: 'PartnerConfiguration',
        component: PartnerConfiguration,
        meta: { title: 'Partner Configuration' }
      },
      {
        path: 'partner-list',
        name: 'PartnerList',
        component: PartnerList,
        meta: { title: 'Partner List' }
      },
      {
        path: 'referral-links',
        name: 'ReferralLinks',
        component: ReferralLinks,
        meta: { title: 'Referral Links' }
      },
      {
        path: 'search-all-orders',
        name: 'SearchAllOrders',
        component: SearchAllOrders,
        meta: { title: 'Search All Orders' }
      },
      {
        path: 'otc-deposit',
        name: 'OTCDepositWithDraw',
        component: OTCDepositWithDraw,
        meta: { title: 'OTC Deposit/Withdraw' }
      },
      {
        path: 'coin-deposit',
        name: 'CoinsDepositWithdraw',
        component: CoinsDepositWithdraw,
        meta: { title: 'Coins Deposit/Withdraw' }
      },
      {
        path: 'transfer',
        name: 'Transfer',
        component: Transfer,
        meta: { title: 'Transfer' }
      },
      {
        path: 'external-deposit',
        name: 'ExternalTotalAmount',
        component: ExternalTotalAmount,
        meta: { title: 'External Total Amount' }
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
