import { Field } from 'payload'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      defaultValue: 'lowImpact',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Slider',
          value: 'slider',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'heroFieldsSlider',
      label: false,
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => ['slider'].includes(type),
      },
      fields: [
        {
          name: 'slide',
          labels: {
            singular: 'Slide',
            plural: 'Slides',
          },
          type: 'array',
          dbName: 'heroSlider',
          maxRows: 7,
          fields: [
            {
              name: 'richText',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
            linkGroup({
              overrides: {
                maxRows: 2,
              },
            }),
            {
              name: 'alignment',
              label: 'Alignment',
              type: 'select',
              defaultValue: 'center',
              options: [
                {
                  label: 'Center',
                  value: 'center',
                },
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Right',
                  value: 'right',
                },
              ],
              required: true,
            },
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'autoplay',
              type: 'checkbox',
              defaultValue: true,
              required: true,
              admin: {
                width: '50%',
                description: 'uncheck to disable autoplay.',
              }
            },
            {
              name: 'timeCount',
              label: 'Show Time Counter',
              type: 'checkbox',
              defaultValue: false,
              required: true,
              admin: {
                width: '50%',
                description: 'check to show time counter on bottom left corner.',
                condition: (_, { autoplay } = {}) => autoplay,
              }
            },
            {
              name: 'delay',
              type: 'number',
              defaultValue: 5,
              required: true,
              min: 1,
              admin: {
                width: '100%',
                description: 'Add delay time in seconds.',
                condition: (_, { autoplay } = {}) => autoplay,
              }
            },
          ],
        },
      ],
    },
    {
      name: 'heroFields',
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'lowImpact', 'mediumImpact'].includes(type),
      },
      fields: [
        {
          name: 'richText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
        linkGroup({
          overrides: {
            maxRows: 2,
          },
        }),
        {
          name: 'alignment',
          label: 'Alignment',
          type: 'select',
          defaultValue: 'center',
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    }
  ],
}
