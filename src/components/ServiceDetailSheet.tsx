import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Timer, Calendar, ShieldAlert } from 'lucide-react';

interface ServiceDetailSheetProps {
  serviceId: string | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export const ServiceDetailSheet: React.FC<ServiceDetailSheetProps> = ({ serviceId, onClose, onBook }) => {
  if (!serviceId) return null;

  const detailsMap: Record<string, {
    title: string;
    duration: string;
    prices: { category: string; price: string }[];
    description: string;
    includesExterior?: string[];
    includesInterior?: string[];
    warnings?: string[];
    addOns?: { name: string; price: string }[];
  }> = {
    'full-detail': {
      title: 'Full Detail Package',
      duration: '3–4 Hours',
      description: 'The complete reset. We touch every surface twice: steam-cleaned interior, hand-washed exterior, wax protection, and a fresh-car smell to match.',
      prices: [
        { category: 'Coupe / Sedan', price: '$260+' },
        { category: 'Midsize SUV / Truck', price: '$280+' },
        { category: 'Large SUV (3-Row) / Van', price: '$300+' },
        { category: 'Extra Large / Heavy Duty', price: '$340+' }
      ],
      includesExterior: [
        'Bug & tar remover treatment',
        'Premium hand wash & microfiber dry',
        'Windows cleaned inside & out',
        'Tires & wheels deep cleaned & dressed',
        'Premium spray wax protection'
      ],
      includesInterior: [
        'Dash, vents, cup holders & crevices detailed',
        'Door jambs thoroughly cleaned',
        'Full interior & trunk vacuumed',
        'Carpets & seats shampooed & steam cleaned',
        'Headliner steam cleaned',
        'Rubber mats removed, scrubbed & dressed',
        'Leather/plastic dressing & conditioning',
        'Odor neutralizer & carpet shield applied'
      ],
      addOns: [
        { name: 'Headlight Restoration', price: '$95' },
        { name: 'Paint Sealant Protection', price: '$50' },
        { name: 'Kid Car Seat Sanitize & Deodorize', price: '$25' },
        { name: 'Rain-X Glass Treatment', price: '$20' },
        { name: 'Pet Hair / Soiled Vehicle Fee', price: '$50+' }
      ],
      warnings: [
        'Pet hair and heavily soiled vehicles may incur additional fees.',
        'Please remove all personal belongings before our arrival.'
      ]
    },
    'interior-detail': {
      title: 'Interior Detail',
      duration: '2–3 Hours',
      description: 'Focused entirely on your cabin. Deep sanitization, stain extraction, and full restoration of all fabric, leather, and plastic surfaces.',
      prices: [
        { category: 'Coupe / Sedan', price: '$160+' },
        { category: 'Midsize SUV / Truck', price: '$180+' },
        { category: 'Large SUV (3-Row) / Van', price: '$190+' },
        { category: 'Extra Large / Heavy Duty', price: '$220+' }
      ],
      includesInterior: [
        'Dash, console, vents & glovebox detailed',
        'Door panels & jambs cleaned & conditioned',
        'Carpets, floor mats & seats steamed & shampooed',
        'Headliner carefully cleaned',
        'Leather conditioned with premium dressing',
        'Rubber mats washed & treated'
      ],
      addOns: [
        { name: 'Headlight Restoration', price: '$95' },
        { name: 'Kid Car Seat Sanitize & Deodorize', price: '$25' },
        { name: 'Pet Hair Removal', price: '$25–$50+' },
        { name: 'Ozone Treatment (Odor Removal)', price: '$50' }
      ],
      warnings: [
        'Pet hair and heavily soiled vehicles may incur additional fees.',
        'Please remove car seats and personal belongings.'
      ]
    },
    'upholstery-clean': {
      title: 'Auto Upholstery Cleaning',
      duration: '1.5–2 Hours',
      description: 'Specialized fabric treatment targeting deep stains, bacteria, and embedded grime. Active steam injection and hot water extraction.',
      prices: [
        { category: 'Full Seat Steam & Shampoo', price: 'Inquire' },
        { category: 'Carpet Extraction', price: 'Inquire' },
        { category: 'Headliner Spot Clean', price: 'Inquire' }
      ],
      includesInterior: [
        'High-pressure steam cleaning of seats & carpets',
        'Hot water shampoo extraction',
        'Headliner vacuuming & spot extraction',
        'Rubber floor mats pressure washed',
        'Hard plastics & leather conditioned'
      ],
      addOns: [
        { name: 'Carpet/Upholstery Shield Guard', price: '$30' },
        { name: 'Pet Hair / Heavy Soil Extraction', price: 'Varies' },
        { name: 'Kid Car Seat Clean & Deodorize', price: '$25' }
      ],
      warnings: [
        'Pet hair, heavily soiled vehicles, and mileage fees may apply.'
      ]
    },
    'express-detail': {
      title: 'Express Maintenance Detail',
      duration: '1–1.25 Hours',
      description: 'A quick, consistent refresh to keep your vehicle looking great. Perfect for weekly, bi-weekly, or monthly upkeep.',
      prices: [
        { category: 'Coupe / Sedan', price: '$100+' },
        { category: 'Midsize SUV / Truck', price: '$125+' },
        { category: 'Large SUV (3-Row) / Van', price: '$135+' },
        { category: 'Extra Large / Heavy Duty', price: '$230+' }
      ],
      includesExterior: [
        'Full exterior wash & chamois dry',
        'Wheel & tire cleaning and dressing',
        'Spray wax paint protection'
      ],
      includesInterior: [
        'Deep interior vacuum of carpets & seats',
        'Windows cleaned inside & out',
        'Dashboard & console wipe-down'
      ],
      addOns: [
        { name: 'Sap & Scratch Spot Removal', price: 'Inquire' },
        { name: 'Ozone Treatment (Interior Fresh)', price: 'Inquire' },
        { name: 'Hand Wax Upgrade', price: 'Inquire' }
      ]
    }
  };

  const details = detailsMap[serviceId] || detailsMap['full-detail'];

  return (
    <>
      {/* Fixed Overlay covering full viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 300,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {/* Sheet - stop click bubbling */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '88vh',
            background: 'var(--bg-card)',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderTop: '1px solid var(--border-color)',
            borderLeft: '1px solid var(--border-color)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Drag handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px 0' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--text-muted)', cursor: 'pointer' }} onClick={onClose} />
          </div>

          {/* Sheet Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 20px 14px 20px',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div>
              <h2 style={{ fontSize: '19px', color: 'var(--text-primary)', margin: 0 }}>{details.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-red)', fontSize: '11px', fontWeight: 600, marginTop: '3px' }}>
                <Timer size={11} />
                <span>{details.duration}</span>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={15} />
            </button>
          </div>

          {/* CTA moved above scrollable area */}
          <div style={{ padding: '16px 20px 0 20px' }}>
            <motion.button
              className="btn-red"
              style={{ width: '100%', fontSize: '15px', padding: '15px' }}
              onClick={() => onBook(serviceId)}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar size={17} />
              <span>Book This Package</span>
            </motion.button>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 32px 20px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
              {details.description}
            </p>

            {/* Pricing Grid */}
            <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>Pricing by Vehicle Size</h3>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden', marginBottom: '20px' }}>
              {details.prices.map((p, idx) => (
                <div key={p.category} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)', borderBottom: idx === details.prices.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '12.5px', fontWeight: 500 }}>{p.category}</span>
                  <span style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '13px' }}>{p.price}</span>
                </div>
              ))}
            </div>

            {/* Includes - two columns on wide sheets */}
            <div style={{ display: 'grid', gridTemplateColumns: details.includesExterior && details.includesInterior ? '1fr 1fr' : '1fr', gap: '16px', marginBottom: '20px' }}>
              {details.includesExterior && (
                <div>
                  <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>Exterior</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {details.includesExterior.map(item => (
                      <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <Check size={12} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.4' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {details.includesInterior && (
                <div>
                  <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>Interior</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {details.includesInterior.map(item => (
                      <div key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <Check size={12} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.4' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add-ons */}
            {details.addOns && (
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>Available Add-Ons</h3>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '4px 16px' }}>
                  {details.addOns.map((add, idx) => (
                    <div key={add.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: idx === details.addOns!.length - 1 ? 'none' : '1px solid var(--border-color)', fontSize: '12px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{add.name}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{add.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {details.warnings && (
              <div style={{ background: 'rgba(212, 43, 43, 0.05)', border: '1px solid rgba(212, 43, 43, 0.15)', borderRadius: '10px', padding: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {details.warnings.map((w, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <ShieldAlert size={12} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: '1.5' }}>{w}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
