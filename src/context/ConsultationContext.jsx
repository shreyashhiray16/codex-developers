import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ConsultationContext = createContext(null)

export const ConsultationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openConsultation = useCallback(() => setIsOpen(true), [])
  const closeConsultation = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, openConsultation, closeConsultation }),
    [isOpen, openConsultation, closeConsultation],
  )

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  )
}

export const useConsultation = () => {
  const context = useContext(ConsultationContext)
  if (!context) {
    throw new Error('useConsultation must be used within ConsultationProvider')
  }
  return context
}
