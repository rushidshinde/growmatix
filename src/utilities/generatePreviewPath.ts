import { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  blog: '/blog',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  fullPath: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, fullPath }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    fullPath,
    path: `${collectionPrefixMap[collection]}${fullPath}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${encodedParams.toString()}`
}