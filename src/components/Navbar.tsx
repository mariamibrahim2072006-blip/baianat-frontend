import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { cartCount, wishlistCount, searchTerm, setSearchTerm, darkMode, toggleDarkMode } = useShop();

  return (
    <header style={{
      borderBottom: darkMode ? '1px solid #27272a' : '1px solid #e4e4e7',
      backgroundColor: darkMode ? '#09090b' : '#ffffff',
      transition: 'background-color 0.2s, border-color 0.2s'
    }}>
      <div style={{
        maxWidth: '1170px',
        margin: '0 auto',
        padding: '18px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{
          fontSize: '24px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          color: darkMode ? '#f4f4f5' : '#09090b',
          textDecoration: 'none'
        }}>
          Exclusive
        </Link>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <Link to="/" style={{ color: darkMode ? '#f4f4f5' : '#09090b', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Home</Link>
          <Link to="/contact" style={{ color: darkMode ? '#a1a1aa' : '#52525b', textDecoration: 'none', fontSize: '15px', fontWeight: '400' }}>Contact</Link>
          <Link to="/about" style={{ color: darkMode ? '#a1a1aa' : '#52525b', textDecoration: 'none', fontSize: '15px', fontWeight: '400' }}>About</Link>
          <Link to="/signup" style={{ color: darkMode ? '#a1a1aa' : '#52525b', textDecoration: 'none', fontSize: '15px', fontWeight: '400' }}>Sign Up</Link>
        </nav>

        {/* Right Section: Search & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

          {/* Clean Search Input */}
          <div style={{
            position: 'relative',
            backgroundColor: darkMode ? '#18181b' : '#f4f4f5',
            borderRadius: '6px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '210px',
            border: darkMode ? '1px solid #27272a' : '1px solid transparent'
          }}>
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '12px',
                width: '100%',
                color: darkMode ? '#f4f4f5' : '#09090b'
              }}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#a1a1aa' : '#71717a'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          {/* Dark Mode Icon Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: darkMode ? '#f4f4f5' : '#09090b'
            }}
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Wishlist SVG Icon */}
          <Link to="/wishlist" style={{ position: 'relative', padding: '6px', color: darkMode ? '#f4f4f5' : '#09090b', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-4px',
                backgroundColor: '#db4444',
                color: '#ffffff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart SVG Icon */}
          <Link to="/cart" style={{ position: 'relative', padding: '6px', color: darkMode ? '#f4f4f5' : '#09090b', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-4px',
                backgroundColor: '#db4444',
                color: '#ffffff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile Avatar */}
          <Link
            to="/account"
            style={{
              backgroundColor: '#db4444',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>

        </div>
      </div>
    </header>
  );
}

