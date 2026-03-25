'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Cookies from 'js-cookie'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ChevronLeft,
  User,
  Car,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bike,
  Truck,
  IndianRupee,
  Shield,
  Star,
  TrendingUp
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const vehicleTypes = [
  // BIKE
  { id: 'bike', name: 'Bike', category: 'bike', icon: Bike },
  { id: 'premium_bike', name: 'Premium Bike', category: 'bike', icon: Bike },

  // AUTO
  { id: 'auto', name: 'Auto Rickshaw', category: 'auto', icon: Truck },
  { id: 'e_auto', name: 'E-Rickshaw', category: 'auto', icon: Truck },

  // CAR
  { id: 'citycar', name: 'City Car', category: 'car', icon: Car },
  { id: 'sedan', name: 'Sedan', category: 'car', icon: Car },
  { id: 'suv', name: 'SUV', category: 'car', icon: Car },
  { id: 'premium', name: 'Premium Car', category: 'car', icon: Car },

  // LOADING
  { id: '3wheeler', name: '3 Wheeler Loader', category: 'loading', icon: Truck },
  { id: '4wheeler', name: '4 Wheeler Loader', category: 'loading', icon: Truck }
]

const documents = [
  { id: 'license', name: 'Driving License' },
  { id: 'registrationCertificate', name: 'Vehicle Registration' },
  { id: 'photo', name: 'Profile Photo' },
  { id: 'AadharCard', name: 'Aadhar' }
]

const benefits = [
  {
    icon: IndianRupee,
    title: 'Earn More',
    description: 'Competitive fares with bonuses and incentives'
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Work when you want, be your own boss'
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description: 'Protected on every ride you take'
  },
  {
    icon: TrendingUp,
    title: 'Weekly Payouts',
    description: 'Get paid directly to your bank'
  }
]

