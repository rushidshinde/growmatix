'use client'
import React, { useEffect, useState } from 'react'
import { GlobalSetting, HeaderNav } from '@/payload-types'
import DesktopHeader from '@/navigation/header/desktopHeader'
import MobileHeader from '@/navigation/header/mobileHeader'

export default function HeaderNavComponent({ header, siteSetting }: { header: HeaderNav; siteSetting: GlobalSetting }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  // const [colorChanged, setColorChanged] = useState(false);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      // setColorChanged(currentScrollY > 50);
      setHasScrolled(currentScrollY > 100);

      if (currentScrollY < lastScrollY && hasScrolled) {
        setShow(true);
      } else if (currentScrollY > lastScrollY && hasScrolled) {
        setShow(false);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollY, handleScroll]);

  return (
    <header
      className={`max-h-24 py-4 w-full sticky top-0 left-0 right-0 z-[100] text-foreground bg-background transition-transform duration-300 ${show ? 'transform-none shadow-md' : '-translate-y-full'}`}
    >
      <div className="container">
        <DesktopHeader header={header} />
        <MobileHeader header={header} siteSetting={siteSetting} />
      </div>
    </header>
  )
}