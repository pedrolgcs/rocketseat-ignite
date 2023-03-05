import * as React from 'react'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '@/utils/get-week-days'
import * as S from './styles'

type CalendarWeek = {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')

  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = React.useMemo(() => {
    const daysInWeek = 7

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    // 0 - 6
    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay === 0 ? firstWeekDay + 7 : firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    // 0 - 6
    const lasWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length:
        previousMonthFillArray.length === 7
          ? 7 - (lasWeekDay + 1)
          : 7 - (lasWeekDay + 1) + 7,
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return { date, disabled: false }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % daysInWeek === 0

        if (isNewWeek) {
          weeks.push({
            week: index / daysInWeek + 1,
            days: original.slice(index, index + daysInWeek),
          })
        }

        return weeks
      },
      [],
    )

    const calendarWeeksWithoutExtraWeeks = calendarWeeks.slice(0, 6)

    return calendarWeeksWithoutExtraWeeks
  }, [currentDate])

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
                  <S.Day disabled={day.disabled}>{day.date.get('date')}</S.Day>
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
