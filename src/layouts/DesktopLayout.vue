<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
</script>

<template>
  <div class="hidden min-h-svh md:flex">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div class="flex flex-1 flex-col p-8">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
