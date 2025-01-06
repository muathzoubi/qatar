import { Metadata } from 'next';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'حكومي - البوابة الحكومية لدولة قطر',
  description: 'البوابة الرسمية لحكومة دولة قطر',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
     
<head/>
      <body>
   
      <main>
      {children}
      </main>
        </body>
    </html>
  );
}