export default function DriverPage () {
  const [activeTab, setActiveTab] = useState('register')
  const [step, setStep] = useState(1)
  const [vehicleType, setVehicleType] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const router = useRouter()

  const documentProgress = documents.filter(d => d.status === 'verified').length
  const totalDocuments = documents.length
  const progressPercentage = (documentProgress / totalDocuments) * 100

  const [formdata, setformdata] = useState({
    dateofbirth: '',
    vehicleType: '',
    vehicleNumber: '',
    vehicleModel: '',
    licenseNumber: '',
    aadharNumber: '',
    documents: {
      license: null,
      registrationCertificate: null,
      AadharCard: null,
      photo: null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const token = Cookies.get('driverToken')

    if (!token) {
      router.replace('/register') // replace use karo taaki back pe wapas na aaye
    } else {
      setAuthorized(true)
    }
  }, [router])

  const handleFileChange = (e: any, type: string) => {
    const file = e.target.files[0]
    if (!file) return

    setformdata(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file
      }
    }))
  }
  const handleRemoveFile = (type: string) => {
    setformdata(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: null
      }
    }))
  }

  const registerdrver2ndstep = async () => {
    try {
      setLoading(true)
      setError('')

      if (
        !formdata.dateofbirth ||
        !formdata.vehicleType ||
        !formdata.vehicleNumber ||
        !formdata.licenseNumber ||
        !formdata.aadharNumber
      ) {
        setError('Please fill all required fields')
        setLoading(false)
        return
      }

      if (!formdata.documents.license || !formdata.documents.AadharCard) {
        setError('License and Aadhaar documents are required')
        setLoading(false)
        return
      }

      const today = new Date()
      const dob = new Date(formdata.dateofbirth)

      let age = today.getFullYear() - dob.getFullYear()
      const m = today.getMonth() - dob.getMonth()

      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--
      }

      // if (age < 18) {
      //   setError('You must be at least 18 years old')
      //   setLoading(false)
      //   return
      // }

      const data = new FormData()

      Object.entries({
        dateofbirth: formdata.dateofbirth,
        vehicleType: formdata.vehicleType,
        vehicleNumber: formdata.vehicleNumber,
        vehicleModel: formdata.vehicleModel,
        licenseNumber: formdata.licenseNumber,
        aadharNumber: formdata.aadharNumber
      }).forEach(([key, value]) => data.append(key, value as string))

      data.append('license', formdata.documents.license)
      data.append('AadharCard', formdata.documents.AadharCard)

      if (formdata.documents.registrationCertificate) {
        data.append(
          'registrationCertificate',
          formdata.documents.registrationCertificate
        )
      }

      if (formdata.documents.photo) {
        data.append('photo', formdata.documents.photo)
      }
      const token = Cookies.get('driverToken')
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/driver/register-driver-2ndstep`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}` // <-- ye backend ke authMiddleware ke liye zaruri hai
          }
        }
      )
      if (res.status === 200) {
        router.replace('/driver-deshboard')
      }
    } catch (err) {
      console.log('ERROR FULL:', err?.response || err.message || err)
      setError(err?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // console.log(formdata, 'bhosiya')

  if (!authorized) return null

  return (
    <div className='min-h-screen bg-background'>
      <header className='glass fixed top-0 left-0 right-0 z-50 mx-4 mt-4 rounded-xl lg:mx-8'>
        <div className='flex h-14 items-center justify-between px-6'>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' asChild>
              <Link href='/'>
                <ChevronLeft className='h-5 w-5' />
              </Link>
            </Button>
            <Link href='/' className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                <span className='text-sm font-bold text-primary-foreground'>
                  M
                </span>
              </div>
              <span className='text-lg font-semibold'>Capsei Driver</span>
            </Link>
          </div>
          <div className='flex items-center gap-3'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Laboriosam, mollitia? Ad, esse! Ea labore, commodi quos inventore
            eligendi nesciunt mollitia!
          </div>
        </div>
      </header>

      <main className='pt-28 pb-16'>
        <div className='container mx-auto px-4'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='space-y-8'
          >
            <div className='flex flex-col items-center text-center'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge className='mb-4'>Now Hiring</Badge>
                <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
                  Drive with Capsei
                </h1>
                <p className='mt-4 max-w-2xl text-lg text-muted-foreground'>
                  Earn money on your schedule. Join thousands of drivers making
                  a great income with{' '}
                  <span className='text-primary'>Capsei</span>.
                </p>
              </motion.div>

              <TabsList className='mt-8 bg-secondary'>
                <TabsTrigger value='register'>Register as Driver</TabsTrigger>
                <TabsTrigger value='dashboard'>Driver Dashboard</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value='register' className='space-y-8'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'
              >
                {benefits.map((benefit, index) => (
                  <Card key={benefit.title} className='border-border'>
                    <CardContent className='px-5 py-2'>
                      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10'>
                        <benefit.icon className='h-6 w-6 text-primary' />
                      </div>
                      <h3 className='font-semibold'>{benefit.title}</h3>
                      <p className='mt-1 text-sm text-muted-foreground'>
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='mx-auto'
              >
                <Card className='border-border'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div>
                        <CardTitle>Driver Registration</CardTitle>
                        <CardDescription>
                          Complete all steps to start earning
                        </CardDescription>
                      </div>
                      <Badge variant='outline'>Step {step} of 2</Badge>
                    </div>
                    <Progress value={step * 50} className='mt-4' />
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {step === 1 && (
                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <Label>Select Vehicle Type</Label>
                          <div className='grid gap-3 sm:grid-cols-2'>
                            {vehicleTypes.map(type => (
                              <button
                                key={type.id}
                                onClick={() =>
                                  setformdata(prev => ({
                                    ...prev,
                                    vehicleType: type.id
                                  }))
                                }
                                className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                                  formdata.vehicleType === type.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-muted-foreground/50'
                                }`}
                              >
                                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary'>
                                  <type.icon className='h-5 w-5 text-primary' />
                                </div>
                                <div>
                                  <div className='font-medium'>{type.name}</div>
                                  <div className='text-xs text-muted-foreground'>
                                    {type.description}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                          {/* DOB */}
                          <div className='space-y-2'>
                            <Label htmlFor='dob'>Date Of Birth</Label>
                            <Input
                              id='dob'
                              className='bg-input'
                              type='date'
                              value={formdata.dateofbirth}
                              onChange={e =>
                                setformdata(prev => ({
                                  ...prev,
                                  dateofbirth: e.target.value
                                }))
                              }
                            />
                          </div>

                          {/* Vehicle Model */}
                          <div className='space-y-2'>
                            <Label htmlFor='vehicleModel'>Vehicle Model</Label>
                            <Input
                              id='vehicleModel'
                              placeholder='e.g., Honda Civic 2022'
                              className='bg-input'
                              type='text'
                              value={formdata.vehicleModel}
                              onChange={e =>
                                setformdata(prev => ({
                                  ...prev,
                                  vehicleModel: e.target.value
                                }))
                              }
                            />
                          </div>

                          {/* Vehicle Number */}
                          <div className='space-y-2'>
                            <Label htmlFor='vehicleNumber'>
                              Vehicle Number
                            </Label>
                            <Input
                              id='vehicleNumber'
                              placeholder='RJ14 AB 1234'
                              className='bg-input'
                              type='text'
                              value={formdata.vehicleNumber}
                              onChange={e =>
                                setformdata(prev => ({
                                  ...prev,
                                  vehicleNumber: e.target.value
                                }))
                              }
                            />
                          </div>

                          {/* License Number */}
                          <div className='space-y-2'>
                            <Label htmlFor='licenseNumber'>
                              License Number
                            </Label>
                            <Input
                              id='licenseNumber'
                              placeholder='DL number'
                              className='bg-input'
                              type='text'
                              value={formdata.licenseNumber}
                              onChange={e =>
                                setformdata(prev => ({
                                  ...prev,
                                  licenseNumber: e.target.value
                                }))
                              }
                            />
                          </div>

                          {/* Aadhaar */}
                          <div className='space-y-2'>
                            <Label htmlFor='aadharNumber'>Aadhaar Number</Label>
                            <Input
                              id='aadharNumber'
                              placeholder='12 digit Aadhaar'
                              className='bg-input'
                              type='text'
                              value={formdata.aadharNumber}
                              onChange={e =>
                                setformdata(prev => ({
                                  ...prev,
                                  aadharNumber: e.target.value
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className='space-y-4'>
                        <div className='space-y-2'>
                          <Label>Upload Documents</Label>
                          <p className='text-sm text-muted-foreground'>
                            Upload clear photos of your documents for
                            verification
                          </p>
                        </div>
                        <div className='space-y-3'>
                          {documents.slice(0, 4).map(doc => {
                            const file = formdata.documents[doc.id]

                            return (
                              <div
                                key={doc.id}
                                className='flex items-center justify-between rounded-lg border border-border bg-card p-4'
                              >
                                <div className='flex items-center gap-3'>
                                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary'>
                                    <FileText className='h-5 w-5 text-muted-foreground' />
                                  </div>

                                  <div>
                                    <div className='font-medium'>
                                      {doc.name}
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                      {doc.description}
                                    </div>

                                    {/* ✅ File name show */}
                                    {file && (
                                      <p className='text-xs text-green-500 mt-1'>
                                        {file.name}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* RIGHT SIDE */}
                                <div className='flex gap-2 items-center'>
                                  {/* ✅ Upload button (only if no file) */}
                                  {!file && (
                                    <label className='cursor-pointer'>
                                      <Button
                                        variant='outline'
                                        size='sm'
                                        className='gap-2 bg-transparent'
                                        asChild
                                      >
                                        <span>
                                          <Upload className='h-4 w-4' />
                                          Upload
                                        </span>
                                      </Button>

                                      <input
                                        type='file'
                                        className='hidden'
                                        onChange={e =>
                                          handleFileChange(e, doc.id)
                                        }
                                      />
                                    </label>
                                  )}

                                  {/* ❌ Remove button */}
                                  {file && (
                                    <Button
                                      variant='destructive'
                                      size='sm'
                                      onClick={() => handleRemoveFile(doc.id)}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    <div className='flex gap-3'>
                      {step > 1 && (
                        <Button
                          variant='outline'
                          onClick={() => setStep(step - 1)}
                          className='flex-1 bg-transparent'
                        >
                          Previous
                        </Button>
                      )}
                      {step < 2 ? (
                        <Button
                          onClick={() => setStep(step + 1)}
                          className='flex-1'
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          className='flex-1'
                          disabled={loading}
                          onClick={registerdrver2ndstep}
                        >
                          {loading ? 'Submitting...' : 'Submit Application'}
                        </Button>
                      )}
                    </div>
                    {error && (
                      <div className='text-red-500 text-sm font-medium'>
                        {error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
