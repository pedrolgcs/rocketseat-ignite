import * as React from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { Calendar } from '@/components'
import { useQueryAvailabilityByDate } from '@/hooks/useScheduleQuery'
import * as S from './styles'

type CalendarStepProps = {
  onSelectDateTime: (date: Date) => void
}

function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)

  const router = useRouter()

  const username = String(router.query.username)

  const { data: availability, isLoading: isLoadingAvailability } =
    useQueryAvailabilityByDate({ date: selectedDate, username })

  const isDateSelected = !!selectedDate

  const describedDate = {
    day: isDateSelected ? dayjs(selectedDate).format('dddd') : null,
    month: isDateSelected ? dayjs(selectedDate).format('DD[ de ]MMMM') : null,
  }

  const handleChangeSelectedDate = (date: Date) => {
    if (selectedDate?.getTime() === date.getTime()) {
      return setSelectedDate(null)
    }

    return setSelectedDate(date)
  }

  const handleSelectTime = (hour: number) => {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
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
            {describedDate.day} <span>{describedDate.month}</span>
          </S.TimePickerHeader>

          {isLoadingAvailability ? (
            <S.TimePickerListSkeleton>
              <S.TimePickerItemSkeleton count={10} />
            </S.TimePickerListSkeleton>
          ) : (
            <S.TimePickerList>
              {availability?.possibleTimes.map((hour) => (
                <S.TimePickerItem
                  key={hour}
                  onClick={() => handleSelectTime(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00
                </S.TimePickerItem>
              ))}
            </S.TimePickerList>
          )}
        </S.TimePicker>
      )}
    </S.Container>
  )
}

export { CalendarStep }
