import React from 'react';
import { Home, Car, MessageSquare, Image, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

import Link from 'next/link';

export type SectionType = 'home' | 'services' | 'reviews' | 'gallery' | 'contact';

interface BottomNavProps {
  activeSection: SectionType;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeSection }) => {
  const tabs = [
    { id: 'home' as SectionType, label: 'Home', icon: Home, href: '/' },
    { id: 'services' as SectionType, label: 'Services', icon: Car, href: '/services' },
    { id: 'reviews' as SectionType, label: 'Reviews', icon: MessageSquare, href: '/reviews' },
    { id: 'gallery' as SectionType, label: 'Gallery', icon: Image, href: '/gallery' },
    { id: 'contact' as SectionType, label: 'Book', icon: Calendar, href: '/contact' },
  ];

  return (
    <nav className="app-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer',
              position: 'relative',
              padding: '8px 12px',
              borderRadius: '16px',
              flex: 1,
              outline: 'none',
              zIndex: 1,
              textDecoration: 'none',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBg"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'var(--accent-red-glow)',
                  border: '1px solid rgba(212, 43, 43, 0.2)',
                  borderRadius: '16px',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            
            <motion.div
              animate={{
                scale: isActive ? 1.15 : 1,
                color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)'
              }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon size={20} />
            </motion.div>

            <span
              style={{
                fontSize: '9px',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'var(--accent-red)' : 'var(--text-muted)',
                transition: 'color 0.2s ease',
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
