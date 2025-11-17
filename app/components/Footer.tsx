"use client";

import Link from "next/link";

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

  return (
    <footer className="bg-footerBg text-footerText pt-20 pb-10">
      <div className="container mx-auto px-4">

        {/* Top accreditation logos as marquee */}
        <div className="overflow-hidden relative mb-16">
          <div className="flex animate-marquee gap-6">
            {logos.concat(logos).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-20 h-20 object-contain"
              />
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 — Mission + Newsletter */}
          <div className="space-y-6">
            <img src="/logo.png" alt="Logo" className="w-32 mb-4" />
            <p className="leading-relaxed max-w-xs">
              Our mission is to be the ultimate bespoke global sourcing partner
              delivering sustainable innovation, leading design collaboration,
              compliance & CSR excellence, and intuitive client service.
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Newsletter Subscription</h4>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-full border border-footerBorder bg-white text-base"
              />
              <p className="text-sm max-w-xs">
                By clicking Subscribe, I agree to the{" "}
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>{" "}
                &{" "}
                <Link href="/cookie-policy" className="underline">
                  Cookie Policy
                </Link>.
              </p>
              <button className="px-6 py-3 rounded-full bg-buttonBg text-buttonText font-medium shadow-sm hover:opacity-80 transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-10">
            <div>
              <h4 className="font-semibold mb-3">Products & Services</h4>
              <ul className="space-y-2">
                <li><Link href="#">Athleisure</Link></li>
                <li><Link href="#">Corporate</Link></li>
                <li><Link href="#">Sports</Link></li>
                <li><Link href="#">Lifestyle</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product Types</h4>
              <ul className="space-y-2">
                <li><Link href="#">Tees</Link></li>
                <li><Link href="#">Polos</Link></li>
                <li><Link href="#">Hoodies / Sweats</Link></li>
                <li><Link href="#">Shirts</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-10">
            <div>
              <h4 className="font-semibold mb-3">Company Info</h4>
              <ul className="space-y-2">
                <li><Link href="#">Our Group</Link></li>
                <li><Link href="#">Our Promise</Link></li>
                <li><Link href="#">Meet Our Team</Link></li>
                <li><Link href="#">History of ZXY</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Privacy & Cookies</h4>
              <ul className="space-y-2">
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Customer Enquiries</h4>
              <ul className="space-y-2">
                <li><Link href="#">Contact Us</Link></li>
                <li><Link href="#">Global Locations</Link></li>
                <li><Link href="#">Newsfeed</Link></li>
              </ul>
            </div>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="inline-block"
            >
              <svg
                className="w-6 h-6 text-footerText"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M416 32H31.9C14.3 32 ..."></path>
              </svg>
            </a>

            <address className="not-italic text-sm leading-relaxed">
              Apparel.io DMCC,<br />
              Suite No.2701, Platinum Tower,<br />
              Cluster “I”, Jumeirah Lake Towers,<br />
              P.O. Box 43720, Dubai
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-footerBorder text-center text-sm">
          © All rights reserved by Apparel.io
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </footer>
  );
}
