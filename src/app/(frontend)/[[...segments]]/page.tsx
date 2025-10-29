import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import configPromise from '@payload-config'
import type { Page } from "@/payload-types"
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import JsonLd from '@/utilities/jsonLd'
import HeaderNavServerComponent from '@/navigation/header/headerNavServerComponent'

interface PageProps {
  params: Promise<{
    segments?: string[]
  }>
}

export async function generateStaticParams(){
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      fullPath: true,
    },
  })
  return pages.docs
    ?.map(({ fullPath }) => {
      const segments = fullPath === "/"
        ? []
        : fullPath.replace(/^\/|\/$/g, "").split("/")
      return { segments }
    })
}

export default async function Page({ params }: PageProps) {
  const { isEnabled: draft } = await draftMode()
  const segments = (await params).segments || []
  const fullPath = segments.length > 0 ? `/${segments.join("/")}` : "/"

  const page:RequiredDataFromCollectionSlug<'pages'> | null = await queryPageByFullPath({path:fullPath})

  if (!page) {
    return <PayloadRedirects url={fullPath} />
  }

  const { hero, layout } = page
  const schemas = page?.advanced?.schemas ?? []
  const disableHeader = page?.advanced?.navigation?.disableHeader ?? false

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} schema={schema.schema} name={schema.name} />
      ))}
      <div className="relative">
        {!disableHeader && <HeaderNavServerComponent />}
        <main className="">
          {/* Allows redirects for valid pages too */}
          <PayloadRedirects disableNotFound url={fullPath} />

          {draft && <LivePreviewListener />}

          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
        </main>
      </div>
    </>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const segments = (await params).segments || []
  const fullPath = segments.length > 0 ? `/${segments.join("/")}` : "/"
  const page = await queryPageByFullPath({ path: fullPath })
  return generateMeta({ doc: page })
}

const queryPageByFullPath = cache(async ({ path }: { path: string }): Promise<Page | null> => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      fullPath: {
        equals: path,
      },
    },
  })
  return result.docs?.[0] || null
})