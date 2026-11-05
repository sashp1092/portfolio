import { useCallback, useRef, useState } from 'react'
import { data } from './data'
import { useCart } from './useCart'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import HowToOrder from './components/HowToOrder'
import Breakfasts from './components/Breakfasts'
import About from './components/About'
import Reviews from './components/Reviews'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import CartBar from './components/CartBar'
import CartDrawer from './components/CartDrawer'
import PrivacyDialog from './components/PrivacyDialog'

export default function App() {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [tab, setTab] = useState(data.menu.categories[0].id)
  const privacyRef = useRef(null)

  const openPrivacy = () => privacyRef.current?.showModal()
  const closeCart = useCallback(() => setCartOpen(false), [])

  return (
    <>
      <Header count={cart.count} onCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Menu cart={cart} tab={tab} onTab={setTab} />
        <HowToOrder />
        <div className="py-14 md:py-20">
          <Breakfasts onShow={() => setTab('breakfast')} />
        </div>
        <About />
        <Reviews />
        <Contacts />
      </main>
      <Footer onPrivacy={openPrivacy} />

      {!cartOpen && <CartBar count={cart.count} total={cart.total} onOpen={() => setCartOpen(true)} />}
      <CartDrawer open={cartOpen} onClose={closeCart} cart={cart} onPrivacy={openPrivacy} />
      <PrivacyDialog dialogRef={privacyRef} />
    </>
  )
}
