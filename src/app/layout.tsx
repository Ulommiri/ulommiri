import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/interactive/cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/interactive/scroll-progress";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ulọmmiri — A House Held by Water",
  description:
    "A private lake house on the quiet edge of the water. Ulọmmiri is a sanctuary of stillness, light and slow luxury where the water remembers your name.",
  openGraph: {
    title: "Ulọmmiri — A House Held by Water",
    description:
      "A private lake house on the quiet edge of the water. A sanctuary of stillness, light and slow luxury.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} antialiased`}
    >
      <body className="bg-obsidian text-ivory">
        <Cursor />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
