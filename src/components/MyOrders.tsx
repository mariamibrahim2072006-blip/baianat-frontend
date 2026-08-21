// src/components/MyOrders.tsx
import { useEffect, useState } from 'react';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    selectedSize?: string;
}

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

export default function MyOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchOrders() {
            try {
                const API_URL =
                    import.meta.env.VITE_API_URL ||
                    'http://localhost:5000/api';

                const res = await fetch(`${API_URL}/orders`, {
                    credentials: 'include',
                });

                const data = await res.json();

                if (res.ok) {
                    // الـ API بترجع الأوردرات في شكل مصفوفة مباشرة
                    setOrders(
                        Array.isArray(data)
                            ? data
                            : data.orders || []
                    );
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);
    if (loading) return <div style={{ padding: '20px', color: '#555' }}>جاري تحميل طلباتك...</div>;

    if (orders.length === 0) {
        return (
            <div style={{ padding: '20px', color: '#777' }}>
                <p>ليس لديك أي طلبات سابقة حتى الآن.</p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#DB4444' }}>
                تاريخ الطلبات السابقة (My Orders)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {orders.map((order) => (
                    <div key={order.id} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px', fontSize: '14px', flexWrap: 'wrap', gap: '10px' }}>
                            <span><strong>رقم الطلب:</strong> #{order.id.slice(-6)}</span>
                            <span><strong>الحالة:</strong> <span style={{ color: order.status === 'Pending' ? '#FFAD33' : '#0ba360' }}>{order.status}</span></span>
                            <span><strong>الإجمالي:</strong> ${order.total.toFixed(2)}</span>
                            <span><strong>التاريخ:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {order.items.map((item) => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'contain', backgroundColor: '#f9f9f9', borderRadius: '4px' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '14px', margin: 0, fontWeight: '500' }}>{item.name}</h4>
                                        <p style={{ fontSize: '13px', color: '#777', margin: '4px 0 0 0' }}>
                                            الكمية: {item.quantity} {item.selectedSize ? `| المقاس: ${item.selectedSize}` : ''}
                                        </p>
                                    </div>
                                    <span style={{ fontWeight: '600', fontSize: '14px' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}