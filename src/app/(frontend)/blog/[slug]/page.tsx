import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Page() {
  return (
    <div>
      <header className="w-full py-2" aria-describedby={'title'}>
        <div className="container">
          <div className="w-full flex items-center justify-between">
            <div className="brand">
              <Image
                src={'/vercel.svg'}
                alt={'Logo'}
                height={64}
                width={283}
                className={'object-contain max-w-80 max-h-16'}
                loading={'eager'}
                priority={true}
                aria-label={'Logo'}
              />
            </div>
            <nav className="w-full flex items-center justify-end gap-6">
              <div className="menu flex items-center justify-start gap-5">
                <Level1Link className={''} href={'/'}>Home</Level1Link>
                <Level1Link className={''} href={'/about-us'}>About us</Level1Link>
                <Level1Link className={''} href={'/service'}>Services</Level1Link>
                <Level1Link className={''} href={'/blog'}>Insights</Level1Link>
                <Level1Link className={''} href={'/contact-us'}>Contact us</Level1Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  )
}


const Level1Link = ({className, href='#', children}:{className:string, href:string, children: React.ReactNode}) => {
  return (
    <Link
      href={href}
      className={cn('py-2 font-medium', className)}
    >
      {children}
    </Link>
  )
}

type levl1DropdownProp = {
  children: React.ReactNode
}

const level1Dropdown = (props: levl1DropdownProp) => {
  return (
    <>

    </>
  )
}
