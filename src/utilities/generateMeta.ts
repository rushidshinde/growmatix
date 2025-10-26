import type { Metadata } from 'next'

import type { Media, Page, Config, GlobalSetting, Keyword } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCachedGlobalSettings } from '@/utilities/getGlobals'


const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

const getKeywords = (keywords:(number | Keyword)[] | null | undefined)=> {
  const extracted: string[] = []
  if (!keywords) {
    return undefined
  }
  keywords.map((keyword) => {
    if(typeof keyword === 'object' && keyword !== null){
      extracted.push(keyword.keyword)
    }
  })
  return extracted
}

export const generateMeta = async (args: {
  doc: Page | null
}): Promise<Metadata> => {
  const { doc } = args

  const siteSetting:GlobalSetting = await getCachedGlobalSettings();

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? `${doc?.meta?.title}`
    : `${siteSetting?.general?.name ? siteSetting?.general?.name : 'Website Template'}`

  const canonical = doc?.advanced?.canonical ? doc?.advanced?.canonical : siteSetting?.canonical ? `${siteSetting?.canonical}${doc?.fullPath}` : ` ${getServerSideURL()}${doc?.fullPath}`

  return {
    title,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title,
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      url: Array.isArray(doc?.fullPath) ? doc?.fullPath.join('/') : '/',
    }),
    alternates: {
      canonical: canonical,
    },
    keywords: getKeywords(doc?.advanced?.keywords),
    robots: {
      index: doc?.advanced?.robots?.index ? doc?.advanced?.robots?.index : true,
      follow: doc?.advanced?.robots?.follow ? doc?.advanced?.robots?.follow : true,
      googleBot: {
        index: doc?.advanced?.robots?.index ? doc?.advanced?.robots?.index : true,
        follow: doc?.advanced?.robots?.follow ? doc?.advanced?.robots?.follow : true,
      }
    }
  }
}