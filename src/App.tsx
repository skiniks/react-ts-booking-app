const App: React.FC = () => {
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null)
  const [bookingStatus, setBookingStatus] = useState<string | null>(localStorage.getItem('bookingStatus'))

  const handleDateSelection = (id: number | null) => {
    if (bookingStatus === null)
      setSelectedDateId(id)
  }

  const handleBookingStatusChange = (status: string | null) => {
    setBookingStatus(status)
  }

  return (
    <div className="flex flex-col justify-center" style={{ minHeight: '100vh' }}>
      {!bookingStatus && (
        <div className="w-full md:w-2xl mx-auto">
          <Calendar selectedDateId={selectedDateId} onDateSelection={handleDateSelection} />
        </div>
      )}
      {(selectedDateId !== null || bookingStatus !== null) && (
        <div className="w-full md:w-2xl mx-auto">
          <AppointmentForm selectedDateId={selectedDateId} bookingStatus={bookingStatus} onBookingStatusChange={handleBookingStatusChange} />
        </div>
      )}
    </div>
  )
}

export default App
