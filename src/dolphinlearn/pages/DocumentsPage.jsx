import { useState, useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'

export default function DocumentsPage() {
  useSEO({
    title: 'Kho tài liệu ngoại ngữ miễn phí',
    description: 'Tải tài liệu luyện thi, đề thi thử, từ vựng PDF ôn thi THPT Quốc Gia, IELTS, HSK (Tiếng Anh, Tiếng Nhật, Tiếng Trung) chất lượng cao hoàn toàn miễn phí.',
    keywords: 'tài liệu tiếng anh, đề thi thử thpt, tài liệu ôn thi ielts, tài liệu tiếng nhật, tài liệu tiếng trung'
  })

  const [documents, setDocuments] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedDocId, setSelectedDocId] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, docRes] = await Promise.all([
          fetch(`${API_BASE}/api/v1/english/documents/categories`),
          fetch(`${API_BASE}/api/v1/english/documents`)
        ])

        if (!catRes.ok || !docRes.ok) throw new Error('Failed to fetch documents data')

        const catData = await catRes.json()
        const docData = await docRes.json()

        setCategories(catData.data || [])
        setDocuments(docData.data || [])
      } catch (error) {
        console.error('Error fetching documents page:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [API_BASE])

  const handleView = async (doc) => {
    try {
      await fetch(`${API_BASE}/api/v1/english/documents/${doc.id}/view`, { method: 'POST' })
      setDocuments(prev => prev.map(d => d.id === doc.id ? { ...d, views: (d.views || 0) + 1 } : d))
    } catch (error) {
      console.error('Failed to increment view count:', error)
    }
    if (doc.downloadUrl) {
      window.open(doc.downloadUrl, '_blank')
    }
  }

  const handleCopyLink = (doc) => {
    const shareUrl = `${window.location.origin}/documents?id=${doc.id}`
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setToastMessage(`Đã sao chép link tài liệu: ${doc.title}`)
        setTimeout(() => setToastMessage(''), 2500)
      })
      .catch(err => {
        console.error('Failed to copy link: ', err)
      })
  }

  useEffect(() => {
    if (!loading && documents.length > 0) {
      const queryParams = new URLSearchParams(window.location.search)
      const docId = queryParams.get('id')
      if (docId) {
        const doc = documents.find(d => Number(d.id) === Number(docId))
        if (doc) {
          setSelectedDocId(doc.id)
          // Increment views silently
          fetch(`${API_BASE}/api/v1/english/documents/${doc.id}/view`, { method: 'POST' }).catch(err => console.error(err))
          setDocuments(prev => prev.map(d => d.id === doc.id ? { ...d, views: (d.views || 0) + 1 } : d))
          // Clean URL parameters
          const newUrl = window.location.pathname
          window.history.replaceState({}, document.title, newUrl)
        }
      }
    }
  }, [loading, documents, API_BASE])

  const filtered = documents.filter(d => {
    if (selectedDocId) {
      return d.id === selectedDocId
    }
    const title = d.title || ''
    const desc = d.description || ''
    const matchSearch = title.toLowerCase().includes(search.toLowerCase()) || desc.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory ? (Number(d.categoryId) === Number(activeCategory)) : true
    return matchSearch && matchCat
  })

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Kho tài liệu</h1>
          <p className="text-text-muted">Khám phá và học tập các tài liệu ngoại ngữ chất lượng cao</p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-lg">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">search</span>
          <input type="text" className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-border focus:border-primary focus:ring-3 focus:ring-primary/10 outline-none transition-all text-sm" placeholder="Tìm kiếm tài liệu..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!activeCategory ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-text-muted border border-border hover:border-primary hover:text-primary'}`}>
            Tất cả
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${activeCategory === cat.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white text-text-muted border border-border hover:border-primary hover:text-primary'}`}>
              <span className="material-symbols-outlined text-[16px]">{cat.icon || 'folder'}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Shared Document Info Banner */}
        {selectedDocId && (
          <div className="mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between animate-fade-in shadow-sm">
            <div className="flex items-center gap-2.5 text-blue-700 font-semibold text-sm">
              <span className="material-symbols-outlined text-[20px]">info</span>
              <span>Bạn đang xem tài liệu được chia sẻ riêng biệt</span>
            </div>
            <button 
              onClick={() => setSelectedDocId(null)} 
              className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-sm"
            >
              Hiển thị tất cả tài liệu
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-border mb-4 block">search_off</span>
            <p className="text-text-muted">Không tìm thấy tài liệu nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(doc => (
              <div key={doc.id} className={`dl-card-hover rounded-2xl border p-6 flex flex-col justify-between transition-all ${selectedDocId === doc.id ? 'border-primary ring-4 ring-primary/10 bg-primary/5 shadow-md' : 'bg-white border-border'}`}>
                <div className="flex flex-col flex-1">
                  <h3 className="font-display font-semibold mb-1 text-base text-slate-800">{doc.title}</h3>
                  <p className="text-sm text-text-muted flex-1 mb-4">{doc.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>{doc.views || 0} lượt xem</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleCopyLink(doc)} 
                        className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-100 hover:text-primary transition-all flex items-center justify-center cursor-pointer"
                        title="Sao chép link chia sẻ"
                      >
                        <span className="material-symbols-outlined text-[16px]">share</span>
                      </button>
                      <button 
                        onClick={() => handleView(doc)} 
                        className="px-4 py-2 bg-primary/5 text-primary text-xs font-semibold rounded-full hover:bg-primary hover:text-white transition-all"
                      >
                        Xem
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-slate-900/95 backdrop-blur text-white text-xs md:text-sm font-bold px-5 py-3 rounded-2xl shadow-2xl z-[9999] flex items-center gap-2 transition-all duration-300 transform translate-y-0">
            <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
