import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, MenuIcon, MessageSquare, MessageSquareText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatisticsSection } from '@/components/ statistics-section';
import ServicesPage from '@/components/vertical-carousel';
import { Tabs, TabsList, TabsTrigger,TabsContent } from '@/components/ui/tabs';
import { Bookmark } from '@/components/bookmark';
import { MapSection } from '@/components/map';
import { SupportSection } from '@/components/support';
const services = [
  {
    id: 1,
    title: "طلب تجديد البطاقة الصحية",
    icon: <Bookmark  />,
  },
  {
    id: 2,
    title: "الاستعلام عن المخالفات المرورية",
    icon: <Bookmark  />,
  },
  {
    id: 3,
    title: "الاستعلام عن حالة طلب البطاقة الصحية",
    icon: <Bookmark  />,
  },
  {
    id: 4,
    title: " وظيفة من خلال منصة كوادر الوطنية للتوظيف ",
    icon: <Bookmark  />,
  },
  {
    id: 5,
    title: "طلب إصدار بطاقة تموين",
    icon: <Bookmark  />,
  },
]


export default function HomePage() {
  return (
    
      <main className="container mx-auto space-y-6 sm:space-y-8 pb-20">
        {/* Hero Section */}
        <section className="relative -mx-4 lg:-mx-8">
          <div className="relative h-[40vh]">
            <Image
              src="/head.avif"
              alt="Doha Skyline"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="space-y-4 p-4">
                <h1 className="text-4xl font-bold text-white">
                  قطر الأكثر أماناً عالمياً
                </h1>
                <p className="text-white/90 text-sm leading-relaxed max-w-lg">
                  واصلت قطر تصدرها لدول العالم في معدلات الأمان، وذلك للمرة
                  الخامسة على التوالي متفوقة على 142 بلداً يشملهم مؤشر نمبيو
                  للأمان
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 -mt-6 sm:-mt-8 relative z-10">
            
           <div className='mx-4 py-4'>
           <Button className="w-full py-4  bg-[#8B0D12] hover:bg-[#6F0A0E] text-white text-lg  sm:text-xl my-4 ml-4">
<Link href={'/submit'} >
طلب تجديد البطاقة الصحية
</Link>            </Button>
           </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-4 space-y-4 sm:space-y-6">
        <h1 className="text-4xl font-bold text-[#8A1538] mb-6">الخدمات</h1>
        
        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          تقدّم الوزارات والهيئات الحكومية وشبه الحكومية في دولة قطر ما يقرب من 2,300 خدمة، منها أكثر من 1,500 خدمة رقمية متكاملة، تشمل مختلف القطاعات الحيوية بهدف تيسير الإجراءات لمختلف فئات الجمهور وتسهيل وصولهم إلى الخدمات.
        </p>

        <Tabs defaultValue="popular" className="w-full p-1">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="latest" className="text-lg py-3  text-white bg-[#8A1538]">
              أحدث الخدمات
            </TabsTrigger>
            <TabsTrigger value="popular" className="text-lg py-3 ">
              الخدمات الشائعة
            </TabsTrigger>
          </TabsList>
          <TabsContent value="popular" dir='rtl'>
            <div className="space-y-4">s
              {services.map((service) => (
                <Card key={service.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between	 gap-4">
                    <Link href='/submit' className="text-sm text-gray-800">{service.title}</Link>
                    {service.icon}

                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
      
        </Tabs>

        <Card className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <MessageSquareText className="w-10 h-10 text-[#8A1538]" />
            <span className="text-lg text-[#8A1538] font-medium">عرض جميع الخدمات</span>
          </div>
        </Card>

        <div className="mt-8">
          {/* Additional content can be added here */}
        </div>
        </section>

        {/* Statistics Section */}
        <StatisticsSection />

        {/* News Section */}
        <section className="px-4 space-y-3 sm:space-y-4 bg-[#891538] p-4 rounded">
          <h2 className="text-xl sm:text-2xl font-bold text-right text-red-900 ">
            آخر الأخبار
          </h2>
          <Card className="overflow-hidden">
            <div className="relative h-32 sm:h-48 w-full">
              <Image
                src="/bg.avif"
                alt="Healthcare Strategy News"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-3 sm:p-4 bg-white">
              <p className="text-right text-sm sm:text-base">
                وزير الصحة العامة تدشن استراتيجية "حمد الطبية" في إطار الرعاية
                الصحية 2024-2030
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="relative h-32 sm:h-48 w-full">
              <Image
                src="/dewn.avif"
                alt="Healthcare Strategy News"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-3 sm:p-4  bg-white">
              <p className="text-right text-sm sm:text-base">
                تطبيق نظام العمل المرن والعمل عن بُعد لموظفي الجهات الحكومية
                اعتبارًا من اليوم
              </p>
            </CardContent>
          </Card>
        
          <Card className="overflow-hidden">
            <div className="relative h-32 sm:h-48 w-full">
              <Image
                src="/MOJLogo2024.jpg"
                alt="Healthcare Strategy News"
                fill
                className="object-cover "
              />
            </div>
            <CardContent className="p-3 sm:p-4  bg-white">
              <p className="text-right text-sm sm:text-base ">
                سعادة وزير الاتصالات وتكنولوجيا المعلومات يلتقي قادة عالميين
                لتعزيز الشراكات الرقمية والابتكار
              </p>
            </CardContent>
          </Card>
        </section>
        <ServicesPage />
        <MapSection/>
        <SupportSection/>
      </main>

  );
}
