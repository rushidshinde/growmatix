import React, { Fragment, JSX } from 'react'
import { GlobalSetting } from '@/payload-types'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

export default function SocialMediaIcons({siteSetting}: { siteSetting : GlobalSetting }) {
  const socialLinks = [
    { name: 'Facebook', url: siteSetting?.social?.facebook, icon: <FaFacebookF className={'w-full h-full'} /> },
    { name: 'Instagram', url: siteSetting?.social?.instagram, icon: <FaInstagram className={'w-full h-full'} /> },
    { name: 'X', url: siteSetting?.social?.x, icon: <FaXTwitter className={'w-full h-full'} /> },
    { name: 'LinkedIn', url: siteSetting?.social?.linkedin, icon: <FaLinkedinIn className={'w-full h-full'} /> },
    { name: 'YouTube', url: siteSetting?.social?.youtube, icon: <FaYoutube className={'w-full h-full'} /> },
  ]
  return (
    <Fragment>
      <div className={'w-full flex flex-wrap items-center justify-center gap-3 '}>
        {
          socialLinks.map((link, id) => (
            <Fragment key={id}>
              {link.url &&
                <SocialIcon href={link.url} ariaLabel={link.name}>{link.icon}</SocialIcon>
              }
            </Fragment>
          ))
        }
      </div>
    </Fragment>
  )
}

function SocialIcon({ children, className, href='#', ariaLabel='' }: { children: React.ReactNode; className?: string; href?: string; ariaLabel?: string }): JSX.Element {
  return (
    <>
      <Link href={href} target={'_blank'} aria-label={ariaLabel} className={cn('w-6 h-6 md:w-5 md:h-5 xs:w-4 xs:h-4', className)}>
        {children}
      </Link>
    </>
  )
}