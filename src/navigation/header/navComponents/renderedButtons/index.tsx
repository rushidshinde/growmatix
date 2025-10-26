import React, { Fragment } from 'react'
import { HeaderNav } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export default function RenderedButtons({buttons} : {buttons: HeaderNav['buttons']}) {
  return (
    <Fragment>
      <div className="flex items-center justify-start gap-x-3">
        {
          buttons?.buttons && buttons?.buttons.map((button, id)=>(
            <Fragment key={id}>
              <CMSLink className={'outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-0 fs-body'} {...button?.link}/>
            </Fragment>
          ))
        }
      </div>
    </Fragment>
  )
}
