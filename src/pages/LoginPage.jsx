import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import bgImage from '../assets/48ngay.png'

const REGISTER_LINK =
  'https://khoahocdrivemh.pro.vn/course/403-khoa-hoc-48-ngay-lay-goc-ting-anh-toan-dien-cung-co-mai-phuong'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '' })
  const [error, setError] = useState('')
  const [showRegisterLink, setShowRegisterLink] = useState(false)

  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setShowRegisterLink(false)

    const result = await login(form.email)
    setLoading(false)

    if (!result.success) {
      setError(result.error)
      setShowRegisterLink(result.errorType === 'unregistered')
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="login-card">
        <p className="login-brand">48 Ngày Lấy Gốc Tiếng Anh</p>
        <h1>Đăng nhập học viên</h1>
        <p className="login-subtitle">Hệ thống học tập dành cho học viên đã đăng ký</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
          />

          {error && <p className="error-message">{error}</p>}

          {showRegisterLink && (
            <p className="register-help">
              Bạn hãy đăng ký trước tại đây hoặc IB admin:{' '}
              <a href={REGISTER_LINK} target="_blank" rel="noreferrer">
                {REGISTER_LINK}
              </a>
            </p>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Đang kiểm tra...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
