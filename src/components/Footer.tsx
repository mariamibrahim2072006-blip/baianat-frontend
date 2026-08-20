// src/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  // دالة صغيرة عشان نوحد ستايل الروابط ونضيف تأثير الـ Hover
  const linkStyle = { color: '#A0A0A0', textDecoration: 'none', transition: '0.3s' };

  return (
    <footer style={{ backgroundColor: '#000', color: '#FAFAFA', paddingTop: '80px', paddingBottom: '24px' }}>
      <div style={{ maxWidth: '1170px', margin: '0 auto', padding: '0 15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>

        {/* Col 1: Subscribe */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 24px 0' }}>Baianat</h2>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Subscribe</h3>
          <p style={{ fontSize: '16px', color: '#FAFAFA', margin: '0 0 16px 0' }}>Get 10% off your first order</p>
        </div>

        {/* Col 2: Support */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Support</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>111 Egypt, Cairo, New Cairo.</p>
          <p style={{ fontSize: '14px', margin: '0 0 16px 0' }}>support@baianat.com</p>
        </div>

        {/* Col 3: Account (تم ربطها بـ React Router) */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Account</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <li><Link to="/account" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>My Account</Link></li>
            <li><Link to="/cart" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>Cart</Link></li>
            <li><Link to="/wishlist" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = '#A0A0A0'}>Wishlist</Link></li>
          </ul>
        </div>

        {/* Col 4: Quick Link */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Quick Link</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <li><Link to="/about" style={linkStyle}>About Us</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '60px', paddingTop: '16px', textAlign: 'center', color: '#444', fontSize: '14px' }}>
        &copy; Copyright Baianat 2026. All rights reserved.
      </div>
    </footer>
  );
}