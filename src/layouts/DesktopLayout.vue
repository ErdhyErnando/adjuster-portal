<script setup lang="ts">
import { Briefcase, FileText, LayoutDashboard, Settings, Wallet } from '@lucide/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Cases', to: '/cases', icon: Briefcase },
  { name: 'Cash Advance', to: '/iou', icon: Wallet },
  { name: 'IOU Report', to: '/iou-report', icon: FileText },
  { name: 'Settings', to: '/settings', icon: Settings },
]
</script>

<template>
  <div class="hidden min-h-svh md:flex">
    <aside
      class="fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-[#1A1A1A] text-white"
    >
      <div class="flex h-16 items-center px-6">
        <span class="text-lg font-semibold tracking-tight">Atlas Portal</span>
      </div>

      <nav class="flex-1 px-4 py-4">
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              :class="[
                'flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors',
                route.path === item.to || (item.to !== '/' && route.path.startsWith(item.to))
                  ? 'bg-primary text-white'
                  : 'text-[#D0D0D8] hover:bg-white/10 hover:text-white',
              ]"
            >
              <component :is="item.icon" class="h-5 w-5" />
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="border-t border-white/10 p-4">
        <RouterLink
          to="/iou/new"
          class="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#D4533A]"
        >
          New IOU Request
        </RouterLink>
      </div>
    </aside>

    <main class="ml-64 flex-1 overflow-y-auto p-8">
      <slot />
    </main>
  </div>
</template>
