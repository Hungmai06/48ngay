import { useCallback, useState } from 'react'

const pronunciationMap = {
  foundation: '/faʊnˈdeɪʃən/',
  habit: '/ˈhæbɪt/',
  review: '/rɪˈvjuː/',
  confidence: '/ˈkɑːnfɪdəns/',
}

export default function Flashcard({ word }) {
  const [flipped, setFlipped] = useState(false)

  const speakWord = useCallback((event) => {
    event.stopPropagation()

    if (!word || !window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(word.word)
    utterance.lang = 'en-US'
    utterance.rate = 0.95
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }, [word])

  if (!word) return null

  const pronunciation = word.pronunciation ?? pronunciationMap[word.word] ?? ''

  return (
    <div className="flashcard-wrap">
      <div
        role="button"
        tabIndex={0}
        className={`flip-card ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setFlipped((s) => !s)
        }}
        aria-pressed={flipped}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="flashcard-topline">
              <span className="flashcard-tag">Từ vựng</span>
              <button type="button" className="flashcard-listen" onClick={speakWord}>
                Nghe
              </button>
            </div>

            <div className="flashcard-word">{word.word}</div>

            {pronunciation ? (
              <div className="flashcard-pron">{pronunciation}</div>
            ) : (
              <div className="flashcard-pron flashcard-pron-empty">Bấm nghe để luyện phát âm</div>
            )}

            <div className="flashcard-hint">Chạm vào thẻ để xem nghĩa</div>
          </div>
          <div className="flip-card-back">
            <div className="flashcard-back-badge">Nghĩa</div>
            <div className="flashcard-meaning">{word.meaning}</div>
            {word.example && (
              <div className="flashcard-example">{word.example}</div>
            )}
            <button type="button" className="flashcard-replay" onClick={speakWord}>
              Nghe lại
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
