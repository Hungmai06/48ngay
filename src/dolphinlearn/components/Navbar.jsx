import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../48ngay/hooks/useAuth'
import logo from '../assets/logo.png'

export default function Navbar() {
  const { isDlLoggedIn, dlUser, dlLogout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
      isActive
        ? 'bg-primary/10 text-primary shadow-sm'
        : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
    }`

  return (
    <header className="w-full md:w-64 h-16 md:h-screen sticky top-0 z-50 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-row md:flex-col justify-between md:items-stretch px-6 md:px-4 py-0 md:py-8 shadow-sm md:shadow-none shrink-0">
      {/* Top Part: Logo & Mobile Hamburger */}
      <div className="flex md:flex-col justify-between items-center md:items-start w-full md:w-auto md:mb-8">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="DolphinLearn Logo" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <span className="font-display text-xl font-black text-primary tracking-tight">DolphinLearn</span>
        </Link>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-slate-700">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Middle Part: Navigation Links (Desktop only, vertical list) */}
      <nav className="hidden md:flex flex-col gap-1.5 flex-1">
        <NavLink to="/" end className={linkClass}>
          <span className="material-symbols-outlined text-[20px]">home</span>
          Trang chủ
        </NavLink>
        <NavLink to="/documents" className={linkClass}>
          <span className="material-symbols-outlined text-[20px]">description</span>
          Tài liệu
        </NavLink>
        <NavLink to="/vocabulary" className={linkClass}>
          <span className="material-symbols-outlined text-[20px]">translate</span>
          Từ vựng
        </NavLink>
        <NavLink to="/leaderboard" className={linkClass}>
          <span className="material-symbols-outlined text-[20px]">leaderboard</span>
          Bảng xếp hạng
        </NavLink>
        <NavLink to="/community" className={linkClass}>
          <span className="material-symbols-outlined text-[20px]">groups</span>
          Cộng đồng
        </NavLink>
        <NavLink to="/48ngay" className={linkClass}>
          <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          48 Ngày
        </NavLink>
        {dlUser?.role === 'ADMIN' && (
          <NavLink to="/admin" className={linkClass}>
            <span className="material-symbols-outlined text-[20px] text-amber-600">admin_panel_settings</span>
            Quản trị (Admin)
          </NavLink>
        )}
      </nav>

      {/* Bottom Part: User Details / Auth Buttons (Desktop only) */}
      <div className="hidden md:flex flex-col gap-4 border-t border-slate-100 pt-6 mt-auto">
        {isDlLoggedIn ? (
          <div className="space-y-4">
            {/* User Metrics */}
            <div className="flex justify-around items-center bg-slate-50 rounded-2xl py-2 px-1">
              <span className="flex items-center gap-1 text-[11px] font-black text-accent-dark" title="Streak">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                {dlUser?.streak || 0} ngày
              </span>
              <span className="flex items-center gap-1 text-[11px] font-black text-primary" title="XP">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                {dlUser?.points || 0} XP
              </span>
            </div>

            {/* Profile Info and Dropdown/Logout */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="w-full flex items-center justify-between gap-2 p-2.5 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100 cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-primary text-[24px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                  <div className="truncate">
                    <p className="text-xs font-extrabold text-slate-800 truncate">{dlUser?.name || dlUser?.email?.split('@')[0]}</p>
                    <p className="text-[10px] text-slate-400 truncate">{dlUser?.email}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-sm" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none' }}>keyboard_arrow_down</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[60] py-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Trang cá nhân
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    Bảng điều khiển
                  </Link>
                  <button 
                    onClick={dlLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link to="?auth=login" className="w-full text-center py-2.5 text-xs font-extrabold text-slate-600 hover:text-primary transition-colors">
              Đăng nhập
            </Link>
            <Link to="?auth=register" className="w-full text-center py-2.5 text-xs font-extrabold bg-primary text-white rounded-2xl hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 transition-all">
              Đăng ký miễn phí
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 border-b border-slate-200 bg-white shadow-xl md:hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-4 flex flex-col gap-2">
            <NavLink to="/" end onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `text-sm font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-600'}`}>Trang chủ</NavLink>
            <NavLink to="/documents" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `text-sm font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-600'}`}>Tài liệu</NavLink>
            <NavLink to="/vocabulary" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `text-sm font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-600'}`}>Từ vựng</NavLink>
            <NavLink to="/leaderboard" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `text-sm font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-600'}`}>Bảng xếp hạng</NavLink>
            <NavLink to="/community" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `text-sm font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-600'}`}>Cộng đồng</NavLink>
            <NavLink to="/48ngay" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `text-sm font-semibold py-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-600'}`}>48 Ngày</NavLink>
            
            {isDlLoggedIn ? (
              <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-100">
                <div className="px-3 py-2 bg-slate-50 rounded-xl mb-2">
                  <p className="text-[10px] font-bold text-slate-400">Tài khoản</p>
                  <p className="text-xs font-black text-slate-800">{dlUser?.name || dlUser?.email?.split('@')[0]}</p>
                  <p className="text-[10px] text-slate-500">{dlUser?.email}</p>
                </div>
                <NavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold py-2 text-slate-600 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                  Trang cá nhân
                </NavLink>
                <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold py-2 text-slate-600 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">dashboard</span>
                  Bảng điều khiển
                </NavLink>
                {dlUser?.role === 'ADMIN' && (
                  <NavLink to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold py-2 text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-amber-600">admin_panel_settings</span>
                    Trang Quản trị
                  </NavLink>
                )}
                <button 
                  onClick={() => {
                    dlLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full text-left py-2 text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                <Link to="?auth=login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2.5 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                  Đăng nhập
                </Link>
                <Link to="?auth=register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary-dark transition-all">
                  Đăng ký miễn phí
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
