// src/pages/Cart.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Cart() {
    const { cart, removeFromCart, updateCartQuantity, cartTotal } = useShop();
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState('');
    const navigate = useNavigate();

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (coupon.trim().toUpperCase() === 'EXCLUSIVE10') {
            setDiscount(0.1);
            setCouponMsg('Coupon Applied! (10% OFF)');
        } else {
            setCouponMsg('Invalid Coupon Code. Try EXCLUSIVE10');
        }
    };

    const shipping = cartTotal > 0 ? (cartTotal > 500 ? 0 : 20) : 0;
    const discountAmount = cartTotal * discount;
    const finalTotal = cartTotal - discountAmount + shipping;

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Your Cart is Empty 🛒</h2>
                <p style={{ color: '#666', marginBottom: '24px' }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" style={{ display: 'inline-block', backgroundColor: '#DB4444', color: '#fff', padding: '14px 40px', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}>
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '40px', marginBottom: '100px', padding: '0 50px' }}>
            <div style={{ fontSize: '14px', color: '#808080', marginBottom: '40px' }}>
                <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#000' }}>Cart</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', padding: '20px 30px', boxShadow: '0 1px 13px rgba(0,0,0,0.05)', borderRadius: '4px', fontWeight: '500', marginBottom: '24px' }}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span></span>
            </div>

            {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', alignItems: 'center', padding: '20px 30px', boxShadow: '0 1px 13px rgba(0,0,0,0.05)', borderRadius: '4px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</span>
                    </div>

                    <span style={{ fontSize: '14px' }}>${item.price}</span>

                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', width: '80px', justifyContent: 'space-between', padding: '4px 8px' }}>
                        <button onClick={() => updateCartQuantity(item.id, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}>-</button>
                        <span style={{ fontSize: '14px' }}>{item.quantity || 1}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}>+</button>
                    </div>

                    <span style={{ fontSize: '14px', fontWeight: '600' }}>${item.price * (item.quantity || 1)}</span>

                    <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#DB4444', fontSize: '18px' }}>
                        ✕
                    </button>
                </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginTop: '40px' }}>
                <div style={{ flex: '1', minWidth: '280px' }}>
                    <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '12px' }}>
                        <input
                            type="text"
                            placeholder="Coupon Code (e.g. EXCLUSIVE10)"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            style={{ padding: '12px 16px', border: '1px solid #000', borderRadius: '4px', outline: 'none', width: '220px' }}
                        />
                        <button type="submit" style={{ backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
                            Apply Coupon
                        </button>
                    </form>
                    {couponMsg && <p style={{ fontSize: '13px', marginTop: '8px', color: discount > 0 ? 'green' : '#DB4444' }}>{couponMsg}</p>}
                </div>

                <div style={{ width: '400px', border: '1.5px solid #000', borderRadius: '4px', padding: '30px 24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Cart Total</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '12px', marginBottom: '12px', fontSize: '14px' }}>
                        <span>Subtotal:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '12px', marginBottom: '12px', fontSize: '14px', color: 'green' }}>
                            <span>Discount (10%):</span>
                            <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '12px', marginBottom: '12px', fontSize: '14px' }}>
                        <span>Shipping:</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
                        <span>Total:</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>

                    {/* زرار ينقل لصفحة Checkout المستقلة */}
                    <button
                        onClick={() => navigate('/checkout')}
                        style={{ width: '100%', backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '14px', borderRadius: '4px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}