
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        router.push('https://asdasdss.netlify.app/')
        setIsLoading(false)}, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading])
  return (
    
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isLoading?'':'hidden'}`}>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <img src='/loader-new-gif.gif' className="fixed h-16 text-primary mx-auto" />
        <img src='/loader-new-icon.png' className="absloute h-16" />
      </div>
        </div>
    </div>

  );
}
