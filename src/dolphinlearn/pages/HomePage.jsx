import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDlCurrentUser } from '../../48ngay/services/authService'
import dolphinHero from '../assets/dolphin-hero.png'
import { useSEO } from '../hooks/useSEO'

export default function HomePage() {
  useSEO({
    title: 'Học ngoại ngữ miễn phí mỗi ngày',
    description: 'DolphinLearn - Nền tảng học ngoại ngữ miễn phí với kho từ vựng phong phú, tài liệu ôn tập đa dạng (Tiếng Anh, Tiếng Nhật, Tiếng Trung) và lộ trình streak thông minh.',
    keywords: 'học tiếng anh, học tiếng nhật, học tiếng trung, từ vựng tiếng anh, tài liệu ôn thi thpt'
  })

  const [collections, setCollections] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const user = getDlCurrentUser()
        const email = user?.email || ''

        // 1. Fetch collections
        const colRes = await fetch(`${API_BASE}/api/v1/english/vocabulary/collections`)
        let fetchedCollections = []
        if (colRes.ok) {
          const colData = await colRes.json()
          fetchedCollections = colData.data || []
        }

        // 2. Fetch user progress
        let progressMap = {}
        if (email) {
          const progRes = await fetch(`${API_BASE}/api/v1/english/vocabulary/progress?username=${encodeURIComponent(email)}`)
          if (progRes.ok) {
            const progData = await progRes.json()
            const progressList = progData.data || []
            progressList.forEach(p => {
              if (p.subCollectionId) {
                const ids = p.learnedWordIds ? p.learnedWordIds.split(',').filter(Boolean).map(Number) : []
                progressMap[p.subCollectionId] = ids
              }
            })
          }
        }

        // Process collections to calculate wordCount and progress
        const processed = fetchedCollections.map(col => {
          let totalWords = 0
          let totalLearned = 0

          const subs = col.subCollections || []
          subs.forEach(sub => {
            const wordCount = sub.words ? sub.words.length : 0
            totalWords += wordCount

            const learnedIds = progressMap[sub.id] || []
            const subWordIds = (sub.words || []).map(w => w.id)
            const learnedCount = learnedIds.filter(id => subWordIds.includes(id)).length
            totalLearned += learnedCount
          })

          const progressPercent = totalWords > 0 ? Math.round((totalLearned / totalWords) * 100) : 0

          return {
            id: col.id,
            title: col.title,
            description: col.description,
            icon: col.icon || 'school',
            color: col.color || 'primary',
            wordCount: totalWords,
            progress: progressPercent
          }
        })
        setCollections(processed)

        // 3. Fetch document categories
        const catRes = await fetch(`${API_BASE}/api/v1/english/documents/categories`)
        if (catRes.ok) {
          const catData = await catRes.json()
          setCategories(catData.data || [])
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [API_BASE])

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-ocean-50 to-surface pt-16 pb-20">
        {/* Decorative Floating Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[100px] dl-animate-blob pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-300/15 blur-[120px] dl-animate-blob-delay-1 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-slate-800">
              Cùng nhau <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Học tập</span>, Chia sẻ
              <br className="hidden md:block" /> & <span className="text-accent-dark">Phát triển</span>
            </h1>
            <p className="text-base md:text-lg text-text-muted max-w-lg mb-8 mx-auto lg:mx-0 leading-relaxed">
              Kho tài liệu miễn phí, bộ sưu tập từ vựng và lộ trình học tập thông minh. Bắt đầu ngay hôm nay!
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/vocabulary" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <span className="material-symbols-outlined text-[20px]">school</span>
                Bắt đầu học ngay
              </Link>
              <Link to="/documents" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-semibold rounded-full border border-slate-200 hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all">
                <span className="material-symbols-outlined text-[20px]">library_books</span>
                Khám phá tài liệu
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12 max-w-lg mx-auto lg:mx-0">
              {[{ value: '1,200+', label: 'Tài liệu' }, 
                { value: '5,000+', label: 'Từ vựng' }, 
                { value: '2,000+', label: 'Học viên' }].map(s => (
                <div key={s.label} className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all hover:-translate-y-1 flex flex-col items-center lg:items-start">
                  <div className="text-primary font-display text-2xl md:text-3xl font-extrabold">{s.value}</div>
                  <div className="text-[10px] md:text-xs font-bold text-text-muted mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mascot */}
          <div className="flex-shrink-0 w-64 lg:w-96 relative flex items-center justify-center">
            {/* Soft background glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full bg-primary/10 blur-[50px] animate-pulse pointer-events-none" />
            <div className="dl-mascot-hover relative z-10 w-full flex justify-center">
              <img src={dolphinHero} alt="DolphinLearn mascot" className="w-56 lg:w-72 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)] transition-transform duration-500 hover:scale-105 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VOCABULARY COLLECTIONS ═══ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-800">Bộ sưu tập từ vựng</h2>
              <p className="text-sm text-text-muted mt-1">Học từ vựng theo chủ đề yêu thích</p>
            </div>
            <Link to="/vocabulary" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Xem tất cả <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => (
                <div key={n} className="bg-white rounded-2xl p-6 border border-border h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.slice(0, 3).map(col => {
                const barMap = { primary: 'bg-primary', accent: 'bg-accent', success: 'bg-success' }
                return (
                  <Link to={`/vocabulary/${col.id}`} key={col.id} className="dl-card-hover bg-white rounded-2xl p-6 border border-border flex flex-col shadow-sm">
                    <div className="mb-4">
                      <h3 className="font-display font-semibold text-lg text-slate-800">{col.title}</h3>
                      <span className="text-xs text-text-muted">{col.wordCount} từ</span>
                    </div>
                    <p className="text-sm text-text-muted flex-1 mb-5">{col.description}</p>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span className="text-text-muted">Tiến độ</span>
                        <span className="text-primary">{col.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full dl-progress-animate ${barMap[col.color] || 'bg-primary'}`} style={{ width: `${col.progress}%` }} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══ DOCUMENT CATEGORIES ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-800">Danh mục tài liệu</h2>
              <p className="text-sm text-text-muted mt-1">Tìm tài liệu theo lĩnh vực quan tâm</p>
            </div>
            <Link to="/documents" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Xem tất cả <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="bg-slate-50 rounded-2xl p-5 h-28 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(cat => (
                <Link to="/documents" key={cat.id} className="dl-card-hover bg-surface rounded-2xl p-5 text-center border border-transparent hover:border-primary/20">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">{cat.icon || 'folder'}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{cat.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Sẵn sàng bắt đầu hành trình?</h2>
          <p className="text-white/80 max-w-md mx-auto mb-8">Tham gia cùng hàng ngàn học viên và chinh phục ngoại ngữ mỗi ngày</p>
          <Link to="?auth=register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-bold rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            Đăng ký miễn phí
          </Link>
        </div>
      </section>
    </>
  )
}
