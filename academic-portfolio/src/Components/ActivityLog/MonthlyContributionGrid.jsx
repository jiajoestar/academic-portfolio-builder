import React, { useMemo } from 'react';

const getMonthDays = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days = []
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day))
  }

  return {
    year,
    month,
    firstDay,
    lastDay,
    days,
  }
}

const formatKey = (date) => {
  const y = date.getFullYear()
  const m = `${date.getMonth() + 1}`.padStart(2, '0')
  const d = `${date.getDate()}`.padStart(2, '0')
  return `${y}-${m}-${d}`
}

const isSameMonth = (date, year, month) => {
  return date.getFullYear() === year && date.getMonth() === month
}

const MonthlyContributionGrid = ({ activities = [] }) => {
  const { days, year, month } = getMonthDays()

  const activityMap = useMemo(() => {
    const counts = {}

    activities
      .filter((activity) => activity?.status === 'published')
      .forEach((activity) => {
        const rawDate =
          activity.publishedAt || activity.updatedAt || activity.createdAt

        if (!rawDate) return

        const date = new Date(rawDate)
        if (!isSameMonth(date, year, month)) return

        const key = formatKey(date)
        counts[key] = (counts[key] || 0) + 1
      })

    return counts
  }, [activities, year, month])

  const getLevelClass = (count) => {
    if (count === 0) return 'level-0'
    if (count === 1) return 'level-1'
    if (count <= 3) return 'level-2'
    if (count <= 5) return 'level-3'
    return 'level-4'
  }

  const monthLabel = new Date(year, month).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className='contribution-card'>
      <div className='contribution-top'>
        <h4>Published activity log</h4>
        <span>{monthLabel}</span>
      </div>

      <div className='contribution-grid'>
        {days.map((day) => {
          const key = formatKey(day)
          const count = activityMap[key] || 0

          return (
            <div
              key={key}
              className={`contribution-cell ${getLevelClass(count)}`}
              title={`${key}: ${count} published activit${count === 1 ? 'y' : 'ies'}`}
            />
          )
        })}
      </div>

      <p className='contribution-caption'>
        Blank = no published activity. Darker = more published activity.
      </p>
    </div>
  )
}

export default MonthlyContributionGrid