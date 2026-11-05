import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Quote from './components/Quote'
import TelegramBanner from './components/TelegramBanner'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Gallery />
        <Team />
        <Quote />
        <TelegramBanner />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
