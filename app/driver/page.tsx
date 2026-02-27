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

const vehicleTypes = [
  { id: 'bike', name: 'Bike', icon: Bike },
  { id: 'auto', name: 'Auto Rickshaw', icon: Truck },
  { id: 'car', name: 'Car', icon: Car },
  { id: 'van', name: 'Van', icon: Truck },
  { id: 'pickup', name: 'Pickup / Light Truck', icon: Truck },
  { id: 'truck', name: 'Truck', icon: Truck },
  { id: 'tow_truck', name: 'Tow Truck', icon: Truck },
  { id: 'water_tanker', name: 'Water Tanker', icon: Truck },
  { id: 'ambulance', name: 'Ambulance', icon: Truck },
  { id: 'bus', name: 'Bus', icon: Truck }
];

const documents = [
  {
    id: 'license',
    name: 'Driving License',
    status: 'verified',
    description: 'Valid driving license'
  },
  {
    id: 'registration',
    name: 'Vehicle Registration',
    status: 'pending',
    description: 'RC document'
  },
  {
    id: 'insurance',
    name: 'Vehicle Insurance',
    status: 'required',
    description: 'Valid insurance policy'
  },
  {
    id: 'photo',
    name: 'Profile Photo',
    status: 'verified',
    description: 'Clear face photo'
  },
  {
    id: 'aadhar',
    name: 'ID Proof',
    status: 'pending',
    description: 'Government ID'
  },
  {
    id: 'permit',
    name: 'Commercial Permit',
    status: 'required',
    description: 'If applicable'
  }
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

   useEffect(() => {
    const token = Cookies.get('driverToken')

    if (!token) {
      router.replace('/register') // replace use karo taaki back pe wapas na aaye
    } else {
      setAuthorized(true)
    }
  }, [router])
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
            <Button variant='ghost' size='sm' asChild>
              <Link href='/register'>Register</Link>
            </Button>
            <Button size='sm'>Apply Now</Button>
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
                  a great income with MoveX.
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
                    <CardContent className='p-6'>
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
                className='mx-auto max-w-2xl'
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
                                onClick={() => setVehicleType(type.id)}
                                className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                                  vehicleType === type.id
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
                        <div className='space-y-2'>
                          <Label htmlFor='vehicleNumber'>Vehicle Number</Label>
                          <Input
                            id='vehicleNumber'
                            placeholder='ABC 1234'
                            className='bg-input'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='vehicleModel'>Vehicle Model</Label>
                          <Input
                            id='vehicleModel'
                            placeholder='e.g., Honda Civic 2022'
                            className='bg-input'
                          />
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
                          {documents.slice(0, 4).map(doc => (
                            <div
                              key={doc.id}
                              className='flex items-center justify-between rounded-lg border border-border bg-card p-4'
                            >
                              <div className='flex items-center gap-3'>
                                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary'>
                                  <FileText className='h-5 w-5 text-muted-foreground' />
                                </div>
                                <div>
                                  <div className='font-medium'>{doc.name}</div>
                                  <div className='text-xs text-muted-foreground'>
                                    {doc.description}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant='outline'
                                size='sm'
                                className='gap-2 bg-transparent'
                              >
                                <Upload className='h-4 w-4' />
                                Upload
                              </Button>
                            </div>
                          ))}
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
                          onClick={() => {
                            setActiveTab('dashboard')
                          }}
                        >
                          Submit Application
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value='dashboard' className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='grid gap-6 lg:grid-cols-3'
              >
                <div className='lg:col-span-2 space-y-6'>
                  <Card className='border-border'>
                    <CardHeader>
                      <div className='flex items-center justify-between'>
                        <div>
                          <CardTitle>Application Status</CardTitle>
                          <CardDescription>
                            Track your onboarding progress
                          </CardDescription>
                        </div>
                        <Badge className='bg-warning/10 text-warning hover:bg-warning/20'>
                          Under Review
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className='mb-4'>
                        <div className='flex items-center justify-between text-sm'>
                          <span className='text-muted-foreground'>
                            {documentProgress} of {totalDocuments} documents
                            verified
                          </span>
                          <span className='font-medium'>
                            {Math.round(progressPercentage)}%
                          </span>
                        </div>
                        <Progress value={progressPercentage} className='mt-2' />
                      </div>

                      <div className='space-y-3'>
                        {documents.map(doc => (
                          <div
                            key={doc.id}
                            className='flex items-center justify-between rounded-lg border border-border bg-card p-3'
                          >
                            <div className='flex items-center gap-3'>
                              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-secondary'>
                                <FileText className='h-4 w-4 text-muted-foreground' />
                              </div>
                              <div>
                                <div className='text-sm font-medium'>
                                  {doc.name}
                                </div>
                                <div className='text-xs text-muted-foreground'>
                                  {doc.description}
                                </div>
                              </div>
                            </div>
                            {doc.status === 'verified' ? (
                              <Badge className='bg-success/10 text-success hover:bg-success/20'>
                                <CheckCircle2 className='mr-1 h-3 w-3' />
                                Verified
                              </Badge>
                            ) : doc.status === 'pending' ? (
                              <Badge
                                variant='secondary'
                                className='bg-warning/10 text-warning hover:bg-warning/20'
                              >
                                <Clock className='mr-1 h-3 w-3' />
                                Pending
                              </Badge>
                            ) : (
                              <Badge
                                variant='secondary'
                                className='bg-destructive/10 text-destructive hover:bg-destructive/20'
                              >
                                <AlertCircle className='mr-1 h-3 w-3' />
                                Required
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className='space-y-6'>
                  <Card className='border-border'>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-lg'>Driver Profile</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='flex items-center gap-4'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-secondary'>
                          <User className='h-8 w-8 text-muted-foreground' />
                        </div>
                        <div>
                          <div className='font-semibold'>John Doe</div>
                          <div className='text-sm text-muted-foreground'>
                            Sedan Driver
                          </div>
                          <div className='mt-1 flex items-center gap-1 text-sm'>
                            <Star className='h-4 w-4 fill-warning text-warning' />
                            <span>4.8 Rating</span>
                          </div>
                        </div>
                      </div>
                      <div className='space-y-2 pt-2 border-t border-border'>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>Vehicle</span>
                          <span>Honda Civic 2022</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>License</span>
                          <span>NYC-12345</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                          <span className='text-muted-foreground'>
                            Member Since
                          </span>
                          <span>Jan 2024</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className='border-border'>
                    <CardHeader className='pb-3'>
                      <CardTitle className='text-lg'>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                      <div className='flex items-center justify-between rounded-lg bg-secondary/50 p-3'>
                        <span className='text-sm text-muted-foreground'>
                          Total Rides
                        </span>
                        <span className='font-semibold'>0</span>
                      </div>
                      <div className='flex items-center justify-between rounded-lg bg-secondary/50 p-3'>
                        <span className='text-sm text-muted-foreground'>
                          Total Earnings
                        </span>
                        <span className='font-semibold'>$0.00</span>
                      </div>
                      <div className='flex items-center justify-between rounded-lg bg-secondary/50 p-3'>
                        <span className='text-sm text-muted-foreground'>
                          Online Hours
                        </span>
                        <span className='font-semibold'>0 hrs</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
