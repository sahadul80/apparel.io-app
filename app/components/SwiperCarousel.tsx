'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Slide } from '../types/productDisplay'

interface SwiperCarouselProps {
  slides: Slide[]
  className?: string
}

const SwiperCarousel = ({ slides, className = '' }: SwiperCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const nextArrowRef = useRef<HTMLDivElement>(null)
  const prevArrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize navigation after component mounts
    if (swiperRef.current && nextArrowRef.current && prevArrowRef.current) {
      swiperRef.current.navigation.init()
      swiperRef.current.navigation.update()
    }
  }, [])

  const NextArrow = () => (
    <div 
      ref={nextArrowRef}
      className="swiper-button-next swiper-next-arrow group absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10"
      tabIndex={0} 
      role="button" 
      aria-label="Next slide"
    >
      <div className="icon-container bg-forest-emerald/80 hover:bg-forest-emerald border border-forest-emerald/50 rounded-full p-2 md:p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-emerald backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 md:w-6 md:h-6 group-hover:text-soft-sage transition-colors">
          <path fill="currentColor" d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
        </svg>
      </div>
    </div>
  )

  const PrevArrow = () => (
    <div 
      ref={prevArrowRef}
      className="swiper-button-prev swiper-prev-arrow group absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10"
      tabIndex={0} 
      role="button" 
      aria-label="Previous slide"
    >
      <div className="icon-container bg-forest-emerald/80 hover:bg-forest-emerald border border-forest-emerald/50 rounded-full p-2 md:p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-emerald backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 md:w-6 md:h-6 group-hover:text-soft-sage transition-colors">
          <path fill="currentColor" d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z" />
        </svg>
      </div>
    </div>
  )

  return (
    <div className={`relative w-full ${className}`}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        navigation={{
          nextEl: '.swiper-next-arrow',
          prevEl: '.swiper-prev-arrow',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet bg-soft-sage/60 hover:bg-forest-emerald transition-all duration-300',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-forest-emerald',
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            coverflowEffect: {
              depth: 50,
              modifier: 1,
            }
          },
          640: {
            slidesPerView: 'auto',
            spaceBetween: 20,
            coverflowEffect: {
              depth: 80,
              modifier: 2,
            }
          },
          1024: {
            slidesPerView: 'auto',
            spaceBetween: 30,
            coverflowEffect: {
              depth: 100,
              modifier: 2.5,
            }
          },
        }}
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide 
            key={slide.id} 
            className="!w-[280px] !h-[400px] sm:!w-[320px] sm:!h-[450px] md:!w-[380px] md:!h-[500px] lg:!w-[420px] lg:!h-[550px] transition-all duration-500 ease-in-out"
          >
            <div className="relative group w-full h-full">
              <div className="views-field views-field-field-image w-full h-full">
                <div className="field-content relative overflow-hidden rounded-2xl shadow-emerald border-2 border-soft-sage/30 group-hover:border-forest-emerald/50 transition-all duration-500 w-full h-full backdrop-blur-glass">
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-center">
                      <Link 
                        href={slide.link}
                        className="text-xl sm::text-2xl lg:text-3xl font-bold hover:text-soft-sage transition-all duration-300 inline-block font-heading bg-forest-emerald/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-forest-emerald hover:scale-105"
                      >
                        {slide.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <NextArrow />
        <PrevArrow />
      </Swiper>

      {/* Pagination */}
      <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal flex justify-center mt-6 md:mt-8 space-x-2" />
    </div>
  )
}

export default SwiperCarousel