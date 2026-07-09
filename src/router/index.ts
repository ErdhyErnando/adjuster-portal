import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { standalone: true },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/DashboardPage.vue'),
    },
    {
      path: '/cases',
      name: 'Cases',
      component: () => import('@/pages/CaseListPage.vue'),
    },
    {
      path: '/cases/:id',
      name: 'CaseDetail',
      component: () => import('@/pages/CaseDetailPage.vue'),
    },
    {
      path: '/iou',
      name: 'IOU',
      component: () => import('@/pages/IOUListPage.vue'),
    },
    {
      path: '/iou/new',
      name: 'NewIOU',
      component: () => import('@/pages/IOUSubmitPage.vue'),
    },
    {
      path: '/iou-report',
      name: 'IOUReport',
      component: () => import('@/pages/IOUReportPage.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/pages/SettingsPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
})

export default router
