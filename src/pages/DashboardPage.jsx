import DayCard from '../components/DayCard'
import ProgressBar from '../components/ProgressBar'
import {
  calculateProgress,
  getCourseDays,
  getProgress,
  LESSON_STATUS,
} from '../services/courseService'

function DashboardPage() {
  const days = getCourseDays()
  const progress = getProgress()
  const progressSummary = calculateProgress(progress)

  return (
    <section>
      <ProgressBar
        completed={progressSummary.completed}
        total={progressSummary.total}
        percentage={progressSummary.percentage}
      />

      <div className="day-grid">
        {days.map((item) => (
          <DayCard
            key={item.day}
            day={item.day}
            title={item.title}
            status={progress[item.day] ?? LESSON_STATUS.NOT_STARTED}
          />
        ))}
      </div>
    </section>
  )
}

export default DashboardPage
