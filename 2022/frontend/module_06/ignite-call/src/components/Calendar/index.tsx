import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '@/utils/get-week-days'
import * as S from './styles'

function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          Dezembro <span>2022</span>
        </S.Title>

        <S.Actions>
          <button type="button">
            <CaretLeft />
          </button>

          <button type="button">
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
