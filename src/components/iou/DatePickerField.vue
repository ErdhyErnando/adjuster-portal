<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { toCalendarDate } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
import { CalendarDays, X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { calendarDateToIso, isoToCalendarDate } from '@/lib/date'
import { formatDateId } from '@/lib/formatters'
import { cn } from '@/lib/utils'

/**
 * Single-date picker built from Popover + reka-ui Calendar.
 *
 * - modelValue is an ISO string ('YYYY-MM-DD') or ''.
 * - `minDate` / `maxDate` disable out-of-range days (used to keep the
 *   Meeting Period end date on or after the start date).
 * - Closes on select and renders the date in the id-ID locale.
 */

interface Props {
  modelValue?: string
  label?: string
  htmlFor?: string
  placeholder?: string
  minDate?: string
  maxDate?: string
  error?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select date',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)

const calendarValue = computed(() => isoToCalendarDate(props.modelValue))
const minValue = computed(() => isoToCalendarDate(props.minDate))
const maxValue = computed(() => isoToCalendarDate(props.maxDate))
const displayDate = computed(() => (props.modelValue ? formatDateId(props.modelValue) : ''))

function onCalendarChange(value: DateValue | undefined) {
  emit('update:modelValue', calendarDateToIso(value ? toCalendarDate(value) : undefined))
  open.value = false
}

function clear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div :class="cn('space-y-1.5', props.class)">
    <Label v-if="label" :for="htmlFor" class="text-foreground">
      {{ label }}
    </Label>

    <Popover v-model:open="open">
      <PopoverTrigger
        as-child
        :disabled="disabled"
      >
        <Button
          variant="outline"
          size="default"
          :class="cn(
            'text-muted-foreground data-[state=open]:text-foreground border-input w-full justify-start gap-2 font-normal',
            displayDate && 'text-foreground',
            error && 'border-destructive focus-visible:ring-destructive/20',
          )"
        >
          <CalendarDays class="size-4 shrink-0" aria-hidden="true" />
          <span class="truncate">{{ displayDate || placeholder }}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-72" align="start">
        <Calendar
          :model-value="calendarValue"
          :min-value="minValue"
          :max-value="maxValue"
          locale="id-ID"
          @update:model-value="onCalendarChange"
        />

        <div class="flex items-center justify-between border-t pt-2.5">
          <span class="text-muted-foreground text-xs">
            {{ displayDate || 'No date selected' }}
          </span>
          <Button
            v-if="modelValue"
            variant="ghost"
            size="xs"
            class="text-muted-foreground hover:text-destructive gap-1"
            @click="clear"
          >
            <X class="size-3" aria-hidden="true" />
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>

    <p v-if="error" class="text-destructive text-xs">
      {{ error }}
    </p>
  </div>
</template>