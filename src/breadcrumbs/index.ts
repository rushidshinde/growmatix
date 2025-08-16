import { Field } from 'payload'

export const breadcrumbs:Field = {
  name: 'breadcrumb',
  type: 'array',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label',
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      label: 'Path',
      admin: {
        description: 'Enter a valid URL path starting with a slash'
      },
    },
  ]
}