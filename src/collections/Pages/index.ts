import { CodeFieldValidation, CollectionConfig, type TextFieldSingleValidation } from 'payload'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidatePageDelete, revalidatePage } from '@/collections/Pages/hooks/revalidatePage'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { hero } from '@/heros/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Content } from '@/blocks/Content/config'
import { FormBlock } from '@/blocks/Form/config'
import { segmentValidate } from '@/collections/Pages/hooks/segmentValidate'
import { setHomepage } from '@/collections/Pages/hooks/setHomepage'
import { isRouteRestricted } from '@/utilities/restrictedRoutes'
import { livePreviewBreakpoints } from '@/collections/Pages/previewBreakpoints'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    fullPath: true,
  },
  admin: {
    defaultColumns: ['title', '_status', 'fullPath', 'homepage', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          fullPath: typeof data?.fullPath === 'string' ? data.fullPath : '',
          req,
        })
      },
      breakpoints: [...livePreviewBreakpoints],
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        fullPath: typeof data?.fullPath === 'string' ? data.fullPath : '',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaDescriptionField({}),
            MetaImageField({
              relationTo: 'media',
            }),
          ],
        },
        {
          label: 'Advanced',
          name: 'advanced',
          fields: [
            {
              name: 'keywords',
              type: 'relationship',
              relationTo: 'keywords',
              hasMany: true,
              label: 'SEO Keywords',
              admin: {
                description: 'Select relevant keywords for SEO. These will be used in meta tags and may affect search visibility.',
              },
            },
            {
              name: "schemas",
              type: "array",
              label: "JSON-LD Schema Markup",
              admin: {
                description: "Add structured data markup for search engines. Each schema should be valid JSON-LD.",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Schema Name",
                  required: true,
                  admin: {
                    description: "Descriptive name for this schema (e.g., 'Organization', 'Article', 'Product')",
                  },
                },
                {
                  name: "schema",
                  type: "code",
                  label: "JSON-LD Code",
                  required: true,
                  admin: {
                    language: "json",
                    description: "Valid JSON-LD structured data markup",
                  },
                  validate: ((val) => {
                    if (!val) return "Schema code is required"
                    try {
                      const parsed = JSON.parse(val)
                      if (!parsed["@context"]) {
                        return "JSON-LD must include @context property"
                      }
                      if (!parsed["@type"]) {
                        return "JSON-LD must include @type property"
                      }
                      return true
                    } catch (e) {
                      return "Invalid JSON format. Please check your syntax."
                    }
                  }) as CodeFieldValidation,
                },
              ],
            },
            {
              name: 'robots',
              type: 'group',
              admin: {
                description: 'Controls how search engines crawl and index this page.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'index',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                    {
                      name: 'follow',
                      type: 'checkbox',
                      defaultValue: true,
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'canonical',
              type: 'text',
              label: 'Canonical URL',
              admin: {
                placeholder: 'https://',
              },
              validate: ((value) => {
                if (value) {
                  try {
                    const parsed = new URL(value)
                    const isHttps = parsed.protocol === 'https:'
                    return isHttps ? isHttps : 'Only secure URLs are allowed. Use https://'
                  } catch (e) {
                    return 'Invalid URL'
                  }
                }
              }) as TextFieldSingleValidation,
              hooks: {
                beforeChange: [({ value }) => {
                  if(value){
                    return value.endsWith('/') ? value.slice(0, -1) : value;
                  }
                }],
              },
            },
          ],
        },
        {
          name: 'navigation',
          fields: [
            {
              name: 'header',
              type: 'relationship',
              relationTo: 'headers',
              hasMany: false,
              label: 'Choose header',
              admin: {
                description: 'Select header navigation menu for page',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'segments',
      type: 'array',
      label: 'URL Segments',
      minRows: 1,
      admin: {
        position: 'sidebar',
        description:
          'Each segment represents a part of the URL path. For example: ["services", "seo"] creates /services/seo',
        condition: (_, { homepage } = {}) => !homepage,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'segment',
          type: 'text',
          required: true,
          hooks: {
            beforeValidate: [
              ({ value, operation }) => {
                if (value && (operation === 'create' || operation === 'update')) {
                  return value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')
                }
              },
            ],
          },
        },
      ],
    },
    ...slugField('title', {
      slugOverrides: {
        admin: {
          condition: (_, { homepage } = {}) => !homepage,
        },
      },
    }),
    {
      name: 'fullPath',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Auto-generated full path from segments and slug',
      },
      validate: ((value) => {
        if (value && isRouteRestricted(value)) {
          return `The path conflicts with reserved routes. Please use different segments or slug.`
        }
        return true
      }) as TextFieldSingleValidation,
      hooks: {
        beforeChange: [
          ({ data, operation }) => {
            if (operation === 'create' || operation === 'update') {
              if (data?.homepage === true) {
                return '/'
              }
              const slug = data?.slug || ''
              if (data?.segments && Array.isArray(data.segments)) {
                const segmentPath = data.segments.map((item) => item.segment).join('/')
                return segmentPath ? `/${segmentPath}/${slug}` : `/${slug}`
              }
            }
            return ''
          },
        ],
      },
    },
    {
      name: 'homepage',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'Set as Homepage',
      admin: {
        description:
          'Check this to make this page the homepage. Only one page can be the homepage.',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt, setHomepage],
    beforeValidate: [segmentValidate],
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}