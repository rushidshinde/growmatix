'use client'
import React, { Fragment, useEffect, useState } from 'react'
import NextImage, { StaticImageData } from 'next/image'
import { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export interface Logo {
  src: StaticImageData | string
  alt?: string | null
  width?: number | null
  height?: number | null
  mimeType?: string | null,

}

export default function RenderedBrandLogo({brandLogo} : {brandLogo: Media}) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const logo: Logo = {
    src: '',
    alt: '',
    width: undefined,
    height: undefined,
    mimeType: undefined,
  }
  if (!logo.src && brandLogo && typeof brandLogo === 'object') {
    const { url, updatedAt, alt, width, height, mimeType } = brandLogo
    logo.src = getMediaUrl(url, updatedAt)
    logo.alt = alt
    logo.width = width
    logo.height = height
    logo.mimeType = mimeType
  }
  useEffect(() => {
    if (logo.src && typeof logo.src === 'string' && logo.mimeType === 'image/svg+xml') {
      fetch(logo.src)
        .then(res => res.text())
        .then(setSvgContent)
        .catch(() => setSvgContent(null));
    }
  }, [logo.src, logo.mimeType]);

  return (
    <Fragment>
      {
        logo.src && logo.mimeType === 'image/svg+xml' ? (
          <Fragment>
            {/*// use this code to show SVG code when image is of type SVG*/}
            {/*{*/}
            {/*  svgContent ? (*/}
            {/*    <Fragment>*/}
            {/*      <span dangerouslySetInnerHTML={{ __html: svgContent }}/>*/}
            {/*    </Fragment>*/}
            {/*  ) : (*/}
            {/*    <Fragment>*/}
            {/*      <NextImage*/}
            {/*        src={logo.src}*/}
            {/*        alt={logo.alt ? logo.alt : ''}*/}
            {/*        className='w-full h-full max-w-60 max-h-16 object-contain'*/}
            {/*        width={logo.width ? logo.width : undefined}*/}
            {/*        height={logo.height ? logo.height : undefined}*/}
            {/*        quality={100}*/}
            {/*        priority={true}*/}
            {/*        loading={'eager'}*/}
            {/*        aria-label={'brand logo'}*/}
            {/*        unoptimized={logo.mimeType === 'image/svg+xml'}*/}
            {/*      />*/}
            {/*    </Fragment>*/}
            {/*  )*/}
            {/*}*/}
            <NextImage
              src={logo.src}
              alt={logo.alt ? logo.alt : ''}
              className='w-full h-full max-w-60 max-h-16 object-contain'
              width={logo.width ? logo.width : undefined}
              height={logo.height ? logo.height : undefined}
              quality={100}
              priority={true}
              loading={'eager'}
              aria-label={'brand logo'}
              unoptimized={logo.mimeType === 'image/svg+xml'}
            />
          </Fragment>
        ) : (
          <Fragment>
            <NextImage
              src={logo.src}
              alt={logo.alt ? logo.alt : ''}
              className='w-full h-full max-w-60 max-h-16 object-contain'
              width={logo.width ? logo.width : undefined}
              height={logo.height ? logo.height : undefined}
              quality={100}
              priority={true}
              loading={'eager'}
              aria-label={'brand logo'}
              unoptimized={logo.mimeType === 'image/svg+xml'}
            />
          </Fragment>
        )
      }
    </Fragment>
  )
}
