'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Clock, Shield } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserExist } from '@/store/userloginslice/userloginslice'
import { useRouter } from 'next/navigation'
import { el } from 'date-fns/locale'
import { fireConfetti } from '../ui/Confetti'

export function HeroSection () {
  const router = useRouter()
  const dispatch = useDispatch()
  const ifuserexiist = useSelector((state: any) => state.userExist.value)
  const changevalue = () => {
    fireConfetti()
  }
  const bookride = () => {
    try {
      if (ifuserexiist) {
        router.push('/booking')
      }
      else {
        router.push('/login')
      }
    } catch (err) {
      console.log('something wern wrong', err.message)
    }
  }

  return (
    <section className='relative min-h-screen overflow-hidden pt-32 pb-20'>
      <div className='absolute inset-0 map-grid opacity-40' />
      <div className='absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]' />
      <div className='absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/3 blur-[80px]' />

      <div className='container relative mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm'>
              <span className='flex h-2 w-2 rounded-full bg-success' />
              <span className='text-muted-foreground' onClick={changevalue}>
                Now available in 50+ cities nationwide
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'
          >
            Move anything, <span className='text-primary'>anywhere</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl'
          >
            Book bike taxis, car rides, loading vehicles, and send parcels with
            a single platform. Enterprise-grade logistics for individuals and
            businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'
          >
            <Button size='lg' className='h-12 px-8 text-base' onClick={bookride}>
              Book a Ride
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button
              size='lg'
              variant='outline'
              asChild
              className='h-12 px-8 text-base bg-transparent'
            >
              <Link href='/driver'>Become a Driver</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3'
          >
            {[
              {
                icon: MapPin,
                label: 'Real-time Tracking',
                value: 'Live location updates'
              },
              {
                icon: Clock,
                label: 'Average Wait Time',
                value: 'Under 5 minutes'
              },
              {
                icon: Shield,
                label: 'Verified Drivers',
                value: '100% background checked'
              }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className='flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 p-6'
              >
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-secondary'>
                  <stat.icon className='h-6 w-6 text-primary' />
                </div>
                <span className='text-sm text-muted-foreground'>
                  {stat.label}
                </span>
                <span className='font-medium'>{stat.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mx-auto mt-20 max-w-5xl'
        >
          <div className='relative overflow-hidden rounded-2xl border border-border bg-card'>
            <div className='absolute inset-0 map-grid opacity-30' />
            <div className='relative flex h-[400px] items-center justify-center'>
              <div className='absolute left-1/4 top-1/3 flex flex-col items-center'>
                <div className='relative'>
                  <div className='absolute inset-0 rounded-full bg-success pulse-ring' />
                  <div className='relative flex h-5 w-5 items-center justify-center rounded-full bg-success'>
                    <div className='h-2 w-2 rounded-full bg-background' />
                  </div>
                </div>
                <div className='mt-2 rounded-md bg-card px-2 py-1 text-xs font-medium shadow-lg'>
                  Pickup
                </div>
              </div>

              <svg
                className='absolute'
                width='200'
                height='100'
                viewBox='0 0 200 100'
              >
                <motion.path
                  d='M 20 50 Q 100 0 180 50'
                  fill='none'
                  stroke='oklch(0.75 0.14 55)'
                  strokeWidth='2'
                  strokeDasharray='6 4'
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </svg>

              <div className='absolute right-1/4 top-1/3 flex flex-col items-center'>
                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-primary'>
                  <div className='h-2 w-2 rounded-full bg-primary-foreground' />
                </div>
                <div className='mt-2 rounded-md bg-card px-2 py-1 text-xs font-medium shadow-lg'>
                  Drop-off
                </div>
              </div>

              <motion.div
                className='absolute rounded-lg bg-card border border-border p-4 shadow-xl'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary'>
                    <span className='text-lg'>🚗</span>
                  </div>
                  <div>
                    <div className='text-sm font-medium'>Driver arriving</div>
                    <div className='text-xs text-muted-foreground'>
                      3 min away
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
