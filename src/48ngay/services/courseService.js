import { getCurrentUser } from './authService'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export const LESSON_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
}

// Transform backend lesson model to match frontend expectations
function mapLesson(backendLesson) {
  if (!backendLesson) return null;
  return {
    day: backendLesson.day,
    title: backendLesson.title,
    resources: {
      video: backendLesson.videoUrl,
      documents: backendLesson.documentUrl,
      exercises: backendLesson.exerciseUrl,
      answers: backendLesson.answerUrl,
    },
    vocabularies: (backendLesson.vocabularies || []).map((v) => ({
      id: v.vocabId || String(v.id),
      word: v.word,
      phonetic: v.phonetic,
      pronunciation: v.phonetic,
      meaning: v.meaning,
      example: v.example,
      exampleMeaning: v.exampleMeaning,
      options: v.optionsList ? v.optionsList.split(';') : [],
      correctAnswer: v.correctAnswer,
    })),
  };
}

export async function getCourseDays() {
  try {
    const response = await fetch(`${API_BASE}/api/v1/english/lessons`)
    if (!response.ok) throw new Error('Failed to fetch lessons')
    const resObj = await response.json()
    return resObj.data || []
  } catch (error) {
    console.error('Error fetching course days:', error)
    return []
  }
}

export async function getLessonByDay(day) {
  try {
    const dayNumber = Number(day)
    const response = await fetch(`${API_BASE}/api/v1/english/lessons/${dayNumber}`)
    if (!response.ok) throw new Error('Failed to fetch lesson')
    const resObj = await response.json()
    return mapLesson(resObj.data)
  } catch (error) {
    console.error(`Error fetching lesson ${day}:`, error)
    return null
  }
}

export async function getProgress() {
  const user = getCurrentUser()
  if (!user || !user.email) return {}

  try {
    const response = await fetch(`${API_BASE}/api/v1/english/progress?username=${encodeURIComponent(user.email)}`)
    if (!response.ok) throw new Error('Failed to fetch progress')
    const resObj = await response.json()
    const progressList = resObj.data || []
    
    const progressMap = {}
    progressList.forEach((item) => {
      progressMap[item.day] = item.status
    })
    return progressMap
  } catch (error) {
    console.error('Error fetching progress:', error)
    return {}
  }
}

export async function isVocabLearned(day) {
  const user = getCurrentUser()
  if (!user || !user.email) return false

  try {
    const response = await fetch(`${API_BASE}/api/v1/english/progress?username=${encodeURIComponent(user.email)}`)
    if (!response.ok) return false
    const resObj = await response.json()
    const progressList = resObj.data || []
    const dayProgress = progressList.find(item => item.day === Number(day))
    return dayProgress ? !!dayProgress.vocabLearned : false
  } catch {
    return false
  }
}

export async function setDayStatus(day, status, vocabLearned = null) {
  const user = getCurrentUser()
  if (!user || !user.email) return {}

  try {
    const payload = {
      username: user.email,
      day: Number(day),
      status: status,
    }
    if (vocabLearned !== null) {
      payload.vocabLearned = vocabLearned
    }

    const response = await fetch(`${API_BASE}/api/v1/english/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Failed to update progress')
    
    // Fetch and return the updated progress map
    return getProgress()
  } catch (error) {
    console.error('Error setting day status:', error)
    return {}
  }
}

export async function ensureDayInProgress(day) {
  const user = getCurrentUser()
  if (!user || !user.email) return {}

  try {
    // Fetch current progress first
    const progress = await getProgress()
    const dayNumber = Number(day)

    if (!progress[dayNumber]) {
      return await setDayStatus(dayNumber, LESSON_STATUS.IN_PROGRESS)
    }

    return progress
  } catch (error) {
    console.error('Error in ensureDayInProgress:', error)
    return {}
  }
}

export function calculateProgress(progress, totalLessonsCount = 48) {
  const completed = Object.values(progress).filter(
    (status) => status === LESSON_STATUS.COMPLETED,
  ).length
  const percentage = totalLessonsCount > 0 ? Math.round((completed / totalLessonsCount) * 100) : 0

  return {
    total: totalLessonsCount,
    completed,
    percentage,
  }
}
