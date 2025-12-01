"use client"
import { Hero } from './components/Hero';
import ProductCollection from './components/products';

export default function Home() {
  return (
    <>
      <Hero 
        title={'Your Global, Local Partner for Sustainable Apparel'} 
        content={'We offer sustainable apparel product development and specialised global sourcing strategies, combined with compliance excellence and intuitive customer service. We strive to always bring newness and innovation to our work, offering an extensive multi-category product range, manufactured in over 100 fully compliant partner factories.'} 
        buttonText={'Products & Services'} 
        buttonLink={'/products-and-services'} 
        stats={[
          {number:"140",label:"Partner Factories"},
          {number:"5",label:"Regional Offices"},
          {number:"800",label:"Global Team Members"},
          {number:"20",label:"Global Recognitions"}
        ]}
      />
      <ProductCollection />
    </>
  )
}