"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const photos = [
    { id: 1, title: 'Hand Polish & Exterior Wax', desc: 'Deep shine, mirror-like paint finish.', image: '/gallery1.webp' },
    { id: 2, title: 'Deep Carpet & Seat Steaming', desc: 'Pet hair, stains, and odors are all extracted.', image: '/gallery2.webp' },
    { id: 3, title: 'Dashboard & Interior Vents', desc: 'Every crevice cleaned and UV-dressed.', image: '/gallery3.webp' },
    { id: 4, title: 'Wheel & Caliper Decontamination', desc: 'Iron remover, rinse, and gloss tire dressing.', image: '/gallery4.webp' },
    { id: 5, title: 'Headlight Restoration', desc: 'Yellowed lenses sanded and polished to clarity.', image: '/gallery5.webp' },
    { id: 6, title: 'Orbital Machine Wax', desc: 'Machine-applied wax for long-lasting gloss protection.', image: '/gallery6.webp' }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(prev => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(prev => (prev !== null ? (prev + 1) % photos.length : null));
  };

  // Real photo card rendered instead of placeholder
  const PhotoCard = ({ title, desc, image, onClick }: { title: string; desc: string; image: string; onClick: () => void }) => (
    <div
      className="gallery-card"
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
      {/* Gradient overlay for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      {/* Bottom label overlay */}
      <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px', zIndex: 3 }}>
        <span style={{
          background: 'var(--accent-red)',
          color: '#fff',
          fontSize: '8px',
          fontWeight: 800,
          padding: '2px 7px',
          borderRadius: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'inline-block',
          marginBottom: '5px'
        }}>Completed Job</span>
        <h4 style={{ fontSize: '13px', color: '#fff', margin: 0, fontWeight: 700 }}>{title}</h4>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', marginTop: '2px', lineHeight: 1.4 }}>{desc}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      className="scroll-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} style={{ padding: '4px 0 8px 0' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Our Work</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
          Real photos from Ronnie's jobs coming soon. Tap any card to expand.
        </p>
      </motion.div>

      {/* Responsive gallery grid */}
      <motion.div variants={itemVariants} className="gallery-track">
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            title={photo.title}
            desc={photo.desc}
            image={photo.image}
            onClick={() => setSelectedPhotoIndex(index)}
          />
        ))}
      </motion.div>

      {/* Swipe hint — only visible on mobile */}
      <motion.p
        variants={itemVariants}
        style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'center' }}
        className="mobile-only-hint"
      >
        ← Swipe or tap to expand →
      </motion.p>

      {/* Mission statement */}
      <motion.div variants={itemVariants} className="service-card" style={{ background: 'var(--bg-card)' }}>
        <div style={{ marginBottom: '10px' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>Our Promise</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.65', margin: 0 }}>
          When we're done with your vehicle, it won't just be clean; it'll feel and smell like you drove it off the dealership floor. That's not just our goal, that's our standard.
        </p>
      </motion.div>

      {/* Full-screen Carousel Modal overlay */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '24px'
            }}
          >
            {/* Top Bar with X and Photo Count */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 24px',
              zIndex: 410,
              color: '#fff'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#aaa' }}>
                {selectedPhotoIndex + 1} / {photos.length}
              </span>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Left Chevron Button */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#fff',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 410,
                outline: 'none',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Interactive Slide Display */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPhotoIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '800px',
                    maxHeight: '60vh',
                    borderRadius: '8px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                    background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px'
                  }}
                >
                  <img 
                    src={photos[selectedPhotoIndex].image} 
                    alt={photos[selectedPhotoIndex].title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} 
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#fff',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 410,
                outline: 'none',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ChevronRight size={24} />
            </button>

            {/* Bottom Caption Overlay */}
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '30px',
                background: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: '16px',
                padding: '16px 20px',
                width: 'calc(100% - 48px)',
                maxWidth: '540px',
                textAlign: 'center',
                zIndex: 410,
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                color: 'var(--text-primary)'
              }}
            >
              <span style={{
                background: 'var(--accent-red)',
                color: '#fff',
                fontSize: '8px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'inline-block',
                marginBottom: '8px'
              }}>Completed Job</span>
              <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>
                {photos[selectedPhotoIndex].title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', lineHeight: 1.4 }}>
                {photos[selectedPhotoIndex].desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) { .mobile-only-hint { display: none; } }
      `}} />
    </motion.div>
  );
};
