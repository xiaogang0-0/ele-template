import defaultSettings from '@/settings'

const title = defaultSettings.title || 'PC架构模版'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
