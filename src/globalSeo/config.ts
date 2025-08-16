import { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'

export const globalSeo:GlobalConfig = {
  slug: 'global-seo',
  access: {
    read: anyone,
  },
  fields: [
    
  ],
}