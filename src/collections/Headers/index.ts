import { CollectionConfig } from 'payload'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Headers:CollectionConfig<'headers'> = {
  slug: 'headers',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  defaultPopulate: {
    title: true,
    menu: true,
    buttons: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      filterOptions: {
        mimeType: {
          in: ['image/jpg', 'image/png', 'image/gif', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml'],
        },
      },
    },
    {
      type: 'group',
      name: 'menu',
      admin: {
        description: 'Add navigation menu and based on the levels level 1, level 2 and level 3',
      },
      fields: [
        {
          name: 'level1',
          label: 'Link Level 1',
          type: 'array',
          fields: [
            link({
              appearances: false,
              sizes: false,
            }),
            {
              name: 'level2',
              label: 'Link Level 2',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                  sizes: false,
                }),
                {
                  name: 'level3',
                  label: 'Link Level 3',
                  type: 'array',
                  fields: [
                    link({
                      appearances: false,
                      sizes: false,
                    }),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'buttons',
      type: 'group',
      admin: {
        description: 'Use this to add primary or secondary buttons in the nav menu'
      },
      fields: [
        linkGroup({
          overrides: {
            maxRows: 2
          },
          appearances: ['default', 'outline'],
          sizes: ['default', 'lg'],
        })
      ],
    }
  ],
}