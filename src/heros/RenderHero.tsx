import React from 'react'

import type { Page } from '@/payload-types'
import { SliderHero } from '@/heros/SliderHero'
import { HighImpactHero } from '@/heros/HighImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { LowImpactHero } from '@/heros/LowImpact'


export const RenderHero: React.FC<Page['hero']> = ({ type, heroFields, heroFieldsSlider }) => {

  if (!type || type === 'none') return null

  switch (type) {
    case 'slider':
      return heroFieldsSlider ? <SliderHero {...heroFieldsSlider} /> : null
    case 'highImpact':
      return heroFields ? <HighImpactHero {...heroFields} /> : null
    case 'mediumImpact':
      return heroFields ? <MediumImpactHero {...heroFields} /> : null
    case 'lowImpact':
      return heroFields ? <LowImpactHero {...heroFields} /> : null
    default:
      return null
  }
}
