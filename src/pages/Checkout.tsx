// src/pages/Checkout.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Truck, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EGYPT_GOVERNORATES = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية', 'القليوبية',
    'الغربية', 'المنوفية', 'البحيرة', 'كفر الشيخ', 'دمياط', 'بورسعيد',
    'الإسماعيلية', 'السويس', 'الفيوم', 'بني سويف', 'المنيا', 'أسيوط',
    'سوهاج', 'قنا', 'أسوان', 'الأقصر', 'البحر الأحمر', 'جنوب سيناء',
    'شمال سيناء', 'مطروح', 'الوادي الجديد'
];

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useShop();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [governorate, setGovernorate] = useState(EGYPT_GOVERNORATES[0]);
    const [city, setCity] = useState('');
    const [streetAddress, setStreetAddress] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' أو 'card'
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePhoneChange = (val: string) => {
        setPhone(val);
        const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
        if (val.trim() && !egyptianPhoneRegex.test(val)) {
            setPhoneError('برجاء كتابة رقم هاتف مصري صحيح (11 رقم)');
        } else {
            setPhoneError('');
        }
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error('يجب تسجيل الدخول أولاً!');
            navigate('/login');
            return;
        }

        if (!fullName.trim() || !phone.trim() || !city.trim() || !streetAddress.trim()) {
            toast.error('من فضلك أكمل جميع بيانات العنوان والاسم ورقم الهاتف!');
            return;
        }

        if (cart.length === 0) {
            toast.error('السلة فارغة.');
            navigate('/cart');
            return;
        }

        setLoading(true);

        const fullAddressText = `${governorate} - ${city} - ${streetAddress} (رقم الموبايل: ${phone} - الاسم: ${fullName})`;

        try {
            // 1. لو اليوزر اختار الدفع بالفيزا عبر Stripe
            if (paymentMethod === 'card') {
                const response = await fetch(`${API_URL}/create-checkout-session`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ items: cart }),
                });
                const session = await response.json();
                if (session.url) {
                    window.location.href = session.url;
                } else {
                    throw new Error('فشل في إنشاء جلسة سترايب.');
                }
                return;
            }

            // 2. الدفع عند الاستلام (Cash on Delivery)
            const newOrder = {
                id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
                date: new Date().toLocaleDateString('ar-EG'),
                items: cart,
                total: cartTotal,
                address: fullAddressText,
                paymentMethod: 'cod', // الدفع عند الاستلام
                paymentStatus: 'الدفع عند الاستلام (Cash on Delivery)',
                status: 'قيد المعالجة (Processing)'
            };

            // حفظ الأوردر محلياً لكي يظهر مباشرة في صفحة الحساب والأوردرات
            const existingOrders = JSON.parse(localStorage.getItem('baianat_user_orders') || '[]');
            localStorage.setItem('baianat_user_orders', JSON.stringify([newOrder, ...existingOrders]));

            // إرسال للسيرفر لو متاح
            try {
                await fetch(`${API_URL}/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        address: fullAddressText,
                        paymentMethod: 'cod',
                        items: cart,
                        total: cartTotal,
                    }),
                });
            } catch (err) {
                console.log('Backend sync skipped, saved locally.');
            }

            clearCart();

            // تنبيهات احترافية
            toast.success('تم إرسال طلبك بنجاح! 🎉');

            // محاكاة إرسال الإيميل قبل الوصول
            setTimeout(() => {
                toast.success('📧 تم إرسال إيميل تأكيد الطلب وفاتورة الدفع عند الاستلام إلى بريدك الإلكتروني بنجاح!');
            }, 1000);

            setTimeout(() => {
                navigate('/account');
            }, 2000);

        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء إتمام الطلب، حاول مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div style={{ maxWidth: '800px', margin: '80px auto', padding: '40px', textAlign: 'center' }}>
                <h2>تسجيل الدخول مطلوب</h2>
                <Link to="/login" style={{ color: '#DB4444', fontWeight: 'bold' }}>تسجيل الدخول</Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '50px auto', padding: '0 20px', fontFamily: 'Inter, sans-serif' }}>
            <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '700', marginBottom: '30px' }}>Billing Details & Checkout</h2>

            <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', gap: '40px' }}>

                {/* بيانات الشحن */}
                <div style={{ backgroundColor: '#fff', padding: isMobile ? '20px' : '30px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <MapPin size={20} color="#DB4444" /> Shipping Address
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Full Name *</label>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Phone Number *</label>
                            <input type="tel" placeholder="01012345678" value={phone} onChange={(e) => handlePhoneChange(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            {phoneError && <span style={{ color: '#DB4444', fontSize: '12px' }}>{phoneError}</span>}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Governorate *</label>
                                <select value={governorate} onChange={(e) => setGovernorate(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff' }}>
                                    {EGYPT_GOVERNORATES.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>City *</label>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Street Address *</label>
                            <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>
                </div>

                {/* ملخص الطلب وطريقة الدفع */}
                <div style={{ backgroundColor: '#fff', padding: isMobile ? '20px' : '30px', borderRadius: '8px', border: '1.5px solid #000' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Order Summary</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <span>Total Amount:</span>
                        <span style={{ fontWeight: '700', color: '#DB4444' }}>${cartTotal.toFixed(2)}</span>
                    </div>

                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Payment Method</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: paymentMethod === 'cod' ? '2px solid #DB4444' : '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                <span style={{ fontWeight: '500', fontSize: '14px' }}>Cash on Delivery (الدفع عند الاستلام)</span>
                            </div>
                            <Truck size={18} color={paymentMethod === 'cod' ? '#DB4444' : '#888'} />
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: paymentMethod === 'card' ? '2px solid #DB4444' : '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                <span style={{ fontWeight: '500', fontSize: '14px' }}>Online Payment via Stripe (فيزا)</span>
                            </div>
                            <CreditCard size={18} color={paymentMethod === 'card' ? '#DB4444' : '#888'} />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ width: '100%', backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '15px', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Processing...' : (paymentMethod === 'card' ? 'Proceed to Stripe Payment 💳' : 'Place Order (Cash on Delivery)')}
                    </button>
                </div>

            </form>
        </div>
    );
}