<script setup lang="ts">
import DesktopLayout from "./DesktopLayout.vue";
import MobileLayout from "./MobileLayout.vue";
</script>

<template>
  <!-- Mobile layout is visible below the md breakpoint. -->
  <MobileLayout>
    <slot />
  </MobileLayout>

  <!-- Desktop layout is visible at the md breakpoint and above. -->
  <DesktopLayout>
    <slot />
  </DesktopLayout>
</template>
