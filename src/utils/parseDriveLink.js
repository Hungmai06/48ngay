export function parseDriveLink(url) {
  if (!url || typeof url !== 'string') {
    return ''
  }

  const fileIdMatch = url.match(/\/file\/d\/([^/]+)/)
  if (!fileIdMatch) {
    return url
  }

  const fileId = fileIdMatch[1]
  return `https://drive.google.com/file/d/${fileId}/preview`
}
