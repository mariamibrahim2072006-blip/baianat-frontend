// src/pages/OrderSuccess.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react'; // تم إزالة ArrowRight غير المستخدمة

export default function OrderSuccess() {
    const navigate = useNavigate();
    const { orderId } = useParams();

    return (
        <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ textAlign: 'center', maxWidth: '500px', width: '100%' }}>
                <div style={{ color: '#10b981', marginBottom: '20px' }}>
                    <CheckCircle size={80} strokeWidth={1.5} />
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>شكراً لك!</h1>
                <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '16px' }}>
                    تم استلام طلبك بنجاح. سنقوم بتجهيزه وشحنه في أقرب وقت.
                </p>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>رقم الطلب الخاص بك:</p>
                    <h2 style={{ margin: '5px 0 0', fontSize: '20px', color: '#DB4444' }}>#{orderId || 'XXXX-XXXX'}</h2>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={() => navigate('/account')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#DB4444', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                        <Package size={18} />
                        تتبع الطلب
                    </button>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid #e2e8f0', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                        العودة للمتجر
                    </button>
                </div>
            </div>
        </div>
    );
}