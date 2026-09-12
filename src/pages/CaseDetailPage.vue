<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useRoute } from "vue-router";

const route = useRoute();
const caseId = route.params.id;
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2">
      <Button variant="outline" as-child>
        <RouterLink to="/cases">Back</RouterLink>
      </Button>
    </div>
    <h1 class="text-2xl font-semibold tracking-tight md:hidden">Case Detail: {{ caseId }}</h1>

    <div class="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
      <p class="text-muted-foreground">Case detail will be implemented in Sprint 4.</p>
    </div>
  </div>
</template>
