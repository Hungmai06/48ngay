import { parseDriveLink } from '../utils/parseDriveLink'

function ResourceFrame({ title, link }) {
  const parsedLink = parseDriveLink(link)
  const previewLink = parsedLink.embedUrl

  if (!previewLink) {
    return <p className="empty-state">Tài nguyên đang được cập nhật.</p>
  }

  const isVideo = String(title || '').toLowerCase().includes('video')
  const isFolder = parsedLink.type === 'folder'

  return (
    <div className="resource-frame">
      <p className="resource-title">{title}</p>

      {isFolder && (
        <div className="resource-folder-banner">
          <p>
            Link này là thư mục Google Drive. Nếu xem trong khung không ổn định trên điện thoại,
            hãy mở trực tiếp bằng nút bên dưới.
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

      {isVideo ? (
        <div className="embed-16by9">
          <iframe
            title={title}
            src={previewLink}
            className="resource-iframe"
            scrolling="no"
            allow="autoplay; encrypted-media; fullscreen"
          />
        </div>
      ) : (
        <iframe
          title={title}
          src={previewLink}
          className="resource-iframe"
          scrolling="no"
          allow="autoplay"
        />
      )}
    </div>
  )
}

export default ResourceFrame
