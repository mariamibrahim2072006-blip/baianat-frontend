// src/components/Navbar.tsx
import { type FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

type IconProps = {
  size?: number;
};

function SearchIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function UserIcon({ size = 21 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c.9-4 3.3-6 7.5-6s6.6 2 7.5 6" />
    </svg>
  );
}

function CartIcon({ size = 21 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L21 8H6" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  );
}

function HeartIcon({ size = 21 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 8.8c0 5.5-8.8 10.3-8.8 10.3S3.2 14.3 3.2 8.8A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.8 2.2Z" />
    </svg>
  );
}

function MoonIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 14.8A8.5 8.5 0 1 1 9.2 3A6.7 6.7 0 0 0 21 14.8Z" />
    </svg>
  );
}

function SunIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export default function Navbar() {
  const navigate = useNavigate();

  const {
    cartCount,
    wishlistCount,
    searchTerm,
    setSearchTerm,
    darkMode,
    toggleDarkMode,
  } = useShop();

  const { user } = useAuth();

  const handleSearch = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    navigate('/');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAccountClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  return (
    <header
      className={`navbar ${darkMode ? 'navbar-dark' : ''
        }`}
    >
      <div className="navbar-inner">

        {/* Logo */}
        <NavLink
          to="/"
          className="navbar-logo"
        >
          <span className="logo-mark">
            B
          </span>

          <span className="logo-text">
            BAIANAT
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-link ${isActive
                ? 'active'
                : ''
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navbar-link ${isActive
                ? 'active'
                : ''
              }`
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navbar-link ${isActive
                ? 'active'
                : ''
              }`
            }
          >
            About
          </NavLink>

          {/* إذا كان المستخدم مسجل دخوله، لا تظهر Sign Up، وإلا أظهرها */}
          {!user && (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `navbar-link ${isActive
                  ? 'active'
                  : ''
                }`
              }
            >
              Sign Up
            </NavLink>
          )}
        </nav>

        {/* Actions */}
        <div className="navbar-actions">

          {/* Search */}
          <form
            className="navbar-search"
            onSubmit={handleSearch}
          >
            <input
              id="navbar-search"
              name="search"
              type="search"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="What are you looking for?"
              autoComplete="off"
              aria-label="Search products"
            />

            <button
              type="submit"
              aria-label="Search"
              title="Search"
            >
              <SearchIcon />
            </button>
          </form>

          {/* Wishlist */}
          <button
            className="icon-button"
            type="button"
            onClick={() =>
              navigate('/wishlist')
            }
            aria-label="Wishlist"
            title="Wishlist"
          >
            <HeartIcon />

            {wishlistCount > 0 && (
              <span className="badge">
                {wishlistCount > 99
                  ? '99+'
                  : wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            className="icon-button"
            type="button"
            onClick={() =>
              navigate('/cart')
            }
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <CartIcon />

            {cartCount > 0 && (
              <span className="badge">
                {cartCount > 99
                  ? '99+'
                  : cartCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            className={`icon-button ${user
              ? 'account-logged-in'
              : ''
              }`}
            type="button"
            onClick={
              handleAccountClick
            }
            aria-label="Account"
            title={
              user
                ? `My Account - ${user.username}`
                : 'Login'
            }
          >
            <UserIcon />
          </button>

          {/* Dark Mode */}
          <button
            className="theme-button"
            type="button"
            onClick={
              toggleDarkMode
            }
            aria-label={
              darkMode
                ? 'Turn on light mode'
                : 'Turn on dark mode'
            }
            title={
              darkMode
                ? 'Light Mode'
                : 'Dark Mode'
            }
          >
            {darkMode ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}