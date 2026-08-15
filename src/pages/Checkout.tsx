import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Checkout() {
    const { cart, cartTotal } = useShop();
    const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cash'>('cash');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div style={{ textAlign: 'center', padding: '90px 20px' }}>
                <div style={{ fontSize: '50px', marginBottom: '16px' }}>🎉</div>
                <h2 style={{ fontSize: '28px', color: '#000', marginBottom: '12px' }}>Thank You for Your Order!</h2>
                <p style={{ color: '#666', marginBottom: '24px' }}>Order ID: <strong>#EXC-{Math.floor(100000 + Math.random() * 900000)}</strong>. We are processing your package right now.</p>
                <Link to="/" style={{ display: 'inline-block', backgroundColor: '#DB4444', color: '#fff', padding: '12px 36px', borderRadius: '4px', textDecoration: 'none' }}>
                    Back to Shopping
                </Link>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '40px', marginBottom: '100px' }}>
            <div style={{ fontSize: '14px', color: '#808080', marginBottom: '40px' }}>
                <Link to="/cart" style={{ color: '#808080', textDecoration: 'none' }}>Cart</Link> / <span style={{ color: '#000' }}>Checkout</span>
            </div>

            <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '40px' }}>Billing Details</h2>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px' }}>

                {/* Billing Form Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#808080', marginBottom: '6px' }}>First Name*</label>
                        <input required type="text" style={{ width: '100%', padding: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', outline: 'none' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#808080', marginBottom: '6px' }}>Street Address*</label>
                        <input required type="text" style={{ width: '100%', padding: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', outline: 'none' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#808080', marginBottom: '6px' }}>Town/City*</label>
                        <input required type="text" style={{ width: '100%', padding: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', outline: 'none' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#808080', marginBottom: '6px' }}>Phone Number*</label>
                        <input required type="tel" style={{ width: '100%', padding: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', outline: 'none' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#808080', marginBottom: '6px' }}>Email Address*</label>
                        <input required type="email" style={{ width: '100%', padding: '12px', backgroundColor: '#F5F5F5', border: 'none', borderRadius: '4px', outline: 'none' }} />
                    </div>
                </div>

                {/* Order Summary & Payment */}
                <div>
                    {cart.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                                <span style={{ fontSize: '14px' }}>{item.name} (x{item.quantity || 1})</span>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '500' }}>${item.price * (item.quantity || 1)}</span>
                        </div>
                    ))}

                    <div style={{ borderTop: '1px solid #ccc', paddingTop: '16px', marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                            <span>Subtotal:</span>
                            <span>${cartTotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '600', borderBottom: '1px solid #ccc', paddingBottom: '16px' }}>
                            <span>Total:</span>
                            <span>${cartTotal}</span>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
                            <input type="radio" name="payment" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                            <span>Bank Card (Visa / Mastercard)</span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
                            <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                            <span>Cash on Delivery</span>
                        </label>
                    </div>

                    <button type="submit" style={{ width: '100%', marginTop: '30px', backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '14px', borderRadius: '4px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>
                        Place Order
                    </button>
                </div>

            </form>
        </div>
    );
}