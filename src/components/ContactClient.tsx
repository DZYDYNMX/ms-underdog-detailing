"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ContactSection } from './ContactSection';

const ContactContent = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  
  let initialPackage: 'full' | 'interior' | 'express' | undefined = undefined;
  if (serviceId) {
    const pkgMap: Record<string, 'full' | 'interior' | 'express'> = {
      'full-detail': 'full',
      'interior-detail': 'interior',
      'upholstery-clean': 'interior',
      'express-detail': 'express'
    };
    initialPackage = pkgMap[serviceId] || 'full';
  }

  return <ContactSection initialPackage={initialPackage} />;
};

export const ContactClient = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
};
