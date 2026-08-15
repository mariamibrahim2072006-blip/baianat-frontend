import { Link } from 'react-router-dom';

export default function Account() {
  return (
    <div style={{ marginTop: '50px', marginBottom: '140px' }}>
      {/* Header Row: Breadcrumb & Welcome */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <div style={{ fontSize: '14px', color: '#808080' }}>
          <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#000' }}>My Account</span>
        </div>
        <div style={{ fontSize: '14px' }}>
          Welcome! <span style={{ color: '#DB4444' }}>Md Rimel</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Left Sidebar Menu */}
        <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>Manage My Account</h4>
            <ul style={{ listStyle: 'none', padding: '0 0 0 20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/account" style={{ textDecoration: 'none', color: '#DB4444', fontSize: '14px' }}>My Profile</Link></li>
              <li><span style={{ color: '#808080', fontSize: '14px', cursor: 'pointer' }}>Address Book</span></li>
              <li><span style={{ color: '#808080', fontSize: '14px', cursor: 'pointer' }}>My Payment Options</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>My Orders</h4>
            <ul style={{ listStyle: 'none', padding: '0 0 0 20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><span style={{ color: '#808080', fontSize: '14px', cursor: 'pointer' }}>My Returns</span></li>
              <li><span style={{ color: '#808080', fontSize: '14px', cursor: 'pointer' }}>My Cancellations</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>My WishList</h4>
          </div>
        </div>

        {/* Right Form Card */}
        <div style={{
          flex: 1,
          minWidth: '320px',
          boxShadow: '0 1px 13px rgba(0,0,0,0.05)',
          padding: '40px 60px',
          borderRadius: '4px'
        }}>
          <h3 style={{ fontSize: '20px', color: '#DB4444', fontWeight: '500', margin: '0 0 24px 0' }}>Edit Your Profile</h3>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Row 1: First & Last Name */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px' }}>First Name</label>
                <input type="text" defaultValue="Md" style={{ backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '12px 16px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px' }}>Last Name</label>
                <input type="text" defaultValue="Rimel" style={{ backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '12px 16px', outline: 'none' }} />
              </div>
            </div>

            {/* Row 2: Email & Address */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px' }}>Email</label>
                <input type="email" defaultValue="rimel1111@gmail.com" style={{ backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '12px 16px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px' }}>Address</label>
                <input type="text" defaultValue="Kingston, 5236, United State" style={{ backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '12px 16px', outline: 'none' }} />
              </div>
            </div>

            {/* Password Changes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              <label style={{ fontSize: '14px' }}>Password Changes</label>
              <input type="password" placeholder="Current Passwod" style={{ backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '12px 16px', outline: 'none' }} />
              <input type="password" placeholder="New Passwod" style={{ backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '12px 16px', outline: 'none' }} />
              <input type="password" placeholder="Confirm New Passwod" style={{ backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '12px 16px', outline: 'none' }} />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px', marginTop: '16px' }}>
              <span style={{ fontSize: '14px', cursor: 'pointer', color: '#000' }}>Cancel</span>
              <button type="button" style={{
                backgroundColor: '#DB4444',
                color: '#fff',
                border: 'none',
                padding: '16px 48px',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}