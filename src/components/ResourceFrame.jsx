import { useState, useEffect, useRef } from 'react'
import { parseDriveLink } from '../utils/parseDriveLink'

// Google Drive private iframes fail silently (no error event).
// Strategy: render iframe → start timeout → if still "pending" after timeout,
// mark as likely failed and show fallback button. If iframe loads successfully,
// cancel timeout and stay in "loaded" state.
const IFRAME_TIMEOUT_MS = 8000

function ResourceFrame({ title, link }) {
  const parsedLink = parseDriveLink(link)
  const previewLink = parsedLink.embedUrl

  // status: 'loading' | 'loaded' | 'fallback'
  const [status, setStatus] = useState('loading')
  const timerRef = useRef(null)

  useEffect(() => {
    // Reset whenever link changes
    setStatus('loading')

    if (!previewLink) return

    timerRef.current = setTimeout(() => {
      // If still loading after timeout, assume it failed (auth / 3rd-party cookies)
      setStatus((prev) => (prev === 'loading' ? 'fallback' : prev))
    }, IFRAME_TIMEOUT_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [previewLink])

  function handleIframeLoad() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStatus('loaded')
  }

  if (!previewLink) {
    return <p className="empty-state">Tài nguyên đang được cập nhật.</p>
  }

  const isVideo = String(title || '').toLowerCase().includes('video')
  const isFolder = parsedLink.type === 'folder'

  return (
    <div className="resource-frame">
      <p className="resource-title">{title}</p>

      {/* Folder: always show open button (folders never embed well) */}
      {isFolder && (
        <div className="resource-folder-banner">
          <p>
            Link này là thư mục Google Drive. Vui lòng mở trực tiếp để xem tài liệu.
          </p>
          <a
            href={parsedLink.openUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Mở thư mục bài tập
          </a>
        </div>
      )}

      {/* Fallback banner — shown when iframe times out */}
      {!isFolder && status === 'fallback' && (
        <div className="resource-folder-banner">
          <p>
            Video / tài liệu không tải được trong khung (do hạn chế xác thực hoặc cookie
            của trình duyệt). Nhấn nút bên dưới để mở trực tiếp trên Google Drive.
          </p>
          <a
            href={parsedLink.openUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Mở trên Google Drive ↗
          </a>
        </div>
      )}

      {/* Loading indicator */}
      {!isFolder && status === 'loading' && (
        <div className="iframe-loading-bar" aria-label="Đang tải..." />
      )}

      {/* Always render iframe (hidden when fallback) so onLoad can fire */}
      {!isFolder && (
        isVideo ? (
          <div
            className="embed-16by9"
            style={status === 'fallback' ? { display: 'none' } : {}}
          >
            <iframe
              key={previewLink}
              title={title}
              src={previewLink}
              className="resource-iframe"
              scrolling="no"
              allow="autoplay; encrypted-media; fullscreen"
              onLoad={handleIframeLoad}
            />
          </div>
        ) : (
          <iframe
            key={previewLink}
            title={title}
            src={previewLink}
            className="resource-iframe"
            scrolling="no"
            allow="autoplay"
            style={status === 'fallback' ? { display: 'none' } : {}}
            onLoad={handleIframeLoad}
          />
        )
      )}
    </div>
  )
}

export default ResourceFrame
