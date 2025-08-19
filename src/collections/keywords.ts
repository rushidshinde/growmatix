import { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'

export const Keywords:CollectionConfig<'keywords'> = {
  slug: 'keywords',
  labels: {
    plural: 'Keywords',
    singular: 'Keyword',
  },
  access: {
    read: anyone,
  },
  defaultPopulate: {
    keyword: true,
  },
  admin: {
    defaultColumns: ['keyword'],
    useAsTitle: 'keyword'
  },
  fields: [
    {
      name: 'keyword',
      label: 'Keyword',
      type: 'text',
      required: true,
    }
  ],
}