import type { Metadata } from 'next';
import '../index.css';
import '@fontsource/outfit/800.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Ms. Underdog Detailing',
  description: 'Premium mobile car detailing in the DMV area. We bring top-tier auto upholstery cleaning, interior deep cleans, clay bar treatments, and ceramic coatings right to your driveway.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ms. Underdog Detailing',
    image: 'https://msunderdogdetailing.com/hero.webp',
    description: 'Premium mobile car detailing in the DMV area. We bring top-tier auto upholstery cleaning, interior deep cleans, clay bar treatments, and ceramic coatings right to your driveway.',
    url: 'https://msunderdogdetailing.com',
    telephone: '+1-202-246-9291',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 38.8951,
        longitude: -77.0364
      },
      geoRadius: 40000
    },
    priceRange: '$$$'
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
