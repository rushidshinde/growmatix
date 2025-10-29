'use server'
import React, { Fragment } from 'react'
import { getCachedGlobalSettings, getCachedHeaderNav } from '@/utilities/getGlobals'
import { GlobalSetting, HeaderNav } from '@/payload-types'
import HeaderNavComponent from '@/navigation/header/headerNavComponent'

export default async function HeaderNavServerComponent() {
  const header: HeaderNav = await getCachedHeaderNav();
  const siteSetting: GlobalSetting = await getCachedGlobalSettings()
  return (
    <Fragment>
      <HeaderNavComponent header={header} siteSetting={siteSetting}/>
    </Fragment>
  )
}