<script setup lang="ts">
import { ref } from 'vue'
import { Briefcase, ChevronLeft, ChevronRight, FileText, LayoutDashboard, Settings, Wallet } from '@lucide/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isCollapsed = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Cases', to: '/cases', icon: Briefcase },
  { name: 'Cash Advance', to: '/iou', icon: Wallet },
  { name: 'IOU Report', to: '/iou-report', icon: FileText },
  { name: 'Settings', to: '/settings', icon: Settings },
]

function isActive(path: string): boolean {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}
</script>

<template>
  <div class="hidden min-h-svh md:flex">
    <aside
      :class="[
        'fixed left-0 top-0 z-40 flex h-full flex-col bg-[#1A1A1A] text-white transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
      ]"
    >
      <!-- Logo header -->
      <div
        :class="[
          'flex h-16 items-center transition-all duration-300',
          isCollapsed ? 'justify-center px-2' : 'px-4',
        ]"
      >
        <div
          v-if="!isCollapsed"
          class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2"
        >
          <img
            src="/atlas-logo-wide.png"
            alt="Atlas Adjusting"
            class="h-7 w-auto"
          />
        </div>
        <div
          v-else
          class="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white"
        >
          A
        </div>
      </div>

      <!-- Toggle button -->
      <div
        :class="[
          'flex transition-all duration-300',
          isCollapsed ? 'justify-center px-2' : 'justify-end px-4',
        ]"
      >
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center rounded-md text-[#D0D0D8] transition-colors hover:bg-white/10 hover:text-white"
          :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="toggleSidebar"
        >
          <component :is="isCollapsed ? ChevronRight : ChevronLeft" class="h-4 w-4" />
        </button>
      </div>

      <nav class="flex-1 px-3 py-4">
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              :class="[
                'flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors',
                isActive(item.to)
                  ? 'bg-primary text-white'
                  : 'text-[#D0D0D8] hover:bg-white/10 hover:text-white',
                isCollapsed ? 'justify-center' : '',
              ]"
              :title="item.name"
            >
              <component :is="item.icon" class="h-5 w-5 shrink-0" />
              <span
                :class="[
                  'overflow-hidden whitespace-nowrap transition-all duration-300',
                  isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
                ]"
              >
                {{ item.name }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div
        :class="[
          'border-t border-white/10 p-3 transition-all duration-300',
          isCollapsed ? 'px-2' : 'px-4',
        ]"
      >
        <RouterLink
          to="/iou/new"
          :class="[
            'flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-white hover:bg-[#D4533A]',
            isCollapsed ? 'px-2' : '',
          ]"
          title="New IOU Request"
        >
          <span>+</span>
          <span
            :class="[
              'overflow-hidden whitespace-nowrap transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
            ]"
          >
            New IOU
          </span>
        </RouterLink>
      </div>
    </aside>

    <main
      :class="[
        'flex-1 overflow-y-auto p-8 transition-all duration-300',
        isCollapsed ? 'ml-20' : 'ml-64',
      ]"
    >
      <slot />
    </main>
  </div>
</template>
