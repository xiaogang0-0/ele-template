import defaultSettings from '@/settings'

const title = defaultSettings.title || '和力物联商城'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
