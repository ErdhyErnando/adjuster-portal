<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, nextTick } from 'vue'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/**
 * Integer-only IDR currency input.
 *
 * - Strips everything except digits on input (IDR is integer — no decimals).
 * - Live-formats with Indonesian thousands separators while typing, e.g.
 *   "1500000" renders as "1.500.000" and emits the number 1500000.
 * - Shows a fixed "Rp" prefix inside the field.
 * - `readonly` renders the auto-calculated total style (muted, dashed border).
 */

interface Props {
  modelValue?: number | null
  placeholder?: string
  id?: string
  name?: string
  disabled?: boolean
  readonly?: boolean
  /** Hard cap on digits to keep the value sane. */
  maxDigits?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: '0',
  disabled: false,
  readonly: false,
  maxDigits: 12,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

function formatDisplay(value: number | null | undefined): string {
  if (value == null)
    return ''
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(value)
}

const displayValue = computed(() => formatDisplay(props.modelValue))

async function onInput(event: Event) {
  if (props.readonly)
    return

  const el = event.target as HTMLInputElement
  const raw = el.value
  const digits = raw.replace(/\D/g, '').slice(0, props.maxDigits)
  const nextValue = digits === '' ? null : Number(digits)

  emit('update:modelValue', nextValue)

  // Restore the caret after Vue re-renders the formatted value, otherwise
  // typing in the middle of a number jumps the cursor to the end.
  const formatted = formatDisplay(nextValue)
  if (formatted === raw)
    return

  const caret = el.selectionStart ?? raw.length
  const digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, '').length

  await nextTick()

  let position = 0
  let seen = 0
  while (position < formatted.length && seen < digitsBeforeCaret) {
    if (/[0-9]/.test(formatted[position]))
      seen++
    position++
  }
  el.setSelectionRange(position, position)
}
</script>

<template>
  <div :class="cn('relative', props.class)">
    <span
      class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-2.5 text-sm"
      aria-hidden="true"
    >
      Rp
    </span>
    <Input
      :id="id"
      :name="name"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      inputmode="numeric"
      pattern="[0-9]*"
      autocomplete="off"
      :aria-label="name"
      class="text-foreground pl-9 font-medium tabular-nums"
      :class="readonly
        ? 'border-muted-foreground/30 bg-muted/70 font-semibold text-foreground'
        : ''"
      @input="onInput"
    />
  </div>
</template>