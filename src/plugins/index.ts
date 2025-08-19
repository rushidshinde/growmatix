import { Plugin } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page, Blog } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'


const generateTitle: GenerateTitle<Page | Blog> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}
const generateURL: GenerateURL = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.fullPath ? `${url}${doc.fullPath}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  redirectsPlugin({
    collections: ['pages', 'blog'],
    overrides: {
      admin: {
        defaultColumns: ['from', 'to.type', 'to.reference', 'to.url']
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
]