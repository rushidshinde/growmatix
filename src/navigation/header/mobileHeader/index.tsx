'use client'
import React from 'react'
import { HeaderNav } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Logo } from '@/navigation/header/desktopHeader'
import Image from 'next/image'
import Link from 'next/link'



export default function MobileHeader({ header }: { header : HeaderNav }) {

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
      <Link href={'/'} className="w-auto flex-none max-h-16 outline-none">
        {header?.brand?.logo && typeof header?.brand?.logo === 'object' && (
          <Image
            src={darkLogo.src}
            alt={darkLogo.alt ? darkLogo.alt : ''}
            className='w-full h-full max-h-16 object-contain'
            width={darkLogo.width ? darkLogo.width : undefined}
            height={darkLogo.height ? darkLogo.height : undefined}
            quality={100}
            loading={'eager'}
            priority={true}
            aria-label={'brand logo'}
          />
        )}
      </Link>
      <div className="flex flex-grow items-center justify-end gap-x-6">

      </div>
    </div>
  )
}