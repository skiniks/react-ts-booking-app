interface CalendarProps {
  selectedDateId: number | null
  onDateSelection: (id: number | null) => void
}

const Calendar: React.FC<CalendarProps> = ({ selectedDateId, onDateSelection }) => {
  const dates: Appointment[] = useCalendar()
  const bookedDateIds = dates.filter(date => date.appointment).map(date => date.id)
  const filteredDates = dates.filter(date => !bookedDateIds.includes(date.id))
  const sortedDates = filteredDates
    .filter((date: Appointment) => new Date(date.date).getTime() >= new Date().getTime())
    .sort((a: Appointment, b: Appointment) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="h-64 bg-blue-100 m-6 p-12 rounded-2xl shadow-2xl font-mono overflow-x-auto whitespace-nowrap">
      <h2 className="text-xl font-bold mb-2 text-blue-800">Availabilities</h2>
      <div className="flex space-x-4">
        {sortedDates.map((date) => {
          const dateObject = new Date(date.date)
          const dayOfWeek = dateObject.toLocaleDateString(undefined, { weekday: 'short' })
          const month = dateObject.toLocaleDateString(undefined, { month: 'long' })
          const day = dateObject.toLocaleDateString(undefined, { day: 'numeric' })
          const formattedTime = dateObject.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })

          return (
            <button
              key={date.id}
              onClick={() => onDateSelection(date.id)}
              className={`cursor-pointer p-4 rounded-lg shadow-md ${
                selectedDateId === date.id ? 'bg-blue-700 text-white' : 'bg-blue-300 hover:bg-blue-400 text-blue-800 disabled:cursor-not-allowed disabled:hover:bg-blue-300'
              } inline-block text-center`}
            >
              <div className="uppercase text-sm">{dayOfWeek}</div>
              <div className="font-bold uppercase text-md">{month}</div>
              <div className="text-xl">{day}</div>
              <div className="text-sm">{formattedTime}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
