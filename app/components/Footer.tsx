"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const logos = [
    "/sites/default/files/2021-11/9_1.png",
    "/sites/default/files/2023-05/8_2.png",
    "/sites/default/files/2022-12/Friend%20of%20ZDHC.png",
    "/sites/default/files/2023-03/OEKO-TEX-Standard-100.png",
    "/sites/default/files/2021-11/4_3.png",
    "/sites/default/files/2021-11/3_1.png",
    "/sites/default/files/2022-05/TE_New_0.png",
    "/sites/default/files/2021-11/1_1.png",
  ];

  const footerLinks = {
    company: [
      { href: "/our-group", label: "Our Group" },
      { href: "/our-promise", label: "Our Promise" },
      { href: "/newsfeed", label: "Newsfeed" },
      { href: "/about", label: "Our Team" },
    ],
    support: [
      { href: "/contact-us", label: "Contact Us" },
      { href: "/support", label: "Support Center" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/terms", label: "Terms of Service" },
    ]
  };

  return (
    <footer className="bg-footer-bg text-footer-text border-t border-footer-border">
      {/* Accreditation Logos Marquee */}
      <div className="border-b border-footer-border p-4">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden relative">
            <div className="flex animate-marquee-smooth gap-4">
              {logos.concat(logos).map((src, i) => (
                <div key={i} className="flex-shrink-0 rounded-md p-2 backdrop-blur-emerald border border-soft-sage/30 bg-white/5">
                  <Image
                    src={src}
                    alt="Accreditation logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Column 1 — Mission & Newsletter */}
          <div className="flex flex-col sm:w-1/3 gap-4">
          <p className="text-lg font-semibold text-footer-text">Stay Updated</p>
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 newsletter-input rounded-md p-2 text-footer-text placeholder:text-footer-text/70 focus-ring"
                />
                <button className="btn btn--primary btn--md whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-caption text-footer-text/80">
                By subscribing, you agree to our{" "}
                <Link href="/privacy-policy" className="text-muted-gold hover:text-gold-300 underline transition-colors">
                  Privacy Policy
                </Link>{" "}
                &{" "}
                <Link href="/cookie-policy" className="text-muted-gold hover:text-gold-300 underline transition-colors">
                  Cookie Policy
                </Link>.
              </p>
            </div>
            <div className="footer-card">
              <h4 className="text-lg font-semibold text-footer-text">Company</h4>
              <ul className="mx-auto">
                {footerLinks.company.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className="footer-link text-body text-footer-text/90 hover:text-white transition-all duration-200 block border-l-2 border-transparent hover:border-muted-gold hover:pl-3"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2 — Company Links */}
          <div className="footer-card flex flex-col sm:w-2/3">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-2/3">
                {/* Mission Statement */}
                <div className="footer-card">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                      <Link href="/" className="w-auto">
                        <Image 
                          src="/logo.svg" 
                          alt="Apparelio Logo" 
                          width={200} 
                          height={200} 
                          className="w-72 h-72 sm:w-36 sm:h-36 rounded-md transition-all duration-300 hover:scale-105" 
                        />
                      </Link>
                      {/* Contact Info */}
                      <div className="w-auto mx-auto">
                        <h4 className="text-lg font-semibold text-footer-text">Headquarters</h4>
                        <address className="text-md text-footer-text/90">
                          House#22, Road#113/A, Gulshan-2,<br />
                          Dhaka-1212, Bangladesh.
                        </address>
                      </div>
                    </div>
                    <p className="text-body text-footer-text/90 leading-relaxed">
                      Our mission is to be the ultimate bespoke global sourcing partner
                      delivering sustainable innovation, leading design collaboration,
                      compliance & CSR excellence, and intuitive client service.
                    </p>
                  </div>
                </div>
                <div className="p-2">
                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a
                      href="https://bd.linkedin.com/company/zxyinternational"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon btn btn--ghost p-2 rounded-md transition-all duration-300 hover-lift border border-soft-sage/30"
                      aria-label="Follow us on LinkedIn"
                    >
                      <svg className="w-5 h-5 text-muted-gold" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:info@apparelio.com"
                      className="social-icon btn btn--ghost p-2 rounded-md transition-all duration-300 hover-lift border border-soft-sage/30"
                      aria-label="Email us"
                    >
                      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* Support & Contact */}
              <div className="sm:w-1/3">
                {/* Support Links */}
                <div className="footer-card">
                  <h4 className="text-lg font-semibold text-footer-text">Support</h4>
                  <ul className="">
                    {footerLinks.support.map((item) => (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          className="footer-link text-body text-footer-text/90 hover:text-white transition-all duration-200 block py-2 border-l-2 border-transparent hover:border-muted-gold hover:pl-3"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-footer-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-caption text-footer-text/80">
              &copy; {new Date().getFullYear()} apparelio.io All rights reserved.
            </p>
            <p className="text-caption text-muted-gold font-semibold">
              Crafted with Excellence & Innovation
            </p>
            <div className="flex gap-4 text-caption text-footer-text/80">
              <Link href="/sitemap" className="hover:text-muted-gold transition-colors">
                Sitemap
              </Link>
              <Link href="/terms" className="hover:text-muted-gold transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}