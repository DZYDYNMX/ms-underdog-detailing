import { Metadata } from 'next';
import App from '../../page';

export function generateStaticParams() {
  return [
    { city: 'bethesda' },
    { city: 'arlington' },
    { city: 'alexandria' },
    { city: 'washington-dc' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  
  // Format city name from "san-mateo" to "San Mateo"
  const formattedCity = city
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Mobile Car Detailing in ${formattedCity} | Ms. Underdog Detailing`,
    description: `Expert mobile car detailing serving ${formattedCity}. We bring our detailing shop to your driveway. Interior deep cleans, clay bar treatments, and ceramic coatings.`,
    openGraph: {
      title: `Mobile Car Detailing in ${formattedCity} | Ms. Underdog Detailing`,
      description: `Expert mobile car detailing serving ${formattedCity}. We bring our detailing shop to your driveway. Interior deep cleans, clay bar treatments, and ceramic coatings.`,
      url: `https://msunderdogdetailing.com/locations/${params.city}`,
    }
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  // For locations, we just render the main homepage, but Google sees the highly targeted metadata above.
  return <App />;
}
