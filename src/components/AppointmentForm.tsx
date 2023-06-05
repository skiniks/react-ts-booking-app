interface AppointmentFormProps {
  selectedDateId: number | null
  bookingStatus: string | null
  onBookingStatusChange: (status: string | null) => void
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedDateId, bookingStatus, onBookingStatusChange }) => {
  const [name, setName] = useState<string>(() => {
    const savedBookingStatus = localStorage.getItem('bookingStatus')
    if (savedBookingStatus) {
      const { name } = JSON.parse(savedBookingStatus)
      return name
    }
    return ''
  })

  const [email, setEmail] = useState<string>(() => {
    const savedBookingStatus = localStorage.getItem('bookingStatus')
    if (savedBookingStatus) {
      const { email } = JSON.parse(savedBookingStatus)
      return email
    }
    return ''
  })

  const [error, setError] = useState<string | null>(null)

  const dates: Appointment[] = useCalendar()
  const selectedDate = dates.find(date => date.id === selectedDateId)

  useEffect(() => {
    const savedBookingStatus = localStorage.getItem('bookingStatus')
    try {
      if (savedBookingStatus)
        onBookingStatusChange(savedBookingStatus)
    }
    catch (error) {
      console.error('Error parsing saved booking status', error)
    }
  }, [])

  const { bookAppointment, cancelAppointment, loading: appointmentLoading } = useAppointment()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) {
      setError('Please fill in your name and email')
      return
    }
    if (selectedDateId && selectedDate) {
      const result = await bookAppointment(selectedDateId, name, email)
      if (result) {
        const formattedTime = new Date(selectedDate.date).toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' })
        const appointmentDate = new Date(selectedDate.date)
        const formattedDate = appointmentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
        const formattedDateTime = `${formattedDate} at ${formattedTime}`
        onBookingStatusChange(JSON.stringify({ name, email, date: formattedDateTime, selectedDateId }))
        localStorage.setItem(
          'bookingStatus',
          JSON.stringify({ name, email, date: formattedDateTime, selectedDateId }),
        )
        setError(null)
      }
    }
  }

  const onCancel = async () => {
    const savedBookingStatus = localStorage.getItem('bookingStatus')
    let selectedDateId

    if (savedBookingStatus) {
      const parsedSavedBookingStatus = JSON.parse(savedBookingStatus)
      selectedDateId = parsedSavedBookingStatus.selectedDateId
    }

    if (selectedDateId) {
      const result = await cancelAppointment(selectedDateId)
      if (result) {
        onBookingStatusChange(null)
        localStorage.removeItem('bookingStatus')
      }
    }
  }

  const formattedDate = bookingStatus ? JSON.parse(bookingStatus).date : ''

  return (
    <form onSubmit={onSubmit} className="bg-blue-100 m-6 p-12 rounded-2xl shadow-2xl font-mono">
      <h2 className="text-xl font-bold mb-2 text-blue-800">Attendee Details</h2>
      {bookingStatus
        ? (
          <div className="text-blue-800">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Date: {formattedDate}</p>
            <button
              type="button"
              className="mt-4 px-4 py-3 bg-red-700 hover:bg-red-800 text-white text-sm rounded"
              onClick={onCancel}
              disabled={appointmentLoading}
            >
              Cancel
            </button>
          </div>
          )
        : (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mr-4 text-sm">
              <label htmlFor="name" className="block mb-2 text-blue-800">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="md:w-1/2 mb-4 text-sm">
              <label htmlFor="email" className="block mb-2 text-blue-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          )}

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {!bookingStatus && (
        <button
          type="submit"
          className="px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm rounded"
          disabled={appointmentLoading}
        >
          Submit
        </button>
      )}
    </form>
  )
}

export default AppointmentForm
