import { useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Quiz from './components/Quiz'
import Pricing from './components/Pricing'
import Works from './components/Works'
import Steps from './components/Steps'
import Why from './components/Why'
import Reviews from './components/Reviews'
import FinalCta from './components/FinalCta'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import PrivacyDialog from './components/PrivacyDialog'

export default function App() {
  // Политика конфиденциальности открывается модальным окном (<dialog>) из формы и подвала
  const privacyRef = useRef(null)
  const openPrivacy = () => privacyRef.current?.showModal()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Quiz onPrivacy={openPrivacy} />
        <Pricing />
        <Works />
        <Steps />
        <Why />
        <Reviews />
        <FinalCta />
        <Contacts />
      </main>
      <Footer onPrivacy={openPrivacy} />
      <PrivacyDialog dialogRef={privacyRef} />
    </>
  )
}
