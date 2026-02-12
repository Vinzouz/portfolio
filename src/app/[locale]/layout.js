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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
})

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className='scroll-smooth overflow-x-hidden'>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
