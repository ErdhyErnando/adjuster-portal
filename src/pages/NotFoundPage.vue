<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="flex min-h-[60svh] flex-col items-center justify-center gap-4 text-center">
    <h1 class="text-4xl font-semibold tracking-tight">404</h1>
    <p class="text-muted-foreground">Page not found.</p>
    <Button as-child>
      <RouterLink to="/dashboard">Go to Dashboard</RouterLink>
    </Button>
  </div>
</template>
