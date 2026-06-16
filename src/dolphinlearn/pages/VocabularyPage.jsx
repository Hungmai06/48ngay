import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDlCurrentUser } from '../../48ngay/services/authService'
import { useSEO } from '../hooks/useSEO'

export default function VocabularyPage() {
  useSEO({
    title: 'Học từ vựng ngoại ngữ theo chủ đề',
    description: 'Học từ vựng Tiếng Anh, Tiếng Nhật, Tiếng Trung theo chủ đề với lộ trình ghi nhớ hiệu quả, lưu trữ tiến độ thông minh và bảng xếp hạng thi đua.',
    keywords: 'từ vựng tiếng anh, học từ vựng theo chủ đề, từ vựng tiếng nhật, học tiếng trung'
  })

  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

  useEffect(() => {
    async function fetchData() {
      try {
        const user = getDlCurrentUser()
        const email = user?.email || ''

        // Fetch collections
        const colRes = await fetch(`${API_BASE}/api/v1/english/vocabulary/collections`)
        if (!colRes.ok) throw new Error('Failed to fetch collections')
        const colData = await colRes.json()
        const fetchedCollections = colData.data || []

        // Fetch user progress
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
            // Intersection of words and learned words to be safe
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
      } catch (error) {
        console.error('Error fetching vocabulary page data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [API_BASE])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-secondary via-ocean-50 to-surface min-h-screen py-10">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-300/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Bộ sưu tập từ vựng</h1>
          <p className="text-text-muted">Chọn bộ sưu tập và bắt đầu học theo phương pháp yêu thích</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(col => {
            const colorMap = { primary: 'bg-primary/10 text-primary', accent: 'bg-accent/20 text-accent-dark', success: 'bg-success/10 text-success' }
            const barMap = { primary: 'bg-primary', accent: 'bg-accent', success: 'bg-success' }
            return (
              <div key={col.id} className="dl-card-hover bg-white rounded-2xl p-6 border border-border flex flex-col shadow-sm">
                <div className="mb-4">
                  <h3 className="font-display font-semibold text-lg">{col.title}</h3>
                  <span className="text-xs text-text-muted">{col.wordCount} từ vựng</span>
                </div>
                <p className="text-sm text-text-muted flex-1 mb-5">{col.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-text-muted">Tiến độ</span>
                    <span className="text-primary">{col.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full dl-progress-animate ${barMap[col.color] || 'bg-primary'}`} style={{ width: `${col.progress}%` }} />
                  </div>
                </div>

                <Link to={`/vocabulary/${col.id}`} className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark hover:shadow-md hover:shadow-primary/20 transition-all text-center flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">list_alt</span>
                  Xem các chủ đề
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
