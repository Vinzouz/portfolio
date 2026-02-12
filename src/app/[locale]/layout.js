import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import "../globals.css";
import { Montserrat } from "next/font/google"
import { GridPatternLinearGradient } from '@/components/GridPatternBackground';
import { ContactForm } from '@/components/contactForm';
import { Toaster } from 'react-hot-toast';
import CookieBanner from '@/components/CookieBanner';
import { metadataByLocale } from '@/lib/metadata';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
})

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vincentandre.pro';
  const localeBase = `${siteUrl}/${locale}`;
  const homeMeta = metadataByLocale[locale]?.home || metadataByLocale['en'].home;

  return (
    <html lang={locale} className='scroll-smooth overflow-x-hidden'>
      <head>
        <meta name="keywords" content="développeur full-stack, portfolio Vincent André, Node.js, React, développement web, JavaScript, frontend, backend" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Vincent André" />
        <meta name="publisher" content="Vincent André" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Canonical and hreflang for SEO */}
        <link rel="canonical" href={localeBase} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr/`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/`} />

        {/* JSON-LD Person / Website structured data (minimal) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Vincent André",
              "url": siteUrl,
              "jobTitle": "Full-Stack Developer",
              "description": homeMeta?.description || "Full-Stack developer",
              "sameAs": [
                "https://www.linkedin.com/in/vincent-andr%C3%A9-7021b7244/"
              ]
            })
          }}
        />
      </head>
      <body className={`${montserrat.variable}`}>
        <div className="w-full">
          <GridPatternLinearGradient />
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="absolute inset-0 sm:ml-36 mt-44 max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg" style={{ background: "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)" }} bis_skin_checked="1"></div>
              <div className="w-full mx-auto">
                <Navigation />
                {children}
              </div>
              <CookieBanner />
              <Toaster />
              <ContactForm />
            </ThemeProvider>
          </NextIntlClientProvider>

        </div>
      </body>
    </html >
  );
}
