import Link from 'next/link'

const About = () => {
  return (
    <>
        <section className="section section--2">
        <div className="paragraph paragraph--type--simple-section paragraph--view-mode--default pull-right">
            <div>
            <div className="heading-container">
                <h1>
                <div>Ethical & Sustainable<br /> Solutions in a Changed World</div>
                </h1>
            </div>

            <p>We believe in doing things right. As a trusted partner for many global brands and their teams, we consistently champion ethics and transparency in our daily practices.</p>
            <p>&nbsp;</p>
            <p>Our open innovation culture encourages our suppliers to use result-oriented production processes, while maintaining environmental and social sustainability.</p>

            <ul className="btn-group">
                <li><Link href="/our-promise" className="btn btn--large">Our Promise</Link></li>
            </ul>
            </div>
        </div>
        </section>
        <section className="section section--3">
        <div className="paragraph paragraph--type--simple-section paragraph--view-mode--default pull-left">
            <div>
            <div className="heading-container">
                <h1>
                <div>The Best is yet to Come</div>
                </h1>
            </div>

            <p>We continue to improve and evolve our sustainability roadmap, driving continuous development and innovation in everything we do.</p>
            <p>&nbsp;</p>
            <p>Our goal is to always tick as many boxes as possible, while advancing our work in responsible product development, ultimately converting to preferred fibres.</p>

            <ul className="btn-group">
                <li><Link href="/our-promise#looking-towards-2030" className="btn btn--large">Our 2030 Roadmap</Link></li>
            </ul>
            </div>
        </div>
        </section>
    </>
  )
}

export default About;