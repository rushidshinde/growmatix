'use client'
import React, { Fragment } from 'react'
import { HeaderNav } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import NavMenuDropdown from '@/components/navMenuDropdown'
import { cn } from '@/lib/utils'
import type {CMSLinkType} from '@/components/Link'



export default function RenderedNav({nav} : {nav: HeaderNav['nav']}) {
  return (
    <Fragment>
      <nav className="flex items-center justify-start gap-x-3 md:flex-col md:items-stretch md:w-full">
        {
          nav?.level0Links && nav?.level0Links.map((l0Link, id)=>(
            <Fragment key={id}>
              {
                l0Link?.enableL1 ?
                  <Fragment>
                    <NavMenuDropdown triggerElement={<NavMenuTrigger link={l0Link?.link}/>} level={0}>
                      {
                        l0Link?.level1Links && l0Link.level1Links.map((l1Link, id)=>(
                          <Fragment key={id}>
                            {
                              l1Link?.enableL2 ?
                                <Fragment>
                                  <NavMenuDropdown triggerElement={<NavMenuTrigger link={l1Link?.link}/>} level={1}>
                                    {
                                      l1Link?.level2Links && l1Link.level2Links.map((l2Link, id)=>(
                                        <Fragment key={id}>
                                          {
                                            l2Link?.enableL3 ?
                                              <Fragment>
                                                <NavMenuDropdown triggerElement={<NavMenuTrigger link={l2Link?.link}/>} level={2}>
                                                  {
                                                    l2Link?.level3Links && l2Link.level3Links.map((l3Link, id)=>(
                                                      <Fragment key={id}>
                                                        {
                                                          l3Link?.enableL4 ?
                                                            <Fragment>
                                                              <NavMenuDropdown triggerElement={<NavMenuTrigger link={l3Link?.link}/>} level={3}>
                                                                {
                                                                  l3Link?.level4Links && l3Link.level4Links.map((l4Link, id)=>(
                                                                    <Fragment key={id}>
                                                                      <NavMenuLink link={l4Link?.link}/>
                                                                    </Fragment>
                                                                  ))
                                                                }
                                                              </NavMenuDropdown>
                                                            </Fragment>
                                                            :
                                                            <Fragment>
                                                              <NavMenuLink link={l3Link?.link}/>
                                                            </Fragment>
                                                        }
                                                      </Fragment>
                                                    ))
                                                  }
                                                </NavMenuDropdown>
                                              </Fragment>
                                              :
                                              <Fragment>
                                                <NavMenuLink link={l2Link?.link}/>
                                              </Fragment>
                                          }
                                        </Fragment>
                                      ))
                                    }
                                  </NavMenuDropdown>
                                </Fragment>
                                :
                                <Fragment>
                                  <NavMenuLink link={l1Link?.link}/>
                                </Fragment>
                            }
                          </Fragment>
                        ))
                      }
                    </NavMenuDropdown>
                  </Fragment>
                :
                  <Fragment>
                    <NavMenuLink link={l0Link?.link}/>
                  </Fragment>
              }
            </Fragment>
          ))
        }
      </nav>
    </Fragment>
  )
}


function NavMenuLink({ className, link }: { className?: string; link: CMSLinkType }) {
  return (
    <div className={cn(className, 'flex items-center justify-between group gap-3 px-2 py-2 text-primary-foreground md:text-background hover:text-primary focus-visible:text-primary md:px-0')}>
      <CMSLink className={'text-inherit md:text-inherit hover:text-inherit focus-visible:text-inherit outline-none'} {...link}/>
    </div>
  )
}
function NavMenuTrigger({ className, link }: { className?: string; link: CMSLinkType }) {
  return (
    <Fragment>
      <CMSLink className={cn(className, 'text-inherit md:text-inherit hover:text-inherit focus-visible:text-inherit outline-none')}  {...link}/>
    </Fragment>
  )
}