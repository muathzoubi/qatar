import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Building2,
  FileText,
  Calendar,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';

const footerLinks = [
  { title: 'مجلس الوزراء', href: '#' },
  { title: 'الدستور', href: '#' },
  { title: 'مجلس الشورى', href: '#' },
  { title: 'المجلس البلدي المركزي', href: '#' },
  { title: 'أهداف التنمية المستدامة', href: '#' },
  { title: 'العلم الوطني', href: '#' },
  { title: 'اليوم الوطني', href: '#' },
  { title: 'اليوم الرياضي للدولة', href: '#' },
];

const serviceIcons = [
  { icon: Users, label: 'الخدمات العامة' },
  { icon: Building2, label: 'المؤسسات' },
  { icon: FileText, label: 'الوثائق' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          {footerLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Service Icons */}
        <div className="mt-12 grid grid-cols-3 sm:grid-cols-5 gap-6 justify-items-center">
          {serviceIcons.map(({ icon: Icon, label }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <Icon className="w-6 h-6 text-[#8B0D12]" />
              </div>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        {/* Location Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-right mb-4">
            الموقع الرئيسي
          </h3>
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src="/map.webp"
              alt="Location Map"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8 ">
          <div className="flex flex-col items-center gap-6">
            {/* App Store Badges */}
            <div className="flex gap-4">
              <Link href="#" className="h-10">
                <Image
                  src="/app-store.svg"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="h-full w-auto"
                />
              </Link>
              <Link href="#" className="h-10">
                <Image
                  src="/google-play.svg"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="h-full w-auto"
                />
              </Link>
            </div>
<div className=''>
            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-gray-600">
              <p>جميع الحقوق محفوظة © {new Date().getFullYear()} حكومة قطر</p>
            </div>
          </div></div>
        </div>
      </div>
    </footer>
  );
}
