<script setup lang="ts">
import { Briefcase, FileText, LayoutDashboard, Settings, StickyNotePlus, Wallet } from '@lucide/vue'
import { useRoute } from 'vue-router'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const route = useRoute()

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
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            as-child
          >
            <RouterLink to="/dashboard">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground"
              >
                <img
                  src="/atlas-logo-wide.png"
                  alt="Atlas Adjusting"
                  class="h-5 w-auto"
                >
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold text-white">Atlas Portal</span>
                <span class="truncate text-xs text-[#D0D0D8]">Adjuster</span>
              </div>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu class="gap-1">
            <SidebarMenuItem v-for="item in navItems" :key="item.to">
              <SidebarMenuButton
                as-child
                :is-active="isActive(item.to)"
                :tooltip="item.name"
              >
                <RouterLink :to="item.to">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            class="border border-sidebar-border bg-sidebar-accent text-white hover:bg-[#D4533A] hover:text-white"
          >
            <RouterLink to="/iou/new">
              <StickyNotePlus />
              <span>New IOU Request</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
