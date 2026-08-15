import { Link } from 'react-router-dom';
import authImg from '../assets/auth-side.png';

export default function SignUp() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '60px',
      marginBottom: '140px',
      marginLeft: 'calc(-50vw + 50%)', // يلغي الهامش الشمال تماماً ويلتصق بالحافة
      gap: '80px',
      flexWrap: 'wrap'
    }}>
      {/* Left Full Bleed Image */}
      <div style={{
        flex: '1.2',
        minWidth: '380px',
        backgroundColor: '#CBE4E8',
        borderRadius: '0 4px 4px 0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '700px'
      }}>
        <img 
          src={authImg} 
          alt="Side Graphic" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      {/* Right Form */}
      <div style={{ flex: '1', minWidth: '320px', maxWidth: '380px', paddingRight: '40px' }}>
       <h2 style={{ 
  fontSize: '36px', 
  fontWeight: '500', 
  margin: '0 0 12px 0', 
  letterSpacing: '1px',
  fontFamily: 'Inter, sans-serif'
}}>
  Create an account
</h2>
        <p style={{ fontSize: '16px', color: '#000', margin: '0 0 40px 0' }}>
          Enter your details below
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <input
            type="text"
            placeholder="Name"
            style={{
              border: 'none',
              borderBottom: '1px solid #c1c0c1',
              outline: 'none',
              padding: '8px 0',
              fontSize: '16px'
            }}
          />

          <input
            type="text"
            placeholder="Email or Phone Number"
            style={{
              border: 'none',
              borderBottom: '1px solid #c1c0c1',
              outline: 'none',
              padding: '8px 0',
              fontSize: '16px'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            style={{
              border: 'none',
              borderBottom: '1px solid #c1c0c1',
              outline: 'none',
              padding: '8px 0',
              fontSize: '16px'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            <button type="button" style={{
              backgroundColor: '#DB4444',
              color: '#fff',
              border: 'none',
              padding: '16px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Create Account
            </button>

            <button type="button" style={{
              backgroundColor: '#fff',
              color: '#000',
              border: '1px solid #c1c0c1',
              padding: '14px',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '400',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign up with Google
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px', fontSize: '15px', color: '#666' }}>
          <span>Already have account?</span>
          <Link to="/login" style={{ color: '#000', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}