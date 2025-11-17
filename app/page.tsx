import { Hero } from './components/Hero'
import { Content } from './components/Content'

export default function Home() {
  return (
    <>
    <Hero title={'Your Global, Local Partner for Sustainable Apparel'} content={'We offer sustainable apparel product development and specialised global sourcing strategies, combined with compliance excellence and intuitive customer service. We strive to always bring newness and innovation to our work, offering an extensive multi-category product range, manufactured in over 100 fully compliant partner factories.'} buttonText={'Products & Services'} buttonLink={''} stats={[{number:"140",label:"Partner Factories"},{number:"5",label:"Regional Offices"},{number:"800",label:"Global Team Members"},{number:"20",label:"Global Recognitions"}]}/>
    <Content alignment={'right'} title={'Sustainable Solutions in a Changed World'} content={'We believe in doing things right. As a trusted partner for many global brands and their teams, we consistently champion ethics and transparency in our daily practices.'} buttonText={'Our Promise'} buttonLink={''} hoverImage={"/sun.png"}/>
    <Content alignment={'left'} title={'The Best is yet to Come'} content={'We continue to improve and evolve our sustainability roadmap, driving continuous development and innovation in everything we do. Our goal is to always tick as many boxes as possible, while advancing our work in responsible product development, ultimately converting to preferred fibres.'} buttonText={'Our Promise'} buttonLink={''} hoverImage={"/globe-2.webp"}/>
    </>
  )
}