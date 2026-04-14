import type { Metadata } from "next";
import { Lato, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-garamond",
});

const jaapokki = localFont({
  src: [
    {
      path: "../../public/fonts/307784ff.jaapokki-regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-jaapokki",
});

const siteUrl = "https://deoxilix.github.io";

export const metadata: Metadata = {
  title: "Rajarshi Sen — Software Engineer & ML Graduate Student",
  description:
    "Resume of Rajarshi Sen — backend engineer with several years of production experience building scalable systems, now expanding into ML/AI. MS Computer Science at Iowa State University.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title: "Rajarshi Sen — Software Engineer & ML Graduate Student",
    description:
      "Backend engineer with production experience in scalable systems, expanding into ML/AI. MS Computer Science at Iowa State University.",
    images: [
      {
        url: "/photo-chitown.jpeg",
        width: 800,
        height: 800,
        alt: "Rajarshi Sen",
      },
    ],
    firstName: "Rajarshi",
    lastName: "Sen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajarshi Sen — Software Engineer & ML Graduate Student",
    description:
      "Backend engineer with production experience in scalable systems, expanding into ML/AI. MS Computer Science at Iowa State University.",
    images: ["/photo-chitown.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Rajarshi Sen",
    "url": "https://deoxilix.github.io",
    "image": "https://deoxilix.github.io/photo-chitown.jpeg",
    "jobTitle": "Software Engineer",
    "description":
      "Backend engineer with several years of production experience building scalable systems, expanding into ML/AI. MS Computer Science at Iowa State University.",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Iowa State University",
      },
    ],
    "sameAs": [
      "https://github.com/deoxilix",
      "https://linkedin.com/in/rajarshisendeoxilix",
      "https://www.instagram.com/deoxilix",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jaapokki.variable} ${lato.variable} ${garamond.variable}`} suppressHydrationWarning>
      <body className="bg-zinc-50 dark:bg-zinc-900 font-lato transition-colors duration-300" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
