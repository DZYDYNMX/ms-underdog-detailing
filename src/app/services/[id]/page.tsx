import { Metadata } from 'next';
import { ServicesClient } from '../../../components/ServicesClient';

export function generateStaticParams() {
  return [
    { id: 'full-detail' },
    { id: 'interior-detail' },
    { id: 'upholstery-clean' },
    { id: 'express-detail' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  
  const serviceNames: Record<string, string> = {
    'full-detail': 'Full Car Detailing',
    'interior-detail': 'Interior Deep Cleaning',
    'upholstery-clean': 'Auto Upholstery & Stain Removal',
    'express-detail': 'Express Maintenance Detailing',
  };

  const title = serviceNames[id] || 'Mobile Car Detailing Services';
  
  return {
    title: `${title} | Ms. Underdog Detailing`,
    description: `Professional, on-site ${title.toLowerCase()} right in your driveway. Premium mobile car detailing in the DMV area.`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Renders the services grid and immediately opens the correct bottom sheet
  return <ServicesClient initialServiceId={id} />;
}
