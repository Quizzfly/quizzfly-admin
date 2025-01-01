import { i18n } from '@/plugins/i18n'
const { t } = i18n.global

const convertTime = (date: number): string => {
  const now: number = Date.now()
  const seconds = Math.floor((now - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('common.years')
  }

  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('common.months')
  }

  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('common.days')
  }

  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('common.hours')
  }

  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' ' + t('common.minutes')
  } else {
    return ' 1' + ' ' + t('common.minutes')
  }
}

export function timeAgo(date: number, label: string): string {
  let timeAgo = convertTime(date)

  if (label) {
    timeAgo = timeAgo + ' ' + label
  }
  return timeAgo
}

export function getTimezoneOffsetString(): string {
  const offsetInMinutes = new Date().getTimezoneOffset()
  const offsetInHours = Math.abs(offsetInMinutes / 60)
  const offsetSign = offsetInMinutes >= 0 ? '-' : '+'

  const timezoneString = `UTC${offsetSign}${offsetInHours}`
  return timezoneString
}

export function formatDate(data: string) {
  const date = new Date(data)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatDateTime(data: string) {
  const date = new Date(data)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
