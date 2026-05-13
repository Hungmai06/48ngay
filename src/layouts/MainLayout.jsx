import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'

const DRIVE_NOTICE_KEY = 'english48.driveNoticeSeen'

function MainLayout() {
  const [showDriveNotice, setShowDriveNotice] = useState(
    () => sessionStorage.getItem(DRIVE_NOTICE_KEY) !== '1',
  )

  const closeDriveNotice = () => {
    sessionStorage.setItem(DRIVE_NOTICE_KEY, '1')
    setShowDriveNotice(false)
  }

  return (
    <div className="app-shell">
      <CourseHeader />
      <main className="content-shell">
        <Outlet />
      </main>

      {showDriveNotice && (
        <div className="drive-notice-overlay" role="dialog" aria-modal="true" aria-labelledby="drive-notice-title">
          <div className="drive-notice-card">
            <h2 id="drive-notice-title">Thông báo quan trọng</h2>
            <p>Vui lòng đăng nhập Google Drive trước khi học:</p>

            <ol className="drive-notice-steps">
              <li>Mở trình duyệt web: Google, Google Chrome, Safari, Microsoft Edge, Firefox hoặc Cốc Cốc.</li>
              <li>
                Truy cập trang Drive:
                <a href="https://drive.google.com" target="_blank" rel="noreferrer"> drive.google.com</a>.
              </li>
              <li>Nếu chưa đăng nhập, nhập Gmail của bạn đã đăng kí trên web hoặc với admin và nhấn Tiếp theo.</li>
              <li>Nhập mật khẩu rồi nhấn Tiếp theo.</li>
              <li>Nếu bật bảo mật 2 lớp, hãy xác nhận trên điện thoại hoặc nhập mã xác minh.</li>
            </ol>

            <p className="drive-notice-reminder">
              Lưu ý: Bạn phải đăng nhập bằng đúng tài khoản Gmail đã đăng ký khóa học.
            </p>

            <button type="button" className="btn btn-primary" onClick={closeDriveNotice}>
              Tôi đã hiểu
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainLayout
