import * as React from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useQueryBlockedDatesByDate } from '@/hooks/useScheduleQuery'
import { getWeekDays } from '@/utils/get-week-days'
import * as S from './styles'

const DAYS_IN_WEEK = 7

type CalendarWeek = {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

type CalendarProps = {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(() => {
    return dayjs().set('date', 1)
  })

  const router = useRouter()

  const username = String(router.query.username)

  const { data: blockedDates } = useQueryBlockedDatesByDate({
    username,
    month: currentDate.get('month'),
    year: currentDate.get('year'),
  })

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')

  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = React.useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const monthStartInSunday = firstWeekDay === 0

    /**
     * If month start in sunday we add seven days to fill in the last previous month week.
     * If not we get the days to complete the previous week.
     */
    const previousMonthFillArray = Array.from({
      length: monthStartInSunday ? DAYS_IN_WEEK : firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const daysLeftToCompleteWeek = DAYS_IN_WEEK - (lastWeekDay + 1)

    /**
     * Sum the remaining days of the week to the previous completely
     */
    const nextMonthFillArray = Array.from({
      length: daysLeftToCompleteWeek + DAYS_IN_WEEK,
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf('day').isBefore(new Date()) ||
            !!blockedDates?.blockedWeekDays.includes(date.get('day')),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % DAYS_IN_WEEK === 0

        if (isNewWeek) {
          weeks.push({
            week: index / DAYS_IN_WEEK + 1,
            days: original.slice(index, index + DAYS_IN_WEEK),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks.slice(0, 6)
  }, [currentDate, blockedDates])

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          {currentMonth} <span>{currentYear}</span>
        </S.Title>

        <S.Actions>
          <button
            type="button"
            title="Previous month"
            onClick={handlePreviousMonth}
          >
            <CaretLeft />
          </button>

          <button type="button" title="Next month" onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </S.Actions>
      </S.Header>

      <S.Body>
        <thead>
          <tr>
            {shortWeekDays.map((day) => (
              <th key={day}>{day}.</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map((day) => (
                <th key={day.date.get('date')}>
                  <S.Day
                    disabled={day.disabled}
                    onClick={() => onDateSelected(day.date.toDate())}
                  >
                    {day.date.get('date')}
                  </S.Day>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </S.Body>
    </S.Container>
  )
}

export { Calendar }
