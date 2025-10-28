'use client'
import React from 'react'
import { GlobalSetting, HeaderNav } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Logo } from '@/navigation/header/desktopHeader'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import RenderedNav from '@/navigation/header/navComponents/renderedNav'
import RenderedButtons from '@/navigation/header/navComponents/renderedButtons'
import { Menu } from 'lucide-react'
import SocialMediaIcons from '@/navigation/socialMediaIcons'



export default function MobileHeader({ header, siteSetting }: { header : HeaderNav; siteSetting : GlobalSetting }) {

  const darkLogo: Logo = {
    src: '',
    alt: '',
    width: undefined,
    height: undefined,
  }
  if (!darkLogo.src && header?.brand?.logo && typeof header.brand.logo === 'object') {
    const { url, updatedAt, alt, width, height } = header.brand.logo
    darkLogo.src = getMediaUrl(url, updatedAt)
    darkLogo.alt = alt
    darkLogo.width = width
    darkLogo.height = height
  }

  const lightLogo: Logo = {
    src: '',
    alt: '',
    width: undefined,
    height: undefined,
  }
  if (!lightLogo.src && header?.brand?.logoLight && typeof header.brand.logoLight === 'object') {
    const { url, updatedAt, alt, width, height } = header.brand.logoLight
    lightLogo.src = getMediaUrl(url, updatedAt)
    lightLogo.alt = alt
    lightLogo.width = width
    lightLogo.height = height
  }



  return (
    <div className="w-full hidden md:flex flex-row items-center justify-between gap-x-16 font-medium">
      <Link href={'/'} className="w-auto flex-none xs:flex-shrink max-h-16 outline-none">
        {header?.brand?.logo && typeof header?.brand?.logo === 'object' && (
          <Image
            src={darkLogo.src}
            alt={darkLogo.alt ? darkLogo.alt : ''}
            className="w-auto h-full max-h-16 object-contain"
            width={darkLogo.width ? darkLogo.width : undefined}
            height={darkLogo.height ? darkLogo.height : undefined}
            quality={100}
            loading={'eager'}
            priority={true}
            aria-label={'brand logo'}
          />
        )}
      </Link>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent
          className={'max-w-96 xs:w-full z-[200] bg-primary-foreground text-background border-0 flex flex-col'}
        >
          <SheetHeader className={'mb-8'}>
            <SheetTitle className={'hidden'}>{lightLogo.alt ? lightLogo.alt : ''}</SheetTitle>
            <Link href={'/'} className="w-auto flex-none xs:flex-shrink max-h-16 outline-none">
              {header?.brand?.logoLight && typeof header?.brand?.logoLight === 'object' && (
                <Image
                  src={lightLogo.src}
                  alt={lightLogo.alt ? lightLogo.alt : ''}
                  className="w-auto h-full max-h-16 object-contain"
                  width={lightLogo.width ? lightLogo.width : undefined}
                  height={lightLogo.height ? lightLogo.height : undefined}
                  quality={100}
                  loading={'eager'}
                  priority={true}
                  aria-label={'brand logo'}
                />
              )}
            </Link>
          </SheetHeader>
          <div className="relative max-w-full flex flex-col flex-grow items-start justify-start gap-y-6 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden">
            <RenderedNav nav={header?.nav} />
            <RenderedButtons buttons={header?.buttons} />
          </div>
          <SheetFooter className={'mt-8'}>
            <div className="w-full py-0">
              <SocialMediaIcons siteSetting={siteSetting} />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}