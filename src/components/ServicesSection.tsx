import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

const services = [
  { id: 'full-detail', title: 'Full Detail', tagline: 'Interior + Exterior: Complete Reset', priceStart: '$260+', duration: '3–4 hrs', shortDesc: 'A full top-to-bottom mobile car detailing. Hand wash, clay bar treatment, ceramic spray wax, steam-cleaned interior, shampooed carpets, dressed tires and trim. Leaves it smelling and looking brand new.' },
  { id: 'interior-detail', title: 'Interior Detailing', tagline: 'Cabin Deep Clean', priceStart: '$160+', duration: '2–3 hrs', shortDesc: 'Deep clean of every interior surface including seats, carpets, dash, vents, door panels, cup holders, and headliner. Steam-sanitized, vacuumed, and finished with premium interior dressing.' },
  { id: 'upholstery-clean', title: 'Auto Upholstery', tagline: 'Fabric & Stain Removal', priceStart: 'Varies', duration: '1.5–2 hrs', shortDesc: 'Stubborn stains, pet odors, and kid mess are all gone. Hot water extraction, auto upholstery cleaning, and fabric protector spray to prevent future staining. Great for car seats and floor mats.' },
  { id: 'express-detail', title: 'Express Maintenance', tagline: 'Quick Refresh, Inside & Out', priceStart: '$99+', duration: '1–1.5 hrs', shortDesc: 'Hand wash, tire dressing, spray wax, windows, and a quick vacuum. Perfect for weekly or bi-weekly maintenance to keep your car consistently clean without the full car detailing commitment.' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div className="scroll-container" variants={containerVariants} initial="hidden" animate="visible">
      <div style={{ padding: '4px 0 8px 0' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>Our Detailing Services</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
          Tap any package to see full pricing, add-ons, and what's included.
        </p>
      </div>

      <div className="responsive-grid-2">
        {services.map((service) => (
          <motion.a
            key={service.id}
            href={`/services/${service.id}`}
            className="service-card"
            variants={cardVariants}
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', `/services/${service.id}`);
              onSelectService(service.id);
            }}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Title as headline, price top-right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '19px', color: 'var(--text-primary)', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>{service.title}</h3>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '14px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1px' }}>Starting at</div>
                <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent-red)' }}>{service.priceStart}</div>
              </div>
            </div>

            <p style={{ color: 'var(--accent-red)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              {service.tagline} · {service.duration}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: '1.55', marginBottom: '16px' }}>
              {service.shortDesc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--accent-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>View Full Pricing</span>
              <ChevronRight size={14} />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Orbital Wax Callout */}
      <motion.div
        variants={cardVariants}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-md)',
          padding: '20px',
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: 700 }}>Deluxe Orbital Wax: Machine Polish</h4>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.55', marginBottom: '14px' }}>
          Upgrade any package with machine-applied orbital wax for a deep, mirror-like finish. Removes light swirl marks and adds a protective gloss coat that lasts months.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[['Coupe / Sedan', '$125'], ['Midsize SUV / Truck', '$150'], ['Large SUV (3-Row) / Van', '$180+'], ['Extra Large / Heavy Duty', '$200+']].map(([label, price]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{label}</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '15px' }}>{price}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
