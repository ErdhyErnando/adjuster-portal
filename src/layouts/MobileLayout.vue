<script setup lang="ts">
import { Briefcase, Ellipsis, LayoutDashboard, Wallet } from "@lucide/vue";
import { useRoute } from "vue-router";

const route = useRoute();

const tabs = [
  { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { name: "Cases", to: "/cases", icon: Briefcase },
  { name: "Cash Advance", to: "/iou", icon: Wallet },
  { name: "More", to: "/settings", icon: Ellipsis },
];
</script>

<template>
  <div class="flex min-h-svh flex-col bg-background md:hidden">
    <main class="flex-1 overflow-y-auto p-4 pb-24">
      <slot />
    </main>

    <nav class="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <ul class="flex items-center justify-around px-2 py-2">
        <li v-for="tab in tabs" :key="tab.to">
          <RouterLink
            :to="tab.to"
            :class="[
              'flex flex-col items-center gap-0.5 rounded-md px-3 py-2 text-xs font-medium transition-colors',
              route.path === tab.to || (tab.to !== '/' && route.path.startsWith(tab.to))
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground',
            ]"
          >
            <component :is="tab.icon" class="h-5 w-5" />
            <span>{{ tab.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
