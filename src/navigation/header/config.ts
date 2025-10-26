import { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'

export const HeaderNav: GlobalConfig = {
  slug: 'header-nav',
  label: 'Header Navigation',
  access: {
    read: anyone,
  },
  fields: [

  ],
}