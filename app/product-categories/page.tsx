'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCarousel from '../components/SwiperCarousel'

const CategoryPage = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const productSlides = [
    {
      id: 1,
      image: '/images/categories/jacket-coats.png',
      name: 'Jackets / Coats',
      link: '/products?product_division%5B154%5D=154'
    },
    {
      id: 2,
      image: '/images/categories/knit-bottoms.png',
      name: 'Knit Bottoms',
      link: '/products?product_division%5B155%5D=155'
    },
    {
      id: 3,
      image: '/images/categories/knit-tops.png',
      name: 'Knit Tops',
      link: '/products?product_division%5B157%5D=157'
    },
    {
      id: 4,
      image: '/images/categories/knitwear-flat-knit.png',
      name: 'Knitwear (Flat Knit)',
      link: '/products?product_division%5B158%5D=158'
    },
    {
      id: 5,
      image: '/images/categories/swimwear.png',
      name: 'Swimwear',
      link: '/products?product_division%5B160%5D=160'
    },
    {
      id: 6,
      image: '/images/categories/woven-bottoms.png',
      name: 'Woven Bottoms',
      link: '/products?product_division%5B161%5D=161'
    },
    {
      id: 7,
      image: '/images/categories/woven-tops.png',
      name: 'Woven Tops',
      link: '/products?product_division%5B162%5D=162'
    }
  ]

  const productTypes = [
    { name: 'Dresses', link: '/products?product_type%5B74%5D=74' },
    { name: 'Hoodies / Sweats', link: '/products?product_type%5B78%5D=78' },
    { name: 'Jackets', link: '/products?product_type%5B79%5D=79' },
    { name: 'Polos', link: '/products?product_type%5B88%5D=88' },
    { name: 'Shirts', link: '/products?product_type%5B93%5D=93' },
    { name: 'Shorts', link: '/products?product_type%5B95%5D=95' },
    { name: 'Tees', link: '/products?product_type%5B101%5D=101' },
    { name: 'Tops', link: '/products?product_type%5B102%5D=102' }
  ]

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-soft-sage/20 via-background to-muted-gold/10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-emerald"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-soft-sage/20 via-background to-muted-gold/10">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cloud Images */}
        <div className="cloud-01 absolute top-10 left-5 md:top-20 md:left-10 z-5 opacity-40 md:opacity-60 animate-float-slow">
          <Image 
            src="/cloud_01.png" 
            alt="Fluffy cloud" 
            width={150}
            height={75}
            className="w-24 md:w-32 lg:w-48 h-auto"
            priority
          />
        </div>

        <div className="cloud-02 absolute top-20 right-5 md:top-40 md:right-10 z-5 opacity-40 md:opacity-60 animate-float">
          <Image 
            src="/cloud_02.png" 
            alt="Fluffy cloud" 
            width={150}
            height={75}
            className="w-24 md:w-32 lg:w-48 h-auto"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          {/* Title */}
          <div className="title-container text-center mb-8 md:mb-12">
            <h1 className="text-heading font-bold font-heading mb-4">
              Category
            </h1>
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-forest-emerald to-muted-gold mx-auto rounded-full"></div>
          </div>

          {/* Product Slider */}
          <section className="mb-12 md:mb-16">
            <SwiperCarousel slides={productSlides} className="h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]" />
          </section>

          {/* Product Type Links */}
          <div className="product-type-links mb-12 md:mb-16">
            <div className="item-list">
              <ul className="flex flex-wrap justify-center gap-3 md:gap-6 px-4">
                {productTypes.map((type, index) => (
                  <li key={index} className="group">
                    <Link
                      href={type.link}
                      className="text-sm md:text-lg text-charcoal hover:text-forest-emerald transition-all duration-300 font-semibold group-hover:translate-y-1 inline-block relative px-3 py-2 rounded-lg hover:bg-soft-sage/20"
                    >
                      {type.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-forest-emerald group-hover:w-full transition-all duration-300 rounded-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="nav-links flex justify-center items-center gap-4 md:gap-6">
            <span className="text-charcoal/40 text-lg md:text-xl">—</span>
            <Link 
              href="/product-categories" 
              className="text-forest-emerald font-bold hover:text-heritage-green text-lg md:text-xl lg:text-2xl transition-all duration-300 hover-lift px-4 md:px-6 py-2 md:py-3 rounded-lg bg-soft-sage/20 hover:bg-soft-sage/30 border border-soft-sage/30 hover:border-forest-emerald/30"
            >
              Product Categories
            </Link>
            <span className="text-charcoal/40 text-lg md:text-xl">—</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage;