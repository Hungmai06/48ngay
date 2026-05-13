import { parseDriveLink } from '../utils/parseDriveLink'

function ResourceFrame({ title, link }) {
  const previewLink = parseDriveLink(link)

  if (!previewLink) {
    return <p className="empty-state">Tài nguyên đang được cập nhật.</p>
  }

  const isVideo = String(title || '').toLowerCase().includes('video')

  return (
    <div className="resource-frame">
      <p className="resource-title">{title}</p>

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
