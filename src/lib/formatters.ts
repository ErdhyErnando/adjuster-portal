/**
 * Shared formatting helpers.
 *
 * All currency values are IDR rupiah integers (no decimal/sen units).
 * Dates are handled as ISO strings and formatted for the Indonesian locale.
 */

export function formatCurrencyIdr(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumberIdr(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatDateId(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function formatDateTimeId(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function calculateAgingDays(date: string | Date): number {
  const start = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - start.getTime()
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
}
