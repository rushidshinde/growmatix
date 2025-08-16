import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

export const LowImpactHero: React.FC<NonNullable<Page['hero']['heroFields']>> = ({richText}) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {richText && <RichText data={richText} enableGutter={false} />}

      </div>
    </div>
  )
}
