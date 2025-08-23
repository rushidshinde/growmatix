import { CodeFieldValidation, CollectionConfig, type TextFieldSingleValidation } from 'payload'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateBlog, revalidateBlogDelete } from '@/collections/Blogs/hooks/revalidateBlog'

export const Blogs: CollectionConfig<'blog'> = {
  slug: 'blog',
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
    defaultColumns: ['title', 'fullPath', 'updatedAt'],
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
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
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
      // defaultValue: new Date('today'),
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
    {
      name: 'fullPath',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Auto-generated full path from slug',
      },
      hooks: {
        beforeChange: [
          ({ data, operation }) => {
            if(operation === 'create' || operation === 'update') {
              const slug = data?.slug || '';
              return `/blog/${slug}`
            }
            return ""
          }
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateBlog],
    afterDelete: [revalidateBlogDelete],
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