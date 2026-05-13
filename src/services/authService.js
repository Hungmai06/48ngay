import allowedEmails from '../data/allowedEmails.json'

const AUTH_KEY = 'english48.auth'
const DRIVE_NOTICE_KEY = 'english48.driveNoticeSeen'

export function login(email) {
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail) {
    return { success: false, error: 'Vui lòng nhập email để đăng nhập.' }
  }

  const matched = allowedEmails.find(
    (item) => item.email.toLowerCase() === normalizedEmail,
  )

  if (!matched) {
    return {
      success: false,
      errorType: 'unregistered',
      error: 'Email này chưa có trong danh sách học viên.',
    }
  }

  const authPayload = {
    email: matched.email,
    name: matched.name,
    loggedInAt: new Date().toISOString(),
  }

  sessionStorage.removeItem(DRIVE_NOTICE_KEY)
  localStorage.setItem(AUTH_KEY, JSON.stringify(authPayload))
  return { success: true, user: authPayload }
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
