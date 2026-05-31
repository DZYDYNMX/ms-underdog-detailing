import { Metadata } from 'next';
import { ReviewsSection } from '../../components/ReviewsSection';

export const metadata: Metadata = {
  title: 'Customer Reviews | Ms. Underdog Detailing',
  description: 'Read reviews from our satisfied mobile car detailing customers in the DMV area.',
};

export default function ReviewsPage() {
  return <ReviewsSection />;
}
