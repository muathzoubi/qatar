'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Youtube, PlayCircle, HelpCircle, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

const steps = [
  { id: 1, title: 'تقديم الطلب' },
  { id: 2, title: 'المرفقات' },
  { id: 3, title: 'الرسوم' },
  { id: 4, title: 'المراجعة والتأكيد' },
]

export default function HealthCardRenewal() {
    const [isHelpful, setIsHelpful] = useState<'yes' | 'no' | null>(null)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>الخدمات الحكومية</span>
              <ChevronLeft className="h-4 w-4" />
              <span>الصحة</span>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-foreground">تجديد البطاقة الصحية</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content */}
          <main className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">طلب تجديد البطاقة الصحية</h1>
              <p className="text-sm text-muted-foreground">
                يجب تعبئة جميع الحقول المطلوبة والمشار إليها بعلامة *
              </p>
            </div>

            {/* Video Section */}
            <Card className="aspect-video relative bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="ghost" size="icon" className="h-16 w-16">
                  <PlayCircle className="h-16 w-16" />
                </Button>
              </div>
            </Card>

            {/* Form Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-blue-500" />
                <p className="text-sm">
                  من المستندات المطلوبة للموظفين والمتقاعدين والمستفيدين من الضمان الاجتماعي
                  يرجى إرفاق المستندات
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline">رجوع</Button>
              <Button>

<Link href="/submit">
التالي
</Link>
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:order-first">
            <Card className="p-4">
              <div className="space-y-4">
                <h2 className="font-semibold">خطوات تقديم الطلب</h2>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
                    >
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-sm
                        ${index === 0 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                        {step.id}
                      </div>
                      <span className="text-sm">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#8B1538] text-white mt-auto bg-red-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">حكومي - بوابة الحكومة الإلكترونية في قطر</p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
            {/* Feedback Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-right">هل كانت هذه المقالة مفيدة؟</h2>
            
            <div className="flex justify-center gap-8">
              <Button
                variant="outline"
                className={`w-24 h-24 flex flex-col items-center gap-2 ${
                  isHelpful === 'yes' ? 'border-green-500 bg-green-50' : ''
                }`}
                onClick={() => setIsHelpful('yes')}
              >
                <ThumbsUp className={`h-8 w-8 ${
                  isHelpful === 'yes' ? 'text-green-500' : 'text-gray-400'
                }`} />
                <span>نعم</span>
              </Button>
              
              <Button
                variant="outline"
                className={`w-24 h-24 flex flex-col items-center gap-2 ${
                  isHelpful === 'no' ? 'border-red-500 bg-red-50' : ''
                }`}
                onClick={() => setIsHelpful('no')}
              >
                <ThumbsDown className={`h-8 w-8 ${
                  isHelpful === 'no' ? 'text-red-500' : 'text-gray-400'
                }`} />
                <span>لا</span>
              </Button>
            </div>

            {isHelpful && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-right block">ملاحظات</label>
                  <textarea
                    placeholder="يرجى مشاركة ملاحظاتك..."
                    className="min-h-[100px] text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-right block">تصنيف المشكلة</label>
                  <RadioGroup className="space-y-2">
                    <div className="flex items-center justify-end space-x-2">
                      <label htmlFor="issue1">نص غير واضح</label>
                      <RadioGroupItem value="unclear" id="issue1" />
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <label htmlFor="issue2">معلومات غير دقيقة</label>
                      <RadioGroupItem value="inaccurate" id="issue2" />
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <label htmlFor="issue3">رابط لا يعمل</label>
                      <RadioGroupItem value="broken" id="issue3" />
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline">إلغاء</Button>
                  <Button variant="destructive">إرسال</Button>
                </div>
              </div>
            )}
          </div>
      </footer>
    </div>
  )
}

