import type { ArrayField, Field } from 'payload'
import deepMerge from '@/utilities/deepMerge'
import { link, LinkAppearances, LinkSizes } from '@/fields/link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  sizes?: LinkSizes[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, sizes, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
        sizes,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedLinkGroup, overrides)
}