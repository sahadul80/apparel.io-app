import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { WishlistProvider } from "./components/WishlistContext";

export const metadata: Metadata = {
  title: "Apparel.io",
  description: "Apparel.io Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <Header />
            {children}
          <Footer />
        </WishlistProvider>
      </body>
    </html>
  );
}
