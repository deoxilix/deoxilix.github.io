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

export const metadata: Metadata = {
  title: "Rajarshi Sen's Resume",
  description: "The personal resume of Rajarshi Sen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jaapokki.variable} ${lato.variable} ${garamond.variable}`}>
      <body className="bg-zinc-50 font-lato">{children}</body>
    </html>
  );
}
