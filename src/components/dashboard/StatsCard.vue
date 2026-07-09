<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Component } from 'vue'

interface Props {
  label: string
  value: string | number
  helperText?: string
  icon?: Component
  tone?: 'default' | 'primary'
}

withDefaults(defineProps<Props>(), {
  helperText: undefined,
  icon: undefined,
  tone: 'default',
})
</script>

<template>
  <Card>
    <CardHeader class="pb-2">
      <CardTitle
        :class="[
          'flex items-center gap-2 text-xs font-medium uppercase tracking-wide',
          tone === 'primary' ? 'text-primary' : 'text-muted-foreground',
        ]"
      >
        <component
          v-if="icon"
          :is="icon"
          class="h-4 w-4"
          aria-hidden="true"
        />
        {{ label }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-semibold tracking-tight">
        {{ value }}
      </div>
      <p v-if="helperText" class="mt-1 text-xs text-muted-foreground">
        {{ helperText }}
      </p>
    </CardContent>
  </Card>
</template>
