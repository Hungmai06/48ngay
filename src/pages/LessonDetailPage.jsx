import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ResourceFrame from '../components/ResourceFrame'
import Tabs from '../components/Tabs'
import VocabularyModule from '../components/VocabularyModule'
import { ensureDayInProgress, getLessonByDay } from '../services/courseService'

const tabs = [
  { value: 'video', label: 'Video' },
  { value: 'documents', label: 'Tài liệu' },
  { value: 'exercises', label: 'Bài tập' },
  { value: 'answers', label: 'Đáp án' },
  { value: 'vocab', label: 'Từ vựng' },
]

function LessonDetailPage() {
  const { day } = useParams()
  const [activeTab, setActiveTab] = useState('video')
  const lesson = useMemo(() => getLessonByDay(day), [day])

  useEffect(() => {
    ensureDayInProgress(day)
  }, [day])

  if (!lesson) {
    return (
      <section className="panel">
        <p>Không tìm thấy bài học.</p>
        <Link to="/" className="btn">
          Quay về dashboard
        </Link>
      </section>
    )
  }

  return (
    <section className="panel">
      <Link to="/" className="back-link">
        ← Về dashboard
      </Link>
      <h1>
        Day {lesson.day}: {lesson.title}
      </h1>
      <p>{lesson.description}</p>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="tab-content">
        {activeTab === 'video' && (
          <ResourceFrame title="Video bài học" link={lesson.resources.video} />
        )}

        {activeTab === 'documents' && (
          <ResourceFrame title="Tài liệu PDF" link={lesson.resources.documents} />
        )}

        {activeTab === 'exercises' && (
          <ResourceFrame title="Bài tập" link={lesson.resources.exercises} />
        )}

        {activeTab === 'answers' && (
          <ResourceFrame title="Đáp án" link={lesson.resources.answers} />
        )}

        {activeTab === 'vocab' && (
          <VocabularyModule day={lesson.day} words={lesson.vocabularies} />
        )}
      </div>
    </section>
  )
}

export default LessonDetailPage
