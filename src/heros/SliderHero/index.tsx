'use client'
import React, { useRef } from 'react'
import type { Page } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperCore } from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SectionThemeProvider } from '@/components/SectionThemeProvider'

export const SliderHero: React.FC<NonNullable<Page['hero']['heroFieldsSlider']>> = ({ slide, timeCount, delay, autoplay}) => {
  const progressCircle = useRef<SVGSVGElement | null>(null)
  const progressContent = useRef<HTMLSpanElement | null>(null)
  const onAutoplayTimeLeft = (swiper: SwiperCore, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progressCircle', String(1 - progress))
    }
    const activeBullet = document.querySelector<HTMLSpanElement>(
      '.heroSlider .swiper-pagination-bullet.swiper-pagination-bullet-active',
    )
    if (activeBullet) {
      activeBullet.style.setProperty('--progressBar', `${1 - progress}`)
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }
  }
  const slideChangeDelay = typeof delay === 'number' && delay ? delay : 5
  return (
    <SectionThemeProvider>
      <section className="w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={autoplay ? {
            delay: (slideChangeDelay * 1000),
            disableOnInteraction: false,
          } : false}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          modules={[Autoplay, Pagination]}
          className="heroSlider text-foreground"
        >
          {slide?.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className={`relative w-full min-h-[700px] h-screen md:min-h-screen bg-accent py-20 flex flex-col justify-center ${slide.alignment === 'center' ? 'items-center' : slide.alignment === 'right' ? 'items-end' : 'items-start'}`}>
                <div className="absolute inset-0 w-full h-full">
                  <Media fill imgClassName="object-cover" priority resource={slide.media} />
                </div>
                <div className="container relative z-10">
                  <div className={`w-full flex flex-col ${slide.alignment === 'center' ? 'items-center' : slide.alignment === 'right' ? 'items-end' : 'items-start'}`}>
                    <div className="w-full lg:max-w-[50%] flex flex-col gap-5">
                      {slide.richText && (
                        <RichText
                          className={`w-full ${slide.alignment === 'center' ? 'text-center' : ''}`}
                          data={slide.richText}
                          enableGutter={false}
                        />
                      )}
                      {Array.isArray(slide.links) && slide.links.length > 0 && (
                        <ul className={`w-full flex flex-wrap gap-4 ${slide.alignment === 'center' ? 'justify-center' : 'justify-start'}`}>
                          {slide.links.map(({ link }, i) => {
                            return (
                              <li key={i}>
                                <CMSLink {...link} />
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {autoplay && timeCount && (
            <div className="autoplay-progress xs:hidden absolute right-4 bottom-4 z-10 w-12 h-12 flex justify-center items-center bg-background text-foreground font-bold rounded-[50%]">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          )}
        </Swiper>
      </section>
    </SectionThemeProvider>
  )
}
