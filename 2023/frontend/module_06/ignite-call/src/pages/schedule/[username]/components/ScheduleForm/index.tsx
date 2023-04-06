import * as React from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmScheduleStep } from './ConfirmScheduleStep'

function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | null>(
    null,
  )

  const handleResetSelectedDateTime = () => {
    setSelectedDateTime(null)
  }

  return (
    <>
      {selectedDateTime ? (
        <ConfirmScheduleStep
          schedulingDate={selectedDateTime}
          onResetConfirmation={handleResetSelectedDateTime}
        />
      ) : (
        <CalendarStep onSelectDateTime={setSelectedDateTime} />
      )}
    </>
  )
}

export { ScheduleForm }
