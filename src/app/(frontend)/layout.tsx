import React from 'react'
import { Metadata } from 'next'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Montserrat, Space_Grotesk } from 'next/font/google'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { GlobalSetting } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import JsonLd from '@/utilities/jsonLd'

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-montserrat'
})
const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  style: 'normal',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})
export async function generateMetadata(): Promise<Metadata> {
  const siteSetting: GlobalSetting = await getCachedGlobal('global-settings', 1)()
  const serverURL = getServerSideURL();
  const favicon = typeof siteSetting?.general?.favicon === 'object' && siteSetting?.general?.favicon?.url ? siteSetting?.general?.favicon?.url : '/favicon.ico';
  const icon16Url = typeof siteSetting?.general?.icon16 === 'object' && siteSetting?.general?.icon16?.url ? siteSetting?.general?.icon16?.url : '';
  const icon16MimeType = typeof siteSetting?.general?.icon16 === 'object' && siteSetting?.general?.icon16?.mimeType ? siteSetting?.general?.icon16.mimeType : '';
  const icon32Url = typeof siteSetting?.general?.icon32 === 'object' && siteSetting?.general?.icon32?.url ? siteSetting?.general?.icon32?.url : '';
  const icon32MimeType = typeof siteSetting?.general?.icon32 === 'object' && siteSetting?.general?.icon32?.mimeType ? siteSetting?.general?.icon32?.mimeType : '';
  const icon96Url = typeof siteSetting?.general?.icon96 === 'object' && siteSetting?.general?.icon96?.url ? siteSetting?.general?.icon96?.url : '';
  const icon96MimeType = typeof siteSetting?.general?.icon96 === 'object' && siteSetting?.general?.icon96?.mimeType ? siteSetting?.general?.icon96?.mimeType : '';
  const appleTouchIconUrl = typeof siteSetting?.general?.appleTouchIcon180 === 'object' && siteSetting?.general?.appleTouchIcon180?.url ? siteSetting?.general?.appleTouchIcon180?.url : '';
  const appleTouchIconMimeType = typeof siteSetting?.general?.appleTouchIcon180 === 'object' && siteSetting?.general?.appleTouchIcon180?.mimeType ? siteSetting?.general?.appleTouchIcon180?.mimeType : '';

  return {
    title: siteSetting?.general?.name ? siteSetting.general?.name : 'Website',
    description: siteSetting?.general?.description ? siteSetting.general?.description : 'A blank template using Payload in a Next.js app.',
    metadataBase: new URL(serverURL),
    alternates: {
      canonical: siteSetting?.canonical ? siteSetting?.canonical : serverURL
    },
    verification: {
      google: siteSetting?.seo?.googleSiteVerification ? siteSetting?.seo?.googleSiteVerification : '',
      other: {
        'facebook-domain-verification': siteSetting?.seo?.facebookSiteVerification ? siteSetting?.seo?.facebookSiteVerification : '',
      },
    },
    robots: {
      index: siteSetting?.seo?.robots?.index ? siteSetting?.seo?.robots?.index : true,
      follow: siteSetting?.seo?.robots?.follow ? siteSetting?.seo?.robots?.follow : true,
      nocache: siteSetting?.seo?.robots?.nocache ? siteSetting?.seo?.robots?.nocache : true,
      googleBot: {
        index: siteSetting?.seo?.googleBot?.index ? siteSetting?.seo?.googleBot?.index : true,
        follow: siteSetting?.seo?.googleBot?.follow ? siteSetting?.seo?.googleBot?.follow : true,
        noimageindex: siteSetting?.seo?.googleBot?.noImageIndex ? siteSetting?.seo?.googleBot?.noImageIndex : true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    publisher: siteSetting?.general?.name ? siteSetting.general?.name : 'Website',
    icons:{
      icon: [
        {
          url: favicon,
          type: 'image/x-icon',
          sizes: '48x48',
        },
        {
          url: icon16Url,
          type: icon16MimeType,
          sizes: '16x16',
        },
        {
          url: icon32Url,
          type: icon32MimeType,
          sizes: '32x32',
        },
        {
          url: icon96Url,
          type: icon96MimeType,
          sizes: '96x96',
        },
      ],
      apple: {
        url: appleTouchIconUrl,
        type: appleTouchIconMimeType,
        sizes: '180x180',
      },
    }
  }
}


export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const siteSetting: GlobalSetting = await getCachedGlobal('global-settings', 1)()
  const schemas = siteSetting?.seo?.schemas ?? [];

  return (
    <html
      lang={`${siteSetting?.language ? siteSetting?.language : 'en-IN'}`}
      suppressHydrationWarning
      className={`${montserrat.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme={`${siteSetting?.theme ? siteSetting?.theme : 'light'}`}
          enableSystem
          disableTransitionOnChange
        >
          {
            schemas.map((schema, index) => (
              <JsonLd key={index} schema={schema.schema} name={schema.name} />
            ))
          }
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
