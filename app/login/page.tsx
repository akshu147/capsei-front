'use client'

import type React from 'react'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { default as axios, AxiosError } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { setUserExist } from '@/store/userloginslice/userloginslice'

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
import { fireConfetti } from '@/components/ui/Confetti'
// import { setUserDetail } from '@/store/userdetailslice/userdetailslice'
import Cookies from 'js-cookie'

export default function LoginPage () {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newuser, setNewuser] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [ischeckbox, setischeckbox] = useState(false)
  const [formdata, setformdata] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    conditionstatus: false
  })

  const dispatch = useDispatch()
  const ifuserexiist = useSelector((state: any) => state.userExist.value)

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    {
      label: 'Contains uppercase letter',
      test: (p: string) => /[A-Z]/.test(p)
    },
    { label: 'Contains number', test: (p: string) => /[0-9]/.test(p) },
    {
      label: 'Contains special character',
      test: (p: string) => /[!@#$%^&*]/.test(p)
    }
  ]

  const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`,
      formdata,
      { withCredentials: true } // CORS + cookies safe
    );

    if (res.status === 201) {
      toast.success("Registration successful! 🎉");
      fireConfetti();
      dispatch(setUserExist(true)); // user now exists
      Cookies.set("userExist", "true")
      Cookies.set("userdetail", JSON.stringify(res.data.user));
      router.push("/");
      console.log("User exist after registration:", true);
    }
  } catch (err: any) {
    console.log("Axios Error Object:", err); // DEBUG

    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      const message = err.response?.data?.message;
      

      if (status === 409) {
        toast.error("User already exists. Please log in instead.");
        dispatch(setUserExist(true));
      } else if (message) {
        toast.error(message);
      } else {
        toast.error("Something went wrong 😬");
      }
    } else {
      toast.error("Unexpected error 😬");
    }
  } finally {
    setIsLoading(false);
  }
};


  const handlelogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/userlogin`, {
        email,
        password
      },  { withCredentials: true })

      if (res.status === 200) {
        toast.success('Login successful 🎉')

        // ✅ token & user save
        Cookies.set('token', res.data.token)
        Cookies.set('user', JSON.stringify(res.data.user))
        Cookies.set("userExist", "true")
        router.push('/')
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'Login failed')
        console.log(err)
      } else {
        toast.error('Something went wrong 😬')
      }
    }
  }

  // useEffect(() => {
  //   console.log("Redux updated value:", ifuserexiist)
  // }, [ifuserexiist])

  return (
    <div className='min-h-screen bg-background flex'>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme='dark'
      />
      <div className='hidden lg:flex lg:w-1/2 relative bg-card items-center justify-center p-12'>
        <div className='absolute inset-0 map-grid opacity-30' />
        <div className='absolute top-1/4 left-1/4 h-100 w-100 rounded-full bg-primary/5 blur-[100px]' />

        <div className='relative z-10 max-w-md'>
          <Link href='/' className='flex items-center gap-2 mb-12'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
              <span className='text-xl font-bold text-primary-foreground'>
                C
              </span>
            </div>
            <span className='text-2xl font-semibold'>Capsei</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className='text-4xl font-bold tracking-tight'>
              Move anything, anywhere.
            </h1>
            <p className='mt-4 text-lg text-muted-foreground'>
              Book rides, send parcels, and manage your logistics with ease.
              Join millions of users who trust MoveX.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mt-12 grid grid-cols-3 gap-4'
          >
            {[
              { label: 'Active Users', value: '2M+' },
              { label: 'Cities', value: '50+' },
              { label: 'Rides Daily', value: '100K+' }
            ].map(stat => (
              <div
                key={stat.label}
                className='rounded-lg border border-border bg-secondary/50 p-4 text-center'
              >
                <div className='text-2xl font-bold text-primary'>
                  {stat.value}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {newuser ? (
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
                ifuserexiist ? 'Welcome back' : 'Welcome to capsei'
              }`}</h2>
              <p className='mt-2 text-muted-foreground'>
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handlelogin} className='space-y-5'>
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
              <Button variant='outline' className='h-11 bg-transparent'
                 onClick={() =>
                    (window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google`)
                  }>
                <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
              
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
                  setNewuser(false)
                }}
                className='font-medium text-primary hover:underline'
              >
                Sign up
              </span>
            </p>
          </motion.div>
        </div>
      ) : (
        <div className='flex w-full lg:w-1/2 items-center justify-center p-8 border-4 border-white'>
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
                    name='name'
                    type='text'
                    placeholder='John Doe'
                    value={formdata.name}
                    onChange={e => {
                      setformdata({ ...formdata, name: e.target.value })
                    }}
                    className='h-11 pl-10 bg-input'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    name='email'
                    type='email'
                    onChange={e => {
                      setformdata({ ...formdata, email: e.target.value })
                    }}
                    placeholder='you@example.com'
                    className='h-11 pl-10 bg-input'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='phone'
                    type='tel'
                    onChange={e => {
                      setformdata({ ...formdata, phone: e.target.value })
                    }}
                    placeholder='+1 (555) 000-0000'
                    className='h-11 pl-10 bg-input'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={e => {
                      setformdata({ ...formdata, password: e.target.value })
                    }}
                    placeholder='Create a strong password'
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
                {formdata.password && (
                  <div className='mt-2 grid grid-cols-2 gap-1'>
                    {passwordRequirements.map(req => (
                      <div
                        key={req.label}
                        className={`flex items-center gap-1.5 text-xs ${
                          req.test(formdata.password)
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
                <Checkbox
                  id='terms'
                  className='mt-0.5'
                  required
                  checked={ischeckbox}
                  onCheckedChange={(checked: boolean) => {
                    setischeckbox(checked),
                      ischeckbox
                        ? (formdata.conditionstatus = false)
                        : (formdata.conditionstatus = true)
                  }}
                />

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

              <Button
                type='submit'
                className='w-full h-11'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <>
                    Create Account
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
              <Button variant='outline' className='h-11 bg-transparent'>
                <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
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
                onClick={() => {
                  setNewuser(true)
                }}
                className='font-medium text-primary hover:underline cursor-pointer'
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
