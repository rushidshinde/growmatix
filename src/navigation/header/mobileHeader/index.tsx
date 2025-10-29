'use client'
import React from 'react'
import { GlobalSetting, HeaderNav } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
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
import RenderedBrandLogo from '@/navigation/header/navComponents/renderedBrandLogo'



export default function MobileHeader({ header, siteSetting }: { header : HeaderNav; siteSetting : GlobalSetting }) {
  return (
    <div className="w-full hidden md:flex flex-row items-center justify-between gap-x-16 font-medium">
      <Link href={'/'} className="w-auto flex-none xs:flex-shrink max-h-16 outline-none">
        {header?.brand?.logo && typeof header?.brand?.logo === 'object' && (
          <RenderedBrandLogo brandLogo={header?.brand?.logo}/>
        )}
      </Link>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent
          className={
            'max-w-96 xs:w-full z-[200] bg-primary-foreground text-background border-0 flex flex-col'
          }
        >
          <SheetHeader className={'mb-8'}>
            <SheetTitle className={'hidden'}>{siteSetting?.general?.name ? siteSetting?.general?.name : ''}</SheetTitle>
            <Link href={'/'} className="w-auto flex-none xs:flex-shrink max-h-16 outline-none">
              {header?.brand?.logoLight && typeof header?.brand?.logoLight === 'object' && (
                <RenderedBrandLogo brandLogo={header?.brand?.logoLight}/>
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