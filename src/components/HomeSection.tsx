import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import { Footer } from './Footer';

import Link from 'next/link';

export const HomeSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  return (
    <motion.div
      className="scroll-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Brand Hero Welcome - Full Bleed Overlay */}
      <motion.div 
        variants={itemVariants} 
        className="hero-container"
      >
        <img 
          src="/hero.webp" 
          alt="Freshly detailed luxury sedan" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          fetchPriority="high"
          loading="eager"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.4) 0%, rgba(13,27,42,0.8) 50%, rgba(13,27,42,0.98) 100%)', zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center', padding: '0 20px 32px 20px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.1, textTransform: 'uppercase' }}>
            Top Rated Mobile<br />Car Detailing Near You
          </h1>
          <p style={{
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '18px',
            margin: '0 0 8px 0',
            fontWeight: 500
          }}>
            "A man's hard work with a woman's touch"
          </p>
          <p style={{
            color: 'var(--accent-red)',
            fontSize: '15px',
            fontWeight: 700,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Always remember we come straight to you!
          </p>
        </div>
      </motion.div>

      {/* Main Continuous Vertical Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Left Column: Introductions, Alert & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Hero Actions */}
          <motion.div
            variants={itemVariants}
            className="service-card"
            style={{
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', fontWeight: 700 }}>Ready to restore your vehicle?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
              Get an instant estimate based on your vehicle size, pick your add-ons, and send Ronnie your booking request - all in one step. We specialize in mobile car detailing, interior deep cleans, and ceramic coatings.
            </p>
            <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '4px' }}>
              <Link
                href="/contact"
                className="btn-red"
                style={{ flex: 1, fontSize: '13px', padding: '12px 16px', textAlign: 'center', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <span>Book Detailing</span>
              </Link>
              <Link
                href="/services"
                className="btn-outline"
                style={{ flex: 1, fontSize: '13px', padding: '12px 16px', textAlign: 'center', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <span>View Packages</span>
              </Link>
            </div>
          </motion.div>

          {/* SEO Rich Description Section */}
          <motion.div
            variants={itemVariants}
            className="service-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <h2 style={{ fontSize: '22px', color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>Premium Mobile Car Detailing in the DMV Area</h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: 0 }}>
                Ms. Underdog Detailing is Washington D.C.'s premier mobile auto detailing service, bringing top-tier car care directly to your driveway, office, or apartment complex. Serving the entire DMV area-including Maryland and Northern Virginia-we specialize in restoring your vehicle to showroom condition without you ever having to leave your home.
              </p>
              <p style={{ margin: 0 }}>
                Our professional detailing packages go far beyond a standard car wash. We offer meticulous interior deep cleaning, pet hair removal, odor elimination, and leather conditioning to rejuvenate your cabin. On the exterior, our services include advanced clay bar treatments, orbital waxing, paint correction, and long-lasting ceramic coatings that protect your clear coat from harsh East Coast weather, road salt, and UV damage.
              </p>
              <p style={{ margin: 0 }}>
                Whether you drive a daily commuter, a luxury sedan, or a heavy-duty truck, our fully-equipped mobile detailing vans carry our own spot-free water and spot-free power supply. Skip the long lines at the local wash and let Ms. Underdog Detailing deliver a meticulous, swirl-free, and high-gloss finish right at your doorstep. Book your exterior wash or interior detail today and experience the ultimate convenience in mobile car care.
              </p>
            </div>
          </motion.div>

          {/* Meet Ronnie Section */}
          <motion.div
            variants={itemVariants}
            className="service-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div>
              <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', margin: 0 }}>Meet Ronnie</h3>
              <span style={{ color: 'var(--accent-red)', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>Owner & Lead Technician</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: '1.6', margin: 0 }}>
              "I started Ms.Underdog Mobile Detailing to bring authentic, high-end shop detailing quality directly to your driveway. We don't believe in rushed drive-thru washes. We take our time, steam sanitize your cabin, deep clean the carpets, and hand-wax your clear coat to protect your investment."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontSize: '11px', fontWeight: 700 }}>
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <span>Over 8 Years Serving D.C. Area</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Details, Hours & Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Location Area */}
          <motion.div variants={itemVariants} className="service-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px 12px 20px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>Service Coverage</h3>
            </div>
            <iframe
              title="Service Coverage Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.585721110599!2d-77.08630048464872!3d38.93339177956553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b6296b9d62db%3A0xc0c8702c2e9d288d!2sAvalon%20at%20Foxhall!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div style={{ padding: '12px 20px 16px 20px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', marginBottom: '0', lineHeight: '1.5' }}>
                Based out of <strong>Avalon at Foxhall (Washington, DC 20016)</strong>. Ronnie provides fully equipped mobile detailing services to driveways and office lots throughout D.C., Arlington, and Bethesda.
              </p>
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div variants={itemVariants} className="service-card" style={{ maxWidth: '640px', width: '100%', margin: '0 auto' }}>
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>Operational Hours</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '12.5px' }}>Mon - Sun</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '12.5px' }}>09:00 AM - 03:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Preparatory Check Banner */}
          <motion.div
            variants={itemVariants}
            style={{
              background: 'rgba(212, 43, 43, 0.05)',
              border: '1.5px dashed var(--accent-red)',
              borderRadius: 'var(--border-radius-md)',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: '1.5', margin: 0 }}>
              <strong style={{ color: 'var(--accent-red)' }}>Preparatory Check:</strong> Kindly empty your compartments and remove child car seats/belongings before Ronnie's arrival to guarantee a thorough deep-clean.
            </p>
          </motion.div>

          {/* Payment Options */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', padding: '0 0 10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accepted Payments</span>
            </div>
            <div className="payment-logo-grid" style={{ justifyContent: 'center' }}>
              {['Cash', 'Credit Cards', 'Checks', 'CashApp', 'Zelle'].map((payment) => (
                <span key={payment} className="payment-pill">{payment}</span>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
      
      <Footer />
    </motion.div>
  );
};
