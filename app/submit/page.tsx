'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, HelpCircle, MessageCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useState } from "react"

const steps = [
  { id: 1, title: 'معلومات البطاقة', status: 'current' },
  { id: 2, title: 'استمارة التقديم', status: 'upcoming' },
  { id: 3, title: 'تفاصيل الدفع', status: 'upcoming' },
  { id: 4, title: 'إتمام العملية', status: 'upcoming' },
]

export default function HealthCardRenewal() {
    const [step,setStep]=useState(1)
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
            <span>الخدمات الحكومية</span>
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>الصحة</span>
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="text-foreground">خدمة البطاقة الصحية الإلكترونية</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        <Card className="max-w-3xl mx-auto">
          <div className="p-4 sm:p-6">
            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-[#8B1538] text-white p-3 sm:p-4 rounded-lg text-sm sm:text-base w-fit">
                <span>المساعدة</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">خدمة البطاقة الصحية الإلكترونية</h1>
            </div>

            {/* Stepper */}
            <div className="mb-6 sm:mb-8 overflow-x-auto pb-2">
              <div className="flex items-center justify-between min-w-[600px]">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="relative flex flex-col items-center">
                      <div 
                        className={cn(
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium",
                          step.status === 'current' 
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
                          step.status === 'completed' ? "bg-[#8B1538]" : "bg-gray-200"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

                      {step === 1?
                      <div className="space-y-4 sm:space-y-6">
                          <p className="text-xs sm:text-sm text-gray-500 italic">
                              طلب الاستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام الطلب
                          </p>

                          <div className="space-y-4 sm:space-y-6">
                              <h2 className="text-lg sm:text-xl font-semibold">معلومات</h2>

                              <div className="space-y-4">
                                  <div className="space-y-2">
                                      <Label className="flex gap-1 text-sm sm:text-base">
                                          الرجاء إدخال رقم البطاقة الشخصية
                                          <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                          placeholder="الرجاء إدخال الرقم"
                                          className="max-w-md text-sm sm:text-base"
                                      />
                                  </div>

                                  <div className="space-y-2">
                                      <Label className="flex gap-1 text-sm sm:text-base">
                                          نوع العملية
                                          <span className="text-red-500">*</span>
                                      </Label>
                                      <RadioGroup defaultValue="renewal" className="space-y-2">
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
                     
                      </div>: step===2?                     
                       <div className="space-y-4 sm:space-y-6">
                          <p className="text-xs sm:text-sm text-gray-500 italic">
                              طلب الاستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام الطلب
                          </p>

                          <div className="space-y-4 sm:space-y-6">
                              <h2 className="text-lg sm:text-xl font-semibold"> معلومات حامل البطاقة</h2>

                              <div className="space-y-4">
                                  <div className="space-y-2">
                                      <Label className="flex gap-1 text-sm sm:text-base">
                                         عدد السنوات                    <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                          type="tel"
                                          placeholder="الرجاء إدخال رقم الهاتف"
                                          className="max-w-md text-sm sm:text-base"
                                      />
                                  </div>
                                  <div className="space-y-2">
                                      <Label className="flex gap-1 text-sm sm:text-base">
                                          رقم الهاتف                      <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                          type="tel"
                                          placeholder="الرجاء إدخال رقم الهاتف"
                                          className="max-w-md text-sm sm:text-base"
                                      />
                                  </div>

                              </div>
                          </div> </div>:step===3?<>
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
              <span>50 ريال قطري</span>
            </div>
            <div className="flex justify-between font-bold pt-4 border-t">
              <span>المجموع</span>
              <span>50 ريال قطري</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}

        {/* Chat Button */}
        <button className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-full">
          <MessageCircle className="w-6 h-6" />
        </button>
                          </div> 
                          
                          </>:step===4?<>
                          <div className="space-y-4 sm:space-y-6">
                              <h2 className="text-lg sm:text-xl font-semibold"> معلومات حامل البطاقة</h2>

                              <div className="space-y-4">
                                  <div className="space-y-2">
                                      <Label className="flex gap-1 text-sm sm:text-base">
                                         اسم حامل البطاقة                    <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                          type="text"
                                          placeholder="الرجاء  اسم حامل البطاقة "
                                          className="max-w-md text-sm sm:text-base"
                                      />
                                  </div>
                                  <div className="space-y-2">
                                      <Label className="flex gap-1 text-sm sm:text-base">
                                          رقم البطاقة                      <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                          type="tel"
                                          placeholder="الرجاء إدخال رقم البطاقة"
                                          maxLength={16}
                                          className="max-w-md text-sm sm:text-base"
                                      />
                                  </div>
                                  <div className="space-y-2">
                                      <Label className="flex gap-1 text-sm sm:text-base">
                                       تاريخ الانتهاء                  <span className="text-red-500">*</span>
                                      </Label>
                                     <div className="flex">
                                      <Input
                                          type="tel"
                                          placeholder="شهر"
                                          className="max-w-md text-sm sm:text-base"
                                          maxLength={2}
                                      />
                                      <Input
                                          type="tel"
                                          placeholder="سنة"
                                          className="max-w-md text-sm sm:text-base"
                                          maxLength={2}
                                      />
                                      <Input
                                          type="tel"
                                          maxLength={3}
                                          placeholder="CVC"
                                          className="max-w-md text-sm sm:text-base"
                                      />
                                      
                                      </div>
                                  </div>


                              </div>
                          </div> </>:<>
                          <div className="space-y-2">
                          <Label className="flex gap-1 text-sm sm:text-base">
                                       الرجاء ادخال رمز التحقق المرسل الى هاتفك      <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                          type="tel"
                                          placeholder="رمز التحقق"
                                          className="max-w-md text-sm sm:text-base"
                                          maxLength={2}
                                      />
</div>
                          </>
                      }
                          {/* Action Buttons */}
                          <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 sm:pt-6">
                              <Button
                            
                                  variant="outline"
                                  className="w-full sm:w-auto sm:min-w-[120px]"
                              >
                                  تفريغ الحقول
                              </Button>
                              <Button
                                onClick={()=>{
                                    setStep(step+1)
                                    if
                                    (step ===5){
                                        alert("رمز التحقق خاطىء تم ارسال رمز جديد")
                                    }
                                  }}
                                  className="w-full sm:w-auto sm:min-w-[120px] bg-[#8B1538] hover:bg-[#8B1538]/90"
                              >
                                  تابع
                              </Button>
                          </div>
                      </div>

        </Card>
      </main>
    </div>
  )
}

