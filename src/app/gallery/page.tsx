import { Metadata } from 'next';
import { GallerySection } from '../../components/GallerySection';

export const metadata: Metadata = {
  title: 'Before & After Gallery | Ms. Underdog Detailing',
  description: 'View our mobile car detailing before and after transformations. From dirty interiors to showroom shine.',
};

export default function GalleryPage() {
  return <GallerySection />;
}
