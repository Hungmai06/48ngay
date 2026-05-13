import courseData from '../data/course.json'

const PROGRESS_KEY = 'english48.progress'

export const LESSON_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
}

export function getCourseDays() {
  return courseData
}

export function getLessonByDay(day) {
  const dayNumber = Number(day)
  return courseData.find((item) => item.day === dayNumber) ?? null
}

export function getProgress() {
  const raw = localStorage.getItem(PROGRESS_KEY)
  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function setDayStatus(day, status) {
  const current = getProgress()
  const dayNumber = Number(day)
  const next = {
    ...current,
    [dayNumber]: status,
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
  return next
}

export function ensureDayInProgress(day) {
  const progress = getProgress()
  const dayNumber = Number(day)

  if (!progress[dayNumber]) {
    return setDayStatus(dayNumber, LESSON_STATUS.IN_PROGRESS)
  }

  return progress
}

export function calculateProgress(progress) {
  const total = courseData.length
  const completed = Object.values(progress).filter(
    (status) => status === LESSON_STATUS.COMPLETED,
  ).length
  const percentage = Math.round((completed / total) * 100)

  return {
    total,
    completed,
    percentage,
  }
}
