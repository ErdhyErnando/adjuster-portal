import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/LoginPage.vue"),
      meta: { standalone: true, title: "Login" },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/pages/DashboardPage.vue"),
      meta: { title: "Dashboard" },
    },
    {
      path: "/cases",
      name: "Cases",
      component: () => import("@/pages/CaseListPage.vue"),
      meta: { title: "Cases" },
    },
    {
      path: "/cases/:id",
      name: "CaseDetail",
      component: () => import("@/pages/CaseDetailPage.vue"),
      meta: { title: "Case Detail" },
    },
    {
      path: "/iou",
      name: "IOU",
      component: () => import("@/pages/IOUListPage.vue"),
      meta: { title: "Cash Advance (IOU)" },
    },
    {
      path: "/iou/new",
      name: "NewIOU",
      component: () => import("@/pages/IOUSubmitPage.vue"),
      meta: { title: "New IOU Request" },
    },
    {
      path: "/iou-report",
      name: "IOUReport",
      component: () => import("@/pages/IOUReportPage.vue"),
      meta: { title: "IOU Report" },
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("@/pages/SettingsPage.vue"),
      meta: { title: "Settings" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/pages/NotFoundPage.vue"),
      meta: { title: "Page not found" },
    },
  ],
});

export default router;
