import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ marginTop: '50px', marginBottom: '140px' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: '14px', color: '#808080', marginBottom: '80px' }}>
        <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#000' }}>404 Error</span>
      </div>

      {/* Main Content */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <h1 style={{ fontSize: '110px', fontWeight: '500', margin: 0, letterSpacing: '4px' }}>
          404 Not Found
        </h1>
        <p style={{ fontSize: '16px', color: '#000', margin: '0 0 30px 0' }}>
          Your visited page not found. You may go home page.
        </p>

        <Link
          to="/"
          style={{
            backgroundColor: '#DB4444',
            color: '#fff',
            textDecoration: 'none',
            padding: '16px 48px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            display: 'inline-block'
          }}
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
}