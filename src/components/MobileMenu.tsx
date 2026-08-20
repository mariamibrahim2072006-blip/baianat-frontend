// src/components/MobileMenu.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
];

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ display: 'block' /* يفضل ظهوره في الموبايل */ }}>
            {/* زرار فتح القائمة (الثلاث شرط) */}
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '8px',
                    color: '#000',
                }}
            >
                ☰
            </button>

            {/* الـ Overlay والخلفية المظلمة */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1100,
                    }}
                />
            )}

            {/* الـ Drawer الجانبي */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: isOpen ? 0 : '-280px',
                    width: '260px',
                    height: '100%',
                    backgroundColor: '#fff',
                    zIndex: 1200,
                    boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
                    transition: 'left 0.3s ease',
                    padding: '20px',
                    overflowY: 'auto',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Categories</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
                    >
                        ✕
                    </button>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {categories.map((cat) => (
                        <li key={cat}>
                            <Link
                                to={`/products?category=${encodeURIComponent(cat)}`}
                                onClick={() => setIsOpen(false)}
                                style={{ textDecoration: 'none', color: '#333', fontSize: '15px', display: 'block' }}
                            >
                                {cat}
                            </Link>
                        </li>
                    ))}
                </ul>

                <hr style={{ margin: '20px 0', borderColor: '#eee' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/cart" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Cart</Link>
                    <Link to="/wishlist" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Wishlist</Link>
                    <Link to="/account" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>My Account</Link>
                </div>
            </div>
        </div>
    );
}