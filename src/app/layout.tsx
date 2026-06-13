import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JelasBeres.id - Software House Terbaik & Jasa Pembuatan Website Professional",
  description: "JelasBeres.id adalah Software House terbaik di Indonesia. Melayani jasa pembuatan website, aplikasi mobile iOS & Android, desain sistem arsitektur, IT infrastructure, dan solusi database handal dengan garansi beres.",
  keywords: [
    "software house indonesia",
    "software house terbaik",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi mobile",
    "jasa IT infrastructure",
    "jasa cloud computing",
    "software house jakarta",
    "jasa web developer",
    "jelas beres",
    "jelasberes"
  ],
  openGraph: {
    title: "JelasBeres.id - Software House Terbaik & Jasa Pembuatan Website",
    description: "JelasBeres.id menyediakan jasa pembuatan website, aplikasi mobile, arsitektur sistem, dan IT infrastructure terbaik dengan garansi hasil beres.",
    url: "https://jelasberes.my.id",
    siteName: "JelasBeres.id",
    images: [
      {
        url: "https://jelasberes.id/image/jelasberes-logo-black.webp",
        width: 1200,
        height: 630,
        alt: "JelasBeres.id Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
