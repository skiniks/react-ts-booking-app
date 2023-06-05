export function useAppointment() {
  const [loading, setLoading] = useState(false)

  const bookAppointment = async (dateId: number, name: string, email: string) => {
    setLoading(true)
    const { error } = await supabase
      .from('appointments')
      .insert([{ date_id: dateId, name, email }])
    setLoading(false)

    if (error) {
      console.error('error', error)
      return false
    }

    return true
  }

  const cancelAppointment = async (dateId: number) => {
    setLoading(true)
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('date_id', dateId)
    setLoading(false)

    if (error) {
      console.error('error', error)
      return false
    }

    return true
  }

  return { bookAppointment, cancelAppointment, loading }
}
