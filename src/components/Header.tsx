import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SectionType } from './BottomNav';

import Link from 'next/link';

interface HeaderProps {
  activeSection?: SectionType;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const tabs = [
    { id: 'home' as SectionType, label: 'Home', href: '/' },
    { id: 'services' as SectionType, label: 'Services', href: '/services' },
    { id: 'reviews' as SectionType, label: 'Reviews', href: '/reviews' },
    { id: 'gallery' as SectionType, label: 'Gallery', href: '/gallery' },
    { id: 'contact' as SectionType, label: 'Book Detail', href: '/contact' },
  ];

  return (
    <header className="app-header">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
          Ms.Underdog
        </h1>
        <span style={{ fontSize: '9px', color: 'var(--accent-red)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Mobile Detailing
        </span>
      </div>

      {/* Desktop Horizontal Navigation Links */}
      <div className="desktop-nav-links">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`desktop-nav-link ${activeSection === tab.id ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.a
          href="https://web.facebook.com/ms.underdog/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)'
          }}
          whileTap={{ scale: 0.9 }}
          title="Facebook Page"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18" style={{ display: 'block' }}>
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
          </svg>
        </motion.a>

        <motion.a
          href="tel:2022469291"
          style={{
            background: 'var(--accent-red)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: 'var(--shadow-red)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone size={14} />
          <span>Call Us</span>
        </motion.a>
      </div>
    </header>
  );
};
