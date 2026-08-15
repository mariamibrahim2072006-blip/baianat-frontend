export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000', color: '#FAFAFA', paddingTop: '80px', paddingBottom: '24px' }}>
      {/* Footer Content Container */}
      <div style={{
        maxWidth: '1170px',
        margin: '0 auto',
        padding: '0 15px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px'
      }}>
        {/* Col 1: Exclusive / Subscribe */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 24px 0' }}>Exclusive</h2>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Subscribe</h3>
          <p style={{ fontSize: '16px', color: '#FAFAFA', margin: '0 0 16px 0' }}>Get 10% off your first order</p>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            border: '1.5px solid #fff',
            borderRadius: '4px',
            padding: '12px 16px',
            maxWidth: '215px'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: '14px',
                width: '100%'
              }}
            />
            <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* Col 2: Support */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Support</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p style={{ fontSize: '14px', margin: '0 0 16px 0' }}>exclusive@gmail.com</p>
          <p style={{ fontSize: '14px', margin: 0 }}>+88015-88888-9999</p>
        </div>

        {/* Col 3: Account */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Account</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>My Account</a></li>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>Login / Register</a></li>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>Cart</a></li>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>Wishlist</a></li>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>Shop</a></li>
          </ul>
        </div>

        {/* Col 4: Quick Link */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Quick Link</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>Terms Of Use</a></li>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>FAQ</a></li>
            <li><a href="#" style={{ color: '#FAFAFA', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </div>

        {/* Col 5: Download App & Social */}
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 24px 0' }}>Download App</h3>
          <p style={{ fontSize: '12px', color: '#A0A0A0', margin: '0 0 10px 0' }}>Save $3 with App New User Only</p>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ width: '80px', height: '80px', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', textAlign: 'center' }}>
              [ QR Code ]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ width: '104px', height: '34px', border: '1px solid #fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>Google Play</div>
              <div style={{ width: '104px', height: '34px', border: '1px solid #fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>App Store</div>
            </div>
          </div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '18px' }}>
            <span style={{ cursor: 'pointer' }}>f</span>
            <span style={{ cursor: 'pointer' }}>t</span>
            <span style={{ cursor: 'pointer' }}>in</span>
            <span style={{ cursor: 'pointer' }}>ig</span>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '60px',
        paddingTop: '16px',
        textAlign: 'center',
        color: '#444',
        fontSize: '14px'
      }}>
        &copy; Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}