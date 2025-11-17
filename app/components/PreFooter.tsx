const PreFooter = () => {
  const accreditations = [
    { src: '/accreditations/9_1.png', alt: 'Higg Index', width: 500, height: 500 },
    { src: '/accreditations/8_2.png', alt: 'EcoVadis 2023 (Silver)', width: 500, height: 500 },
    { src: '/accreditations/Friend-of-ZDHC.png', alt: 'Friend of ZDHC', width: 400, height: 400 },
    { src: '/accreditations/OEKO-TEX-Standard-100.png', alt: 'OEKO TEX Standard 100', width: 500, height: 500 },
    { src: '/accreditations/4_3.png', alt: 'Global Recycled Standard', width: 500, height: 500 },
    { src: '/accreditations/3_1.png', alt: 'GOTS (Global Textile Standard)', width: 500, height: 500 },
    { src: '/accreditations/TE_New_0.png', alt: 'Textile Exchange (Creating Material Change)', width: 500, height: 500 },
    { src: '/accreditations/1_1.png', alt: 'ISO (Certified Company) - 9001:2015', width: 500, height: 500 },
  ]

  return (
    <div className="pre-footer">
      <div>
        <div className="views-element-container" id="block-views-block-our-accreditation-block-1">
          <div>
            <div className="item-list" style={{ '--num': 8 } as React.CSSProperties}>
              <ul>
                {accreditations.map((accreditation, index) => (
                  <li key={index}>
                    <img 
                      loading="lazy" 
                      src={accreditation.src} 
                      width={accreditation.width} 
                      height={accreditation.height} 
                      alt={accreditation.alt}
                    />
                  </li>
                ))}
              </ul>

              <ul className="js-scrolling-list">
                {accreditations.map((accreditation, index) => (
                  <li key={index}>
                    <img 
                      loading="lazy" 
                      src={accreditation.src} 
                      width={accreditation.width} 
                      height={accreditation.height} 
                      alt={accreditation.alt}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreFooter;