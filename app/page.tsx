"use client"
import { Hero } from './components/Hero';
import ProductCollection from './components/products';

export default function Home() {
  return (
    <>
      <Hero 
        title={'This Resource Is Currently Under Construction'} 
        content={'All the data are dummy; and for evaluation & Feedback purpuses.'} 
        buttonText={'Product Divisions'} 
        buttonLink={'/product-divisions'} 
        stats={[
          {number:"144",label:"Partner Factories"},
          {number:"4",label:"Regional Offices"},
          {number:"850",label:"Global Team Members"},
          {number:"16",label:"Global Recognitions"}
        ]}
      />
    </>
  )
}