import * as React from 'react'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '@/utils/get-week-days'
import * as S from './styles'

function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

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
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <S.Day>1</S.Day>
            </th>
            <th>
              <S.Day>2</S.Day>
            </th>
            <th>
              <S.Day>3</S.Day>
            </th>
          </tr>
        </tbody>
      </S.Body>
    </S.Container>
  )
}

export { Calendar }
