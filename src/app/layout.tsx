import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JelasBeres.id - Professional IT Services",
  description: "Kode yang Jelas. Hasil yang Beres. We build. It works. Period.",
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
