import * as React from 'react'
import { Calendar } from '@/components'
import * as S from './styles'

function CalendarStep() {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const handleChangeSelectedDate = (date: Date) => {
    if (selectedDate?.getTime() === date.getTime()) {
      return setSelectedDate(null)
    }

    return setSelectedDate(date)
  }

  return (
    <S.Container isTimePickerOpen={isDateSelected}>
      <Calendar
        selectedDate={selectedDate}
        onDateSelected={handleChangeSelectedDate}
      />

      {isDateSelected && (
        <S.TimePicker>
          <S.TimePickerHeader>
            terça-feira <span>20 de setembro</span>
          </S.TimePickerHeader>

          <S.TimePickerList>
            <S.TimePickerItem>08:00</S.TimePickerItem>
            <S.TimePickerItem>09:00</S.TimePickerItem>
            <S.TimePickerItem>10:00</S.TimePickerItem>
            <S.TimePickerItem>11:00</S.TimePickerItem>
            <S.TimePickerItem>12:00</S.TimePickerItem>
            <S.TimePickerItem>13:00</S.TimePickerItem>
            <S.TimePickerItem>14:00</S.TimePickerItem>
            <S.TimePickerItem>15:00</S.TimePickerItem>
            <S.TimePickerItem>16:00</S.TimePickerItem>
            <S.TimePickerItem>17:00</S.TimePickerItem>
          </S.TimePickerList>
        </S.TimePicker>
      )}
    </S.Container>
  )
}

export { CalendarStep }
