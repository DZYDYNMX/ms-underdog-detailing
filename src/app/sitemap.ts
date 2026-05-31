import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://msunderdogdetailing.com';
  
  const services = ['full-detail', 'interior-detail', 'upholstery-clean', 'express-detail'].map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const locations = ['bethesda', 'arlington', 'alexandria', 'washington-dc'].map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...services,
    ...locations,
  ];
}
