import { useCallback, useRef, useState } from 'react'
import { data } from './data'
import Header from './components/Header'
import Hero from './components/Hero'
import Why from './components/Why'
import Services from './components/Services'
import Masters from './components/Masters'
import Works from './components/Works'
import Gift from './components/Gift'
import Reviews from './components/Reviews'
import Faq from './components/Faq'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import BookBar from './components/BookBar'
import BookingModal from './components/BookingModal'
import PrivacyDialog from './components/PrivacyDialog'

export default function App() {
  const [booking, setBooking] = useState({ open: false, preset: null })
  const privacyRef = useRef(null)

  // Все кнопки «Записаться» ведут сюда. Если у салона есть YCLIENTS/DIKIDI —
  // открываем их виджет, иначе — встроенную запись.
  const openBooking = (preset = null) => {
    if (data.booking.externalUrl) {
      window.open(data.booking.externalUrl, '_blank', 'noopener')
      return
    }
    setBooking({ open: true, preset })
  }
  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, open: false })), [])
  const openPrivacy = () => privacyRef.current?.showModal()

  return (
    <>
      <Header onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <Why />
        <Services onBook={openBooking} />
        <Masters onBook={openBooking} />
        <Works />
        <Gift />
        <Reviews />
        <Faq />
        <Contacts onBook={openBooking} />
      </main>
      <Footer onPrivacy={openPrivacy} />

      {!booking.open && <BookBar onBook={openBooking} />}
      <BookingModal open={booking.open} preset={booking.preset} onClose={closeBooking} onPrivacy={openPrivacy} />
      <PrivacyDialog dialogRef={privacyRef} />
    </>
  )
}
