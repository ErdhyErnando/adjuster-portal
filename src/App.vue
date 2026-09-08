<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppShell from "@/layouts/AppShell.vue";

const route = useRoute();
const isStandalone = computed(() => route.meta.standalone === true);
</script>

<template>
  <AppShell v-if="!isStandalone">
    <RouterView />
  </AppShell>
  <RouterView v-else />
</template>
