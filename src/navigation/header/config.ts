import { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { link } from '@/fields/link'
import { revalidateHeaderNav } from '@/navigation/header/hooks/revalidateHeaderNav'

export const HeaderNav: GlobalConfig = {
  slug: 'header-nav',
  label: 'Header Navigation',
  access: {
    read: anyone,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'brand',
          label: 'Brand',
          fields: [
            {
              name: 'logo',
              label: 'Dark Color Logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              filterOptions: {
                mimeType: {
                  in: [
                    'image/png',
                    'image/jpeg',
                    'image/jpg',
                    'image/svg+xml',
                    'image/webp',
                    'image/avif',
                  ],
                },
              },
              admin: {
                description: 'Select a brand logo for light background',
                allowCreate: false,
              },
            },
            {
              name: 'logoLight',
              label: 'Light Color Logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              filterOptions: {
                mimeType: {
                  in: [
                    'image/png',
                    'image/jpeg',
                    'image/jpg',
                    'image/svg+xml',
                    'image/webp',
                    'image/avif',
                  ],
                },
              },
              admin: {
                description: 'Select a brand logo for dark background',
                allowCreate: false,
              },
            },
          ],
        },
        {
          name: 'nav',
          label: 'Navigation',
          fields: [
            {
              name: 'level0Links',
              label: 'Links Level 0',
              labels: {
                singular: 'Level 0 Link',
                plural: 'Level 0 Links',
              },
              dbName: 'l0',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                  sizes: false,
                }),
                {
                  name: 'enableL1',
                  type: 'checkbox',
                  defaultValue: false,
                  required: true,
                  admin: {
                    description: 'Enable level 1 links',
                  },
                },
                {
                  name: 'level1Links',
                  label: 'Links Level 1',
                  labels: {
                    singular: 'Level 1 Link',
                    plural: 'Level 1 Links',
                  },
                  dbName: 'l1',
                  type: 'array',
                  admin: {
                    condition: (_, { enableL1 } = {}) => enableL1,
                  },
                  fields: [
                    link({
                      appearances: false,
                      sizes: false,
                    }),
                    {
                      name: 'enableL2',
                      type: 'checkbox',
                      defaultValue: false,
                      required: true,
                      admin: {
                        description: 'Enable level 2 links',
                      },
                    },
                    {
                      name: 'level2Links',
                      label: 'Links Level 2',
                      labels: {
                        singular: 'Level 2 Link',
                        plural: 'Level 2 Links',
                      },
                      dbName: 'l2',
                      type: 'array',
                      admin: {
                        condition: (_, { enableL2 } = {}) => enableL2,
                      },
                      fields: [
                        link({
                          appearances: false,
                          sizes: false,
                        }),
                        {
                          name: 'enableL3',
                          type: 'checkbox',
                          defaultValue: false,
                          required: true,
                          admin: {
                            description: 'Enable level 3 links',
                          },
                        },
                        {
                          name: 'level3Links',
                          label: 'Links Level 3',
                          labels: {
                            singular: 'Level 3 Link',
                            plural: 'Level 3 Links',
                          },
                          dbName: 'l3',
                          type: 'array',
                          admin: {
                            condition: (_, { enableL3 } = {}) => enableL3,
                          },
                          fields: [
                            link({
                              appearances: false,
                              sizes: false,
                            }),
                            {
                              name: 'enableL4',
                              type: 'checkbox',
                              defaultValue: false,
                              required: true,
                              admin: {
                                description: 'Enable level 4 links',
                              },
                            },
                            {
                              name: 'level4Links',
                              label: 'Links Level 4',
                              labels: {
                                singular: 'Level 4 Link',
                                plural: 'Level 4 Links',
                              },
                              dbName: 'l4',
                              type: 'array',
                              admin: {
                                condition: (_, { enableL4 } = {}) => enableL4,
                              },
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
              ],
            },
          ],
        },
        {
          name: 'buttons',
          label: 'Buttons',
          fields: [
            {
              name: 'buttons',
              type: 'array',
              fields: [
                link({
                  appearances: ['default', 'outline'],
                  sizes: ['default', 'lg'],
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeaderNav],
  },
}