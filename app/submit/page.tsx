'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: 'معلومات البطاقة', status: 'current' },
  { id: 2, title: 'استمارة التقديم', status: 'upcoming' },
  { id: 3, title: 'تفاصيل الدفع', status: 'upcoming' },
  { id: 4, title: 'إتمام العملية', status: 'upcoming' },
]

export default function HealthCardRenewal() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>الخدمات الحكومية</span>
            <ChevronLeft className="h-4 w-4" />
            <span>الصحة</span>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-foreground">خدمة البطاقة الصحية الإلكترونية</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <div className="p-6">
            {/* Title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#8B1538] text-white p-4 rounded-lg">
                <span>المساعدة</span>
              </div>
              <h1 className="text-2xl font-bold">خدمة البطاقة الصحية الإلكترونية</h1>
            </div>

            {/* Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="relative">
                      <div 
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          step.status === 'current' 
                            ? "bg-[#8B1538] text-white" 
                            : "bg-gray-200 text-gray-500"
                        )}
                      >
                        {step.id}
                      </div>
                      <div className="mt-2 text-sm text-center whitespace-nowrap">
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div 
                        className={cn(
                          "h-[2px] w-full mx-4",
                          step.status === 'completed' ? "bg-[#8B1538]" : "bg-gray-200"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <p className="text-sm text-gray-500 italic">
                طلب الاستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام الطلب
              </p>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold">معلومات</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex gap-1">
                      الرجاء إدخال رقم البطاقة الشخصية
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input placeholder="الرجاء إدخال الرقم" className="max-w-md" />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex gap-1">
                      نوع العملية
                      <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup defaultValue="renewal" className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="renewal" id="renewal" />
                        <Label htmlFor="renewal">تجديد</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="reissue" id="reissue" />
                        <Label htmlFor="reissue">إعادة الطلب (ePurse المفقود أو التالف)</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="check" id="check" />
                        <Label htmlFor="check">تحقق من تاريخ انتهاء الصلاحية</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <Button variant="outline" className="min-w-[120px]">
                  تفريغ الحقول
                </Button>
                <Button className="min-w-[120px] bg-[#8B1538] hover:bg-[#8B1538]/90">
                  تابع
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

