<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  label: string
  value: string | number
  helperText?: string
}

withDefaults(defineProps<Props>(), {
  helperText: undefined,
})
</script>

<template>
  <Card class="bg-muted/40">
    <CardHeader class="pb-2">
      <CardTitle class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {{ label }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
        {{ value }}
      </div>
      <p v-if="helperText" class="mt-1 text-xs text-muted-foreground">
        {{ helperText }}
      </p>
    </CardContent>
  </Card>
</template>
