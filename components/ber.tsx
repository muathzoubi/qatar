import { ChevronLeft } from 'lucide-react'
import Link from "next/link"

export function Breadcrumb() {
  return (
    <nav className="flex flex-col gap-2 p-4 text-right">
      <div className="flex items-center justify-end gap-2">
        <ChevronLeft className="h-4 w-4" />
        <Link href="/services" className="text-primary hover:underline">
          الخدمات
        </Link>
      </div>
      <div className="flex items-center justify-end gap-2">
        <ChevronLeft className="h-4 w-4" />
        <span className="text-muted-foreground">طلب تجديد البطاقة الصحية</span>
      </div>
    </nav>
  )
}

