        'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bike, Car, Truck, Package } from 'lucide-react'
import Cookies from "js-cookie"


import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '../ui/navigation-menu'

import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setUserExist } from '@/store/userloginslice/userloginslice'
import { useParams, useRouter } from 'next/navigation'
import { setUserDetail } from '@/store/userdetailslice/userdetailslice'
import { json } from 'node:stream/consumers'

const services = [
  {
    name: 'Bike Taxi',
    description: 'Quick and affordable two-wheeler rides',
    icon: Bike,
    href: '/booking?service=bike'
  },
  {
    name: 'Car Taxi',
    description: 'Comfortable sedan and SUV rides',
    icon: Car,
    href: '/booking?service=car'
  },
  {
    name: 'Loading Vehicle',
    description: 'Trucks and tempos for heavy cargo',
    icon: Truck,
    href: '/booking?service=loading'
  },
  {
    name: 'Parcel Delivery',
    description: 'Same-day and scheduled deliveries',
    icon: Package,
    href: '/parcel'
  }
]

export function Navbar () {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const lastScrollY = useRef(0)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Top pe ho toh hamesha show rahe
      if (currentScrollY < 50) {
        setDirection('down')
      } else if (currentScrollY > lastScrollY.current) {
        setDirection('up') // scroll DOWN → show
      } else {
        setDirection('down') // scroll UP → hide
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const ifuserexiist = useSelector((state: any) => state.userExist.value)
  const usercookiedetail = useSelector((state:any)=> state.userdetail.value)

useEffect(() => {
  if (typeof window === "undefined") return;

  // 1️⃣ URL se token grab karo (Google login)
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get("token");
  const cookievalue = Cookies.get("token")
  if(cookievalue) {
    dispatch(setUserExist(true))
  }
  if(urlToken) {
    Cookies.set("token", urlToken)
    
  }
  // 3️⃣ Cookie se user detail load karo
  const cookieData = Cookies.get("userdetail");
  if (cookieData) {
    try {
      const parsedData = JSON.parse(cookieData);
      dispatch(setUserDetail(parsedData));
    } catch (err) {
      console.error("Invalid cookie JSON", err);
    }
  }

  // 4️⃣ URL clean karo (remove ?token=...)
  if (urlToken) {
    window.history.replaceState({}, "", "/");
  }
}, []);







  const checkuserifexit = (value:string) => {
    try {
      if (!ifuserexiist) {
        router.push('/login')
      }
      else {
        router.push(`/${value}`)
      }
    } catch (err) {
      console.log('something went wrong', err)
    }
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: direction === 'up' ? '-120%' : '0%'
      }}
      transition={{
        duration: 0.35,
        ease: 'linear'
      }}
      className='fixed top-0 left-0 right-0 z-50 mt-2 mx-4 rounded-2xl bg-[#ffffff6c] backdrop-blur-2xl'
    >
      <nav className='glass mx-2 my-2 rounded-xl lg:mx-8'>
        <div className='flex h-16 items-center justify-between px-6'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2'>
            <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary'>
              <span className='text-lg font-bold text-primary-foreground'>
                C
              </span>
            </div>
            <span className='text-xl font-semibold tracking-tight'>Capsei</span>
          </Link>

          {/* Desktop Menu */}
          <div className='hidden items-center gap-1 lg:flex'>
            <div
              className='relative'
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              {/* Trigger (same look) */}
              <button className='bg-transparent hover:bg-secondary px-4 py-2 rounded-md'>
                Services
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className='absolute left-0 top-full mt-2'
                  >
                    <ul className='grid w-105 gap-2 p-4 md:grid-cols-2 rounded-lg bg-background shadow-lg'>
                      {services.map(service => (
                        <li key={service.name}>
                          <Link
                            href={service.href}
                            className='flex items-start gap-3 rounded-lg p-3 hover:bg-secondary transition-colors'
                          >
                            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary'>
                              <service.icon className='h-5 w-5 text-primary' />
                            </div>
                            <div>
                              <div className='text-sm font-medium'>
                                {service.name}
                              </div>
                              <p className='text-xs text-muted-foreground'>
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href='/booking'
              className='px-4 py-2 text-sm text-muted-foreground hover:text-foreground'
            >
              Book a Ride
            </Link>
            <button
              type='button'
              className='px-4 py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer'
              onClick={() => checkuserifexit('dashboard')}
            >
              Dashboard
            </button>
            <Link
              href='/driver'
              className='px-4 py-2 text-sm text-muted-foreground hover:text-foreground'
            >
              Drive with Us
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className='hidden items-center gap-3 lg:flex'>
            {!ifuserexiist && (
              <Button variant='ghost' asChild>
                <Link href='/login'>Log in</Link>
              </Button>
            )}

            <Button asChild>
              <Link href='/register'>Get Started</Link>
            </Button>
          </div>

          {/* Mobile Button */}
          <button
            className='lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-secondary'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className='overflow-hidden border-t border-border lg:hidden'
            >
              <div className='space-y-2 p-4'>
                {services.map(service => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className='flex items-center gap-3 rounded-lg p-3 hover:bg-secondary'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <service.icon className='h-5 w-5 text-primary' />
                    {service.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
