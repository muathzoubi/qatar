
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card';
import { Building2, TrendingUp, Users2 } from 'lucide-react';
import NewsFeed from '@/components/ber';
import { StatisticsSection } from '@/components/ statistics-section';
import ServicesPage from '@/components/vertical-carousel';
import AboutQatar from '@/components/about-qatar';
import { Hero } from '@/components/hero';
import { Bookmark } from '@/components/bookmark';
import { SupportSection } from '@/components/support';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const VisitorAPI = require("visitorapi");

  const [visitorData, setVisitorData] = useState({}); // store the whole json

  const [ipAddress, setIpAddress] = useState("");

  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cityLatLong, setCityLatLong] = useState(""); // city center latitude and longitude 

  const [currencies, setCurrencies] = useState([]); // currencies data is an array
  const [languages, setLanguages] = useState([]); // languages data is an array

  const [browser, setBrowser] = useState("");
  const [browserVersion, setBrowserVersion] = useState("");

  const [deviceBrand, setDeviceBrand] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceFamily, setDeviceFamily] = useState("");

  const [os, setOs] = useState("");
  const [osVersion, setOsVersion] = useState("");

  useEffect(() => {
  VisitorAPI(
      "0gqvK1uiYNvJt27yvZBi",
    (        data:any) => {
      setVisitorData(data);
      setIpAddress(data.ipAddress);
      setCountryCode(data.countryCode);
      setCountryName(data.countryName);
      setState(data.region);
      setCity(data.city);
      setCityLatLong(data.cityLatLong);
      setCurrencies(data.currencies);
      setLanguages(data.languages);
      setBrowser(data.browser);
      setBrowserVersion(data.browserVersion);
      setDeviceBrand(data.deviceBrand);
      setDeviceModel(data.deviceModel);
      setDeviceFamily(data.deviceFamily);
      setOs(data.os);
      setOsVersion(data.osVersion);
      }
  );
  },[]);
  useEffect(() => {
    if (isLoading) {
      alert(  VisitorAPI().then(()=>{
      }))

      const timer = setTimeout(() => {
      //  router.push('https://app.hukumi-qa.site/')
        setIsLoading(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isLoading])
  return (

   <div dir="rtl" className="min-h-screen bg-gray-50">
    <Hero />
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">الخدمات</h2>
            <div className="space-y-3">
              {[
                'طلب خدمة البطاقة السنوية',
                'الاستعلام عن حالة البطاقة السنوية',
                'الاستعلام عن حالة البطاقة السنوية',
                'طلب خدمة تجديد بطاقة الموظف',
                'طلب بطاقة موظف'
              ].map((service, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-gray-700">{service}</span>
                  <span className="text-gray-700">{<Bookmark/>}</span>
                </div>
              ))}
            </div>
          </div>
{/* */}
<StatisticsSection/>
          <NewsFeed/>
<ServicesPage/>
<AboutQatar/>
<SupportSection/>
        </div>
      </div>
    </div>
  );
}
