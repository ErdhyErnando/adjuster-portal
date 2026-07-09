<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <div class="hidden min-h-svh md:flex">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="h-4" />
        </header>
        <div class="flex flex-1 flex-col p-8">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
