import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import '../styles/globals.css';

const GA_ID = 'G-0DJBQVZL5C';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="tel:"]');
      if (a && typeof window.gtag === 'function') {
        window.gtag('event', 'phone_call_click', {
          event_category: 'engagement',
          event_label: (a as HTMLAnchorElement).href,
        });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
