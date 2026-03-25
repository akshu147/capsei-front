'use client'

import type React from 'react'
import axios from 'axios'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import Cookies from 'js-cookie'
import { FcGoogle } from 'react-icons/fc'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Loader2,
  CheckCircle2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const passwordRequirements = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Contains number', test: (p: string) => /[0-9]/.test(p) },
  {
    label: 'Contains special character',
    test: (p: string) => /[!@#$%^&*]/.test(p)
  }
]

export default function RegisterPage () {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [isnewdriver, setnewdriver] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState(false)
  const [otpMessage, setOtpMessage] = useState('')
  const [otpSending, setOtpSending] = useState(false)
  const [timer, setTimer] = useState(0)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [canResend, setCanResend] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const token = Cookies.get('driverToken')

    if (token) {
      router.replace('/driver')
    } else {
      setCheckingAuth(false)
    }
  }, [])
  // 🚫 Jab tak check ho raha hai kuch bhi render mat karo
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: ''
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else {
      const isPasswordValid = passwordRequirements.every(req =>
        req.test(formData.password)
      )

      if (!isPasswordValid) {
        newErrors.password = 'Password does not meet requirements'
      }
    }

    setErrors(newErrors)

    // 🚫 Stop if any error exists
    if (Object.values(newErrors).some(err => err !== '')) return

    if (!canResend) return

    try {
      setOtpSending(true)
      setOtpError('')
      setOtpMessage('')

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/driver/send-otp`,
        { email: formData.email.trim().toLowerCase() }
      )

      if (response.status === 200 && response.data.success) {
        setOtpSent(true)
        setOtpMessage(`OTP sent successfully to ${formData.email}`)
        setTimer(180)
        setCanResend(false)
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setErrors(prev => ({
          ...prev,
          email:
            'A driver account with this email already exists. Kindly log in instead.'
        }))
      } else {
        setOtpError('Something went wrong. Try again.')
      }
    } finally {
      setOtpSending(false)
    }
  }

  const verifyOtpFromServer = async (enteredOtp: string) => {
    try {
      setIsVerifyingOtp(true)
      setOtpError('')

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/driver/verify-otp`,
        {
          email: formData.email,
          otp: enteredOtp
        }
      )

      if (response.data.success) {
        setOtpSuccess(true)
        setIsOtpVerified(true)
      } else {
        setOtpError('Invalid OTP')
        setIsOtpVerified(false)
      }
    } catch (error: any) {
      setOtpError(error.response?.data?.message || 'OTP verification failed')
      setIsOtpVerified(false)
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
    setOtpSuccess(false)
    setOtpError('')

    if (value.length === 6) {
      verifyOtpFromServer(value)
    } else {
      setIsOtpVerified(false)
    }
  }

  useEffect(() => {
    if (!otpMessage) return

    const timeout = setTimeout(() => {
      setOtpMessage('')
    }, 3000) // 3 seconds

    return () => clearTimeout(timeout)
  }, [otpMessage])

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    setErrors(prev => {
      const updatedErrors = { ...prev }

      if (field === 'email' && value.trim()) {
        updatedErrors.email = ''
      }

      if (field === 'name' && value.trim()) {
        updatedErrors.name = ''
      }

      if (field === 'phone' && value.trim()) {
        updatedErrors.phone = ''
      }

      if (field === 'password') {
        const isValid = passwordRequirements.every(req => req.test(value))
        if (isValid) updatedErrors.password = ''
      }

      return updatedErrors
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isPasswordValid = passwordRequirements.every(req =>
      req.test(formData.password)
    )

    if (!isPasswordValid) {
      alert('Password does not meet requirements')
      return
    }

    try {
      setIsLoading(true)
      console.log(formData, 'bhosiay')

      const response = await axios.post(
        'http://localhost:4000/api/driver/register-driver',
        formData,
        {
          withCredentials: true, // 🔥 important for cookies
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status === 201) {
        router.replace('/driver')
      }

      // window.location.href = "/driver"
    } catch (error: any) {
      console.error('Error:', error.response?.data?.message || error.message)
      alert(error.response?.data?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (timer <= 0) return

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setCanResend(true)
          setOtpSent(false)
          setOtp('')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  const driverloginsystem = async () => {
    try {
      // const data = await axios.post(`http://localhost:4000/api/driver/driver-login`,)
      console.log(formData, 'bhosiay')
    } catch (err) {
      console.log('something went worng', err.message)
    }
  }
  if (checkingAuth) return null

  return (
    <div className='min-h-screen bg-background flex '>
      <div className='hidden lg:flex lg:w-1/2 relative bg-card items-center justify-center p-12'>
        <div className='absolute inset-0 map-grid opacity-30' />
        <div className='absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]' />

        <div className='relative z-10 max-w-md'>
          <Link href='/' className='flex items-center gap-2 mb-12'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
              <span className='text-xl font-bold text-primary-foreground'>
                C
              </span>
            </div>
            <span className='text-2xl font-semibold'>Capsei</span>
            <span className='font-bold text-primary text-2xl'>Captain</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className='text-4xl font-bold tracking-tight'>
              Join millions of riders today.
            </h1>
            <p className='mt-4 text-lg text-muted-foreground'>
              Create your account in seconds and start booking rides, sending
              parcels, and more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mt-12 space-y-4'
          >
            {[
              'Instant ride booking across 50+ cities',
              'Real-time tracking for all your deliveries',
              'Secure payments with multiple options',
              '24/7 customer support'
            ].map(feature => (
              <div key={feature} className='flex items-center gap-3'>
                <CheckCircle2 className='h-5 w-5 text-success' />
                <span className='text-muted-foreground'>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {isnewdriver ? (
        <div className='flex w-full lg:w-1/2 items-center justify-center p-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full max-w-md space-y-8'
          >
            <div className='lg:hidden mb-8'>
              <Link href='/' className='flex items-center gap-2'>
                <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary'>
                  <span className='text-lg font-bold text-primary-foreground'>
                    C
                  </span>
                </div>
                <span className='text-xl font-semibold'>Capsei</span>
              </Link>
            </div>

            <div>
              <h2 className='text-2xl font-bold'>{`${
                isnewdriver ? 'Welcome back' : 'Welcome to capsei'
              }`}</h2>
              <p className='mt-2 text-muted-foreground'>
                Sign in to your account to continue
              </p>
            </div>

            <form className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='h-11 pl-10 bg-input'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                  <Link
                    href='/forgot-password'
                    className='text-sm text-primary hover:underline'
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='h-11 pl-10 pr-10 bg-input'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center space-x-2'>
                <Checkbox id='remember' />
                <Label
                  htmlFor='remember'
                  className='text-sm cursor-pointer'
                  onClick={() => {
                    toast('wowo very easdy')
                  }}
                >
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type='submit'
                className='w-full h-11'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>
            </form>

            <div className='relative'>
              <Separator />
              <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground'>
                Or continue with
              </span>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <Button
                variant='outline'
                className='h-11 bg-transparent'
                onClick={() =>
                  (window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`)
                }
              >
                <i>
                  <FcGoogle />
                </i>
                Sign in with Google
              </Button>
              <Button variant='outline' className='h-11 bg-transparent'>
                <svg
                  className='mr-2 h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
                </svg>
                GitHub
              </Button>
            </div>

            <p className='text-center text-sm text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <span
                onClick={() => {
                  setnewdriver(false)
                }}
                className='font-medium text-primary hover:underline'
              >
                Sign up
              </span>
            </p>
          </motion.div>
        </div>
      ) : (
        <div className='flex w-full lg:w-1/2 items-center justify-center p-8 border-[4px] border-red-600'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full max-w-md space-y-6'
          >
            <div className='lg:hidden mb-8'>
              <Link href='/' className='flex items-center gap-2'>
                <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary'>
                  <span className='text-lg font-bold text-primary-foreground'>
                    M
                  </span>
                </div>
                <span className='text-xl font-semibold'>MoveX</span>
              </Link>
            </div>

            <div>
              <h2 className='text-2xl font-bold'>Create an account</h2>
              <p className='mt-2 text-muted-foreground'>
                Enter your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name</Label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

                  <Input
                    id='name'
                    type='text'
                    placeholder='John Doe'
                    value={formData.name}
                    onChange={e => updateField('name', e.target.value)}
                    className='h-11 pl-10 bg-input'
                    required
                  />
                </div>
                {errors.name && (
                  <p className='text-xs text-red-500 mt-1'>{errors.name}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    className='h-11 pl-10 bg-input'
                    required
                    disabled={otpSent}
                  />
                </div>
                {errors.email && (
                  <p className='text-xs text-red-500 mt-1'>{errors.email}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='+1 (555) 000-0000'
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    className='h-11 pl-10 bg-input'
                    required
                  />
                </div>
                {errors.phone && (
                  <p className='text-xs text-red-500 mt-1'>{errors.phone}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Create a strong password'
                    value={formData.password}
                    onChange={e => updateField('password', e.target.value)}
                    className='h-11 pl-10 pr-10 bg-input'
                    required
                  />

                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-xs text-red-500 mt-1'>{errors.password}</p>
                )}
                {formData.password && (
                  <div className='mt-2 grid grid-cols-2 gap-1'>
                    {passwordRequirements.map(req => (
                      <div
                        key={req.label}
                        className={`flex items-center gap-1.5 text-xs ${
                          req.test(formData.password)
                            ? 'text-success'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <CheckCircle2 className='h-3 w-3' />
                        {req.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className='flex items-start space-x-2'>
                <Checkbox id='terms' className='mt-0.5' required />
                <Label
                  htmlFor='terms'
                  className='text-sm cursor-pointer leading-5'
                >
                  I agree to the{' '}
                  <Link href='/terms' className='text-primary hover:underline'>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href='/privacy'
                    className='text-primary hover:underline'
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {/* 🔥 SEND / RESEND BUTTON - ALWAYS VISIBLE */}
              <Button
                type='button'
                onClick={handleSendOtp}
                className='w-full h-11'
                disabled={otpSending || (otpSent && timer > 0)}
              >
                {otpSending ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : !otpSent ? (
                  'Send OTP'
                ) : timer > 0 ? (
                  `Resend OTP in ${timer}s`
                ) : (
                  'Resend OTP'
                )}
              </Button>

              {/* 🔥 OTP INPUT SHOW AFTER FIRST SEND */}
              {otpSent && (
                <>
                  <div className='space-y-2 mt-4'>
                    <Label htmlFor='otp'>Enter OTP</Label>
                    <Input
                      id='otp'
                      type='text'
                      placeholder='Enter 6 digit OTP'
                      value={otp}
                      onChange={e => handleOtpChange(e.target.value)}
                      className='h-11 bg-input border-[1px] border-green-100'
                      maxLength={6}
                    />

                    {isVerifyingOtp && (
                      <p className='text-sm text-muted-foreground'>
                        Verifying OTP...
                      </p>
                    )}

                    {otpSuccess && (
                      <p className='text-sm text-green-500'>
                        OTP Verified ✅{' '}
                        <span className='text-white text-[10px]'>
                          You won’t be able to use this OTP after it expires.
                        </span>
                      </p>
                    )}

                    {otpError && (
                      <p className='text-sm text-red-500'>{otpError}</p>
                    )}
                  </div>

                  {otpSuccess && (
                    <Button type='submit' className='w-full h-11 mt-3'>
                      Next
                    </Button>
                  )}
                </>
              )}

              {otpMessage && (
                <p className='text-sm text-green-500 text-center mt-2'>
                  {otpMessage}
                </p>
              )}

              {otpError && (
                <p className='text-sm text-red-500 text-center mt-2'>
                  {otpError}
                </p>
              )}
            </form>

            <div className='relative'>
              <Separator />
              <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground'>
                Or continue with
              </span>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <Button variant='outline' className='h-11 bg-transparent'>
                <i>
                  <FcGoogle />
                </i>
                Google
              </Button>
              <Button variant='outline' className='h-11 bg-transparent'>
                <svg
                  className='mr-2 h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
                </svg>
                GitHub
              </Button>
            </div>

            <p className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <span
                className='font-medium text-primary hover:underline'
                onClick={() => {
                  setnewdriver(true)
                }}
              >
                Sign in
              </span>
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
