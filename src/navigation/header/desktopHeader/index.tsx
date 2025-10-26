'use client'
import React from 'react'
import { HeaderNav } from '@/payload-types'
import Image, { type StaticImageData } from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import RenderedNav from '@/navigation/header/navComponents/renderedNav'
import Link from 'next/link'
import RenderedButtons from '@/navigation/header/navComponents/renderedButtons'

export interface Logo {
  src: StaticImageData | string
  alt?: string | null
  width?: number | null
  height?: number | null
}

export default function DesktopHeader({ header }: { header : HeaderNav }) {

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

  return (
    <div className="w-full flex md:hidden flex-row items-center justify-between gap-x-16 font-medium"  >
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
        <RenderedNav nav={header?.nav}/>
        <RenderedButtons buttons={header?.buttons}/>
      </div>
    </div>
  )
}