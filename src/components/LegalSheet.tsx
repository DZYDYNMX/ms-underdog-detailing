import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalSheetProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalSheet: React.FC<LegalSheetProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    privacy: {
      title: 'Privacy Policy',
      body: (
        <>
          <p><strong>Last Updated:</strong> May 2026</p>
          <p>Ms.Underdog Mobile Detailing values your privacy. This policy explains how we collect and use your information.</p>
          <h3>1. Information We Collect</h3>
          <p>When you book a service, we collect your name, phone number, vehicle information, and any notes you provide. We do not store your payment information on our servers.</p>
          <h3>2. How We Use Your Information</h3>
          <p>We use your information solely to schedule and provide detailing services, and to communicate with you regarding your appointment. We do not sell or rent your information to third parties.</p>
          <h3>3. Data Security</h3>
          <p>We implement reasonable security measures to protect your personal information from unauthorized access.</p>
          <h3>4. Contact Us</h3>
          <p>If you have questions about this privacy policy, please contact us directly by phone.</p>
        </>
      )
    },
    terms: {
      title: 'Terms of Service',
      body: (
        <>
          <p><strong>Last Updated:</strong> May 2026</p>
          <p>By booking a service with Ms.Underdog Mobile Detailing, you agree to the following terms:</p>
          <h3>1. Services</h3>
          <p>We provide mobile auto detailing services. The estimated time and price may vary based on the actual condition of the vehicle upon arrival.</p>
          <h3>2. Preparation</h3>
          <p>Customers are required to remove all personal belongings, especially from the trunk and center console, prior to our arrival. We are not responsible for lost items.</p>
          <h3>3. Pricing & Payment</h3>
          <p>Prices listed are starting estimates. Heavy soil, pet hair, or biohazards will incur additional fees, which will be communicated before work begins. Payment is due upon completion of the service.</p>
          <h3>4. Cancellations</h3>
          <p>Please provide at least 24 hours notice for cancellations or rescheduling.</p>
        </>
      )
    }
  };

  const data = content[type];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 500,
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          background: 'var(--bg-card)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px 0' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--text-muted)', cursor: 'pointer' }} onClick={onClose} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 20px 14px 20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h2 style={{ fontSize: '18px', margin: 0 }}>{data.title}</h2>
          <button onClick={onClose} style={{ background: 'var(--bg-secondary)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <div className="legal-content" style={{ flex: 1, overflowY: 'auto', padding: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          {data.body}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .legal-content h3 { color: var(--text-primary); font-size: 15px; margin: 16px 0 8px 0; }
          .legal-content p { margin-bottom: 12px; }
        `}} />
      </motion.div>
    </motion.div>
  );
};
