import React from 'react'
import { getCachedGlobalSettings, getCachedHeaderNav } from '@/utilities/getGlobals'
import { GlobalSetting, HeaderNav } from '@/payload-types'
import DesktopHeader from '@/navigation/header/desktopHeader'
import MobileHeader from '@/navigation/header/mobileHeader'

export default async function HeaderNavComponent() {
  const header: HeaderNav = await getCachedHeaderNav();
  const siteSetting: GlobalSetting = await getCachedGlobalSettings()
  return (
    <header className="max-h-24 py-4 sticky top-0 left-0 right-0 z-[100] text-foreground bg-background">
      <div className="container">
        <DesktopHeader header={header} />
        <MobileHeader header={header} siteSetting={siteSetting} />
      </div>
    </header>
  )
}