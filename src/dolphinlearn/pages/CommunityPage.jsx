import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../48ngay/hooks/useAuth'
import { useSEO } from '../hooks/useSEO'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export default function CommunityPage() {
  useSEO({
    title: 'Cộng đồng học tập ngoại ngữ',
    description: 'Kết nối và giao lưu trực tuyến cùng hàng ngàn học viên DolphinLearn. Tham gia trò chuyện cộng đồng, thảo luận học tập và gia nhập các nhóm Zalo/Facebook chia sẻ tài liệu miễn phí.',
    keywords: 'cộng đồng dolphinlearn, trò chuyện cộng đồng, nhóm học tiếng anh, nhóm học tiếng nhật, nhóm học tiếng trung'
  })

  const { isDlLoggedIn, dlUser } = useAuth()
  const [newMsg, setNewMsg] = useState('')
  const chatEndRef = useRef(null)
  const chatContainerRef = useRef(null)
  const [messages, setMessages] = useState([])
  const isNearBottomRef = useRef(true) // track xem user có đang ở gần cuối không

  // Fetch chat messages from backend with polling
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/english/chat/messages`)
        if (res.ok) {
          const data = await res.json()
          if (data.code === 200 && data.data) {
            const formatted = data.data.map(msg => ({
              id: msg.id,
              sender: msg.sender,
              avatar: msg.avatar,
              text: msg.text,
              time: msg.time,
              isAdmin: msg.isAdmin,
              isMe: dlUser && msg.senderEmail === dlUser.email
            }))
            setMessages(formatted)
          }
        }
      } catch (err) {
        console.error('Error fetching chat messages:', err)
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 3000) // Poll every 3 seconds

    return () => clearInterval(interval)
  }, [dlUser])

  // Auto scroll xuống cuối - chỉ khi user đang ở gần cuối
  useEffect(() => {
    if (isNearBottomRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Theo dõi vị trí scroll của user
  const handleChatScroll = () => {
    const container = chatContainerRef.current
    if (!container) return
    const threshold = 100 // px từ cuối
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight
    isNearBottomRef.current = distanceFromBottom <= threshold
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!newMsg.trim() || !isDlLoggedIn) return

    // Khi user tự gửi tin → cuộn xuống cuối
    isNearBottomRef.current = true

    try {
      const response = await fetch(`${API_BASE}/api/v1/english/chat/messages?email=${encodeURIComponent(dlUser.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newMsg })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.code === 201 && result.data) {
          const newFormatted = {
            id: result.data.id,
            sender: result.data.sender,
            avatar: result.data.avatar,
            text: result.data.text,
            time: result.data.time,
            isAdmin: result.data.isAdmin,
            isMe: true
          }
          setMessages(prev => [...prev, newFormatted])
          setNewMsg('')
        }
      }
    } catch (err) {
      console.error('Error sending message:', err)
    }
  }

  const socialLinks = [
    {
      name: 'Facebook Fanpage',
      desc: 'Cập nhật tin tức học tập mới nhất.',
      icon: 'public',
      color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100/50',
      actionText: 'Theo dõi Trang',
      link: 'https://facebook.com/dolphinlearn'
    },
    {
      name: 'Facebook Group',
      desc: 'Thảo luận cùng 15,000+ thành viên.',
      icon: 'groups',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100/50',
      actionText: 'Tham gia Nhóm',
      link: 'https://facebook.com/groups/dolphinlearn'
    },
    {
      name: 'Nhóm Zalo Học Tập',
      desc: 'Nhận tài liệu PDF độc quyền mỗi ngày.',
      icon: 'chat',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-100/50',
      actionText: 'Vào Nhóm Zalo',
      link: 'https://zalo.me/g/dolphinlearn'
    },
    {
      name: 'Kênh Youtube',
      desc: 'Video giảng dạy từ vựng sinh động.',
      icon: 'video_library',
      color: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100/50',
      actionText: 'Đăng ký Kênh',
      link: 'https://youtube.com/c/dolphinlearn'
    }
  ]

  const announcements = [
    {
      tag: 'Sự kiện',
      tagColor: 'bg-emerald-50 text-emerald-600',
      title: 'Chiến dịch "90 ngày bứt phá cùng DolphinLearn" chính thức khởi động!',
      desc: 'Học tập để nhận huy hiệu và quà tặng giá trị.',
      time: '2 giờ trước'
    },
    {
      tag: 'Tài liệu',
      tagColor: 'bg-amber-50 text-amber-600',
      title: 'Chia sẻ bộ Flashcard 2000 từ vựng cốt lõi (PDF)',
      desc: 'Tải miễn phí tại tab Tài liệu.',
      time: '1 ngày trước'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-primary/10">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black tracking-wider uppercase">Cộng đồng DolphinLearn</span>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Học ngoại ngữ cùng hàng ngàn học viên mỗi ngày!
          </h1>
          <p className="text-white/80 text-sm leading-relaxed">
            Tham gia các nhóm trao đổi học tập, giao lưu cùng thầy cô bản xứ và bạn bè trên khắp cả nước để cùng tiến bộ nhanh hơn.
          </p>
        </div>
        
        {/* Background Decorative Circles */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/30 blur-2xl pointer-events-none" />
      </div>

      {/* Grid of Social Channels */}
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-xl font-black text-slate-800">Kênh truyền thông & Nhóm học tập</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">Kết nối với chúng tôi qua các nền tảng mạng xã hội</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${item.color.split(' ')[0]} ${item.color.split(' ')[1]} ${item.color.split(' ')[2]}`}>
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-base font-black text-slate-800 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <a 
                href={item.link} 
                target="_blank" 
                rel="noreferrer"
                className={`mt-6 w-full text-center py-2.5 rounded-xl text-xs font-bold transition-all border block ${item.color.split(' ')[0]} ${item.color.split(' ')[1]} ${item.color.split(' ')[2]} hover:shadow-md`}
              >
                {item.actionText}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Chat Room */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-display text-xl font-black text-slate-800">Trò chuyện cộng đồng</h2>
            <p className="text-xs text-slate-400 font-bold mt-1">Giao lưu trực tuyến cùng các học viên khác</p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            142 học viên trực tuyến
          </span>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col h-[520px] overflow-hidden relative">
          
          {/* Message List */}
          <div 
            ref={chatContainerRef}
            onScroll={handleChatScroll}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-start gap-3 ${msg.isMe ? 'flex-row-reverse' : ''} animate-fade-in`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 shadow-sm ${msg.isAdmin ? 'bg-amber-500 text-white' : msg.isMe ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {msg.avatar}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1 max-w-[70%]">
                  <div className={`flex items-center gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-extrabold text-slate-600">{msg.sender}</span>
                    {msg.isAdmin && (
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[8px] font-black uppercase">Admin</span>
                    )}
                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                  </div>

                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${msg.isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-100 bg-white relative">
            {isDlLoggedIn ? (
              <form onSubmit={handleSend} className="flex gap-2">
                <input 
                  type="text" 
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Nhập tin nhắn trò chuyện cùng cộng đồng..."
                  className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
                <button 
                  type="submit"
                  className="p-3 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-md shadow-primary/20 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            ) : (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4 z-10">
                <div className="text-center space-y-2">
                  <p className="text-xs font-black text-slate-800">Đăng nhập để tham gia trò chuyện cùng cộng đồng!</p>
                  <Link 
                    to="?auth=login" 
                    className="inline-block px-5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-black rounded-xl shadow-md shadow-primary/20 hover:shadow-lg transition-all"
                  >
                    Đăng nhập ngay
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
