// src/pages/Contact.tsx
import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully.');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div style={{ padding: '40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ fontSize: '14px', color: '#7f7f7f', marginBottom: '60px' }}>
        Home / <span style={{ color: '#000' }}>Contact</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '50px', alignItems: 'start', flexWrap: 'wrap' }}>
        <div style={{ padding: '30px', boxShadow: '0 1px 13px rgba(0,0,0,0.05)', borderRadius: '4px', backgroundColor: '#fff' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#DB4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>📞</div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Call To Us</h3>
            </div>
            <p style={{ fontSize: '14px', color: '#000', marginBottom: '10px' }}>We are available 24/7, 7 days a week.</p>
            <p style={{ fontSize: '14px', color: '#000', margin: 0, fontWeight: '500' }}>Phone: +20 100 000 0000</p>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #e0e0e0', marginBottom: '40px' }} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#DB4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>✉️</div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: 0 }}>Write To Us</h3>
            </div>
            <p style={{ fontSize: '14px', color: '#000', marginBottom: '15px' }}>Fill out our form and we will contact you within 24 hours.</p>
            <p style={{ fontSize: '14px', color: '#000', marginBottom: '10px' }}>Emails: support@baianat.com</p>
            <p style={{ fontSize: '14px', color: '#000', margin: 0 }}>Emails: info@baianat.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '40px', boxShadow: '0 1px 13px rgba(0,0,0,0.05)', borderRadius: '4px', backgroundColor: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '30px' }}>
            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: '#F5F5F5', border: 'none', padding: '12px', borderRadius: '4px', outline: 'none', fontSize: '14px' }}
              required
            />
            <input
              type="email"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: '#F5F5F5', border: 'none', padding: '12px', borderRadius: '4px', outline: 'none', fontSize: '14px' }}
              required
            />
            <input
              type="text"
              placeholder="Your Phone *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ backgroundColor: '#F5F5F5', border: 'none', padding: '12px', borderRadius: '4px', outline: 'none', fontSize: '14px' }}
              required
            />
          </div>

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ backgroundColor: '#F5F5F5', border: 'none', padding: '15px', borderRadius: '4px', outline: 'none', width: '100%', height: '200px', resize: 'none', marginBottom: '30px', fontSize: '14px', boxSizing: 'border-box' }}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              style={{ backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '16px 40px', borderRadius: '4px', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}