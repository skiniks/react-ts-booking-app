export function useCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [dates, setDates] = useState<Appointment[]>([])

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase.from('appointments').select('date_id')
      if (error) {
        console.error('Error fetching appointments:', error)
        return
      }
      setAppointments(data as Appointment[])
    }

    const fetchDates = async () => {
      const { data, error } = await supabase.from('dates').select('*')
      if (error) {
        console.error('Error fetching dates:', error)
        return
      }
      setDates(data as Appointment[])
    }

    fetchAppointments()
    fetchDates()
  }, [])

  const mergedData = dates.map((date) => {
    const appointment = appointments.find(appt => appt.date_id === date.id)
    return { ...date, appointment: !!appointment }
  })

  return mergedData
}
