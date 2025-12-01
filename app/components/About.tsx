import Link from 'next/link'

const About = () => {
  return (
    <div className="max-h-screen max-w-screen overflow-hidden flex flex-col gap-4 z-20">
        <div className="container flex justify-end">
            <div className="container--narrow backdrop-blur-glass rounded-xl p-space-2xl">
                <div className="text-content-comfortable">
                    <div className="heading-container mb-space-lg">
                        <h1 className="text-heading font-heading text-secondary">
                            <div>Ethical & Sustainable<br /> Solutions in a Changed World</div>
                        </h1>
                    </div>

                    <p className="text-body text-foreground">We believe in doing things right. As a trusted partner for many global brands and their teams, we consistently champion ethics and transparency in our daily practices.</p>
                    
                    <p className="text-body text-foreground">Our open innovation culture encourages our suppliers to use result-oriented production processes, while maintaining environmental and social sustainability.</p>

                    <ul className="btn-group mt-space-xl">
                        <li><Link href="/our-promise" className="btn btn--lg btn--primary">Our Promise</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container flex justify-start">
            <div className="container--narrow backdrop-blur-glass rounded-xl p-space-2xl">
              <div className="text-content-comfortable">
              <div className="heading-container mb-space-lg">
                  <h1 className="text-heading font-heading text-secondary">
                    <div>The Best is yet to Come</div>
                  </h1>
              </div>

              <p className="text-body text-foreground">We continue to improve and evolve our sustainability roadmap, driving continuous development and innovation in everything we do.</p>
              
              <p className="text-body text-foreground">Our goal is to always tick as many boxes as possible, while advancing our work in responsible product development, ultimately converting to preferred fibres.</p>

              <ul className="btn-group mt-space-xl">
                  <li><Link href="/our-promise#looking-towards-2030" className="btn btn--lg btn--outline border-forest-emerald text-forest-emerald hover:bg-forest-emerald hover:text-white">Our 2030 Roadmap</Link></li>
              </ul>
              </div>
            </div>
        </div>
    </div>
  )
}

export default About