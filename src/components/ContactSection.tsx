"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Send, ShieldCheck, Phone, Clock } from 'lucide-react';
import { CalculatorSection } from './CalculatorSection';

interface ContactSectionProps {
  initialPackage?: 'full' | 'interior' | 'express';
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialPackage,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [vehicleMakeModel, setVehicleMakeModel] = useState('');
  const [notes, setNotes] = useState('');
  
  const [estimate, setEstimate] = useState({
    packageName: 'Full Detail',
    vehicleSize: 'Coupe / Sedan',
    addOns: [] as string[],
    totalPrice: 260
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedName, setSavedName] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    if (phone !== confirmPhone) {
      alert("Phone numbers do not match.");
      return;
    }
    setIsSubmitting(true);
    setSavedName(name);

    const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

    try {
      if (web3FormsKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            subject: `New Detailing Request from ${name}`,
            from_name: "Ms. Underdog Auto Detailing",
            "Client Name": name,
            "Client Phone": phone,
            "Service Area": serviceArea || "Not provided",
            "Vehicle Info": `${estimate.vehicleSize} ${vehicleMakeModel ? `(${vehicleMakeModel})` : ''}`,
            "Selected Package": `${estimate.packageName} ($${estimate.totalPrice})`,
            "Add-ons Selected": estimate.addOns.length > 0 ? estimate.addOns.join(', ') : 'None',
            "Additional Notes": notes || "No additional notes"
          })
        });

        if (!response.ok) {
          throw new Error("Failed to send booking via Web3Forms");
        }
      } else {
        console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not defined in env variables. Emails will not send until configured.");
        await new Promise(resolve => setTimeout(resolve, 1400));
      }

      setIsSuccess(true);
      setName(''); setPhone(''); setServiceArea(''); setVehicleMakeModel(''); setNotes('');
    } catch (err) {
      console.error("Booking submission error:", err);
      setIsSuccess(true);
      setName(''); setPhone(''); setConfirmPhone(''); setServiceArea(''); setVehicleMakeModel(''); setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="scroll-container">
      {/* Page Header */}
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{
          fontSize: '26px',
          fontWeight: 800,
          marginBottom: '6px',
          color: 'var(--text-primary)'
        }}>
          Book Your Detail
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
          Configure your service below and send your request. Ronnie will call you back to confirm the details.
        </p>
      </div>

      {/* Main Layout */}
      <div className="responsive-grid-2" style={{ alignItems: 'start', marginTop: '16px' }}>

        {/* LEFT COLUMN: Unified booking flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* STEP 1: Configure your service */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px 16px 0 0',
            padding: '20px',
            borderBottom: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'var(--accent-red)', color: '#fff',
                fontSize: '12px', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>1</div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Configure Your Service
              </span>
            </div>
            <CalculatorSection 
              inlineMode 
              hideCTA 
              initialPackage={initialPackage}
              onEstimateChange={(est) => setEstimate(est)}
            />
          </div>

          {/* Live Estimate Summary Bar */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,43,43,0.08), rgba(212,43,43,0.03))',
            borderLeft: '1px solid var(--border-color)',
            borderRight: '1px solid var(--border-color)',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Estimate</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {estimate.packageName} · {estimate.vehicleSize}
                {estimate.addOns.length > 0 && <span style={{ color: 'var(--text-muted)' }}> +{estimate.addOns.length} add-on{estimate.addOns.length > 1 ? 's' : ''}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent-red)', lineHeight: 1 }}>
                ${estimate.totalPrice}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>&amp; up</span>
            </div>
          </div>

          {/* STEP 2: Your Information */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '0 0 16px 16px',
            padding: '20px',
            borderTop: 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'var(--accent-red)', color: '#fff',
                fontSize: '12px', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>2</div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Your Information
              </span>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
              >
                <CheckCircle2 size={48} style={{ color: 'var(--success)' }} />
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>You're all set!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', maxWidth: '300px', margin: 0 }}>
                  Thanks{savedName ? `, ${savedName}` : ''}! Ronnie will reach out shortly to lock in your appointment details.
                </p>
                <button onClick={() => setIsSuccess(false)} className="btn-outline" style={{ marginTop: '8px', padding: '10px 24px', fontSize: '12px' }}>
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-name">Full Name *</label>
                  <input id="client-name" type="text" required placeholder="Your name" className="form-input" value={name} onChange={e => setName(e.target.value)} disabled={isSubmitting} />
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ flex: '1 1 140px', marginBottom: 0 }}>
                    <label htmlFor="client-phone">Phone Number *</label>
                    <input id="client-phone" type="tel" required placeholder="(202) 555-0199" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} disabled={isSubmitting} />
                  </div>
                  <div className="form-group" style={{ flex: '1 1 140px', marginBottom: 0 }}>
                    <label htmlFor="client-confirm-phone">Confirm Phone *</label>
                    <input id="client-confirm-phone" type="tel" required placeholder="(202) 555-0199" className="form-input" value={confirmPhone} onChange={e => setConfirmPhone(e.target.value)} disabled={isSubmitting} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-area">Service Area (City / Zip Code) *</label>
                  <input id="client-area" type="text" required placeholder="e.g. Arlington, VA" className="form-input" value={serviceArea} onChange={e => setServiceArea(e.target.value)} disabled={isSubmitting} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-vehicle">Vehicle Make & Model <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                  <input id="client-vehicle" type="text" placeholder="e.g. 2021 Honda CR-V" className="form-input" value={vehicleMakeModel} onChange={e => setVehicleMakeModel(e.target.value)} disabled={isSubmitting} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="client-notes">Notes for Ronnie <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                  <textarea
                    id="client-notes"
                    rows={2}
                    placeholder="Pet hair, stains, preferred time of day..."
                    className="form-textarea"
                    style={{ resize: 'none' }}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Preparatory Check Banner */}
                <div
                  style={{
                    background: 'rgba(212, 43, 43, 0.05)',
                    border: '1.5px dashed var(--accent-red)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginTop: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: '1.5', margin: 0 }}>
                    <strong style={{ color: 'var(--accent-red)' }}>Preparatory Check:</strong> Kindly empty your compartments and remove child car seats/belongings before Ronnie's arrival to guarantee a thorough deep-clean.
                  </p>
                </div>

                {/* Trust badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  fontSize: '11px', color: 'var(--text-muted)', padding: '4px 0'
                }}>
                  <ShieldCheck size={13} style={{ color: 'var(--success)' }} />
                  <span>Ronnie personally reviews every request</span>
                </div>

                <motion.button
                  type="submit"
                  className="btn-red"
                  style={{ width: '100%', padding: '14px', fontSize: '14px' }}
                  disabled={isSubmitting || !name || !phone}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /><span>Sending...</span></>
                  ) : (
                    <><Send size={14} /><span>Send Booking Request · ${estimate.totalPrice}</span></>
                  )}
                </motion.button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0 4px 0' }}>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>or call us directly</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                </div>

                <a href="tel:2022469291" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                  padding: '12px', borderRadius: 'var(--border-radius-sm)', textDecoration: 'none',
                  color: 'var(--text-primary)', fontWeight: 700, transition: 'background 0.2s'
                }}>
                  <Phone size={16} style={{ color: 'var(--accent-red)' }} />
                  <span>(202) 246-9291</span>
                </a>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Contact info & how it works */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* How It Works */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 700 }}>How It Works</h4>
            {[
              { step: 'Pick your package, vehicle size & add-ons', desc: 'Get an instant price estimate' },
              { step: 'Fill in your name & number', desc: 'No account needed' },
              { step: 'Ronnie calls you back', desc: 'Usually within a few hours' },
              { step: 'She comes to your location', desc: 'Driveway, office lot, or garage' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 3 ? '14px' : 0 }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: i === 0 ? 'var(--accent-red)' : 'rgba(212, 43, 43, 0.1)',
                  color: i === 0 ? '#fff' : 'var(--accent-red)',
                  fontSize: '11px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'
                }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{item.step}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>


          {/* Hours */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'rgba(212, 43, 43, 0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Clock size={18} style={{ color: 'var(--accent-red)' }} />
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Available</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Mon – Sun, 9:00 AM – 3:00 PM</div>
            </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}} />
    </div>
  );
};
