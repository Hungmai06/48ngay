const AUTH_KEY = 'english48.auth'
const DRIVE_NOTICE_KEY = 'english48.driveNoticeSeen'
const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
const KEYWORD = 'Khóa Học 48 Ngày Lấy Gốc Tiếng Anh Toàn Diện Cùng Cô Mai Phương (VIP)'

export async function login(email) {
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail) {
    return { success: false, error: 'Vui lòng nhập email để đăng nhập.' }
  }

  try {
    const url = `${API_BASE}/api/v1/english/check-english-48-ngay?email=${encodeURIComponent(normalizedEmail)}&keyword=${encodeURIComponent(KEYWORD)}`
    const response = await fetch(url)

    if (!response.ok) {
      return {
        success: false,
        error: 'Không thể kết nối đến máy chủ. Vui lòng thử lại.',
      }
    }

    const isAllowed = await response.json()

    if (!isAllowed) {
      return {
        success: false,
        errorType: 'unregistered',
        error: 'Email này chưa có trong danh sách học viên.',
      }
    }

    const authPayload = {
      email: normalizedEmail,
      loggedInAt: new Date().toISOString(),
    }

    sessionStorage.removeItem(DRIVE_NOTICE_KEY)
    localStorage.setItem(AUTH_KEY, JSON.stringify(authPayload))
    return { success: true, user: authPayload }
  } catch {
    return {
      success: false,
      error: 'Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.',
    }
  }
}

export function logout() {
  sessionStorage.removeItem(DRIVE_NOTICE_KEY)
  localStorage.removeItem(AUTH_KEY)
}

export function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return Boolean(getCurrentUser())
}
