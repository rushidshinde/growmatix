'use client'
import React from 'react'
import { HeaderNav } from '@/payload-types'
import RenderedNav from '@/navigation/header/navComponents/renderedNav'
import Link from 'next/link'
import RenderedButtons from '@/navigation/header/navComponents/renderedButtons'
import RenderedBrandLogo from '@/navigation/header/navComponents/renderedBrandLogo'

export default function DesktopHeader({ header }: { header : HeaderNav }) {

  return (
    <div className="w-full flex md:hidden flex-row items-center justify-between gap-x-16 font-medium"  >
      <Link href={'/'} className="w-auto flex-none max-h-16 outline-none">
        {header?.brand?.logo && typeof header?.brand?.logo === 'object' && (
          <RenderedBrandLogo brandLogo={header?.brand?.logo}/>
        )}
      </Link>
      <div className="flex flex-grow items-center justify-end gap-x-6">
        <RenderedNav nav={header?.nav}/>
        <RenderedButtons buttons={header?.buttons}/>
      </div>
    </div>
  )
}