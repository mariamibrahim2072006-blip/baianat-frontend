// src/pages/OwnerDashboard.tsx
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { DollarSign, Package, Clock, CheckCircle2, ShoppingBag, Plus, Trash2, Check, ArrowLeft, Search, Edit2, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 🛑 حطي هنا إيميلك الشخصي فقط المصرح له بالدخول للداشبورد دي
const OWNER_EMAIL = 'admin@baianat.com';

type Product = {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    category?: string;
    description?: string;
    image?: string;
    discount?: string;
    rating?: number;
    reviews?: number;
};

type OrderItem = {
    id: string;
    productLegacyId: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    selectedSize?: string | null;
};

type Order = {
    id: string;
    userId: string;
    total: number;
    address: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
};

type Tab = 'dashboard' | 'products' | 'orders';

export default function OwnerDashboard() {
    const { user, loading } = useAuth();
    const { darkMode } = useShop();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingOrders, setLoadingOrders] = useState(false);

    // الفلاتر والبحث
    const [orderFilter, setOrderFilter] = useState<'all' | 'Pending' | 'Completed'>('all');
    const [productSearch, setProductSearch] = useState('');
    const [orderSearch, setOrderSearch] = useState('');

    // إضافة منتج
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [addingProduct, setAddingProduct] = useState(false);

    // تعديل منتج (Modal States)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editImage, setEditImage] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState('');

    // 🔒 حماية صارمة: لو مش مسجل دخول أو إيميلك مش إيميل المالك، يتردد فوراً للرئيسية
    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/login');
            } else if (user.email !== OWNER_EMAIL) {
                alert('عذراً، هذه اللوحة خاصة بالمالك فقط! ⛔');
                navigate('/');
            }
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        if (!user || user.email !== OWNER_EMAIL) return;
        loadProducts();
        loadOrders();
    }, [user]);

    const loadProducts = async () => {
        try {
            setLoadingProducts(true);
            setError('');
            const response = await fetch(`${API_URL}/products`, { credentials: 'include' });
            if (!response.ok) throw new Error('فشل تحميل المنتجات.');
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setError('حدث خطأ أثناء تحميل المنتجات.');
        } finally {
            setLoadingProducts(false);
        }
    };

    const loadOrders = async () => {
        try {
            setLoadingOrders(true);
            const response = await fetch(`${API_URL}/orders`, { credentials: 'include' });
            if (!response.ok) throw new Error('فشل تحميل الطلبات.');
            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setError('حدث خطأ أثناء تحميل الطلبات.');
        } finally {
            setLoadingOrders(false);
        }
    };

    const clearMessages = () => {
        setMessage('');
        setError('');
    };

    const handleAddProduct = async (e: FormEvent) => {
        e.preventDefault();
        clearMessages();

        if (!newName.trim() || !newPrice.trim()) {
            setError('من فضلك أدخل اسم المنتج والسعر.');
            return;
        }

        const price = Number(newPrice);
        if (Number.isNaN(price) || price <= 0) {
            setError('السعر يجب أن يكون رقمًا صحيحًا.');
            return;
        }

        try {
            setAddingProduct(true);
            const response = await fetch(`${API_URL}/admin/products`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName.trim(),
                    price,
                    category: newCategory.trim() || 'General',
                    description: newDescription.trim(),
                    image: newImage.trim(),
                    rating: 0,
                    reviews: 0,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || 'فشل إضافة المنتج.');

            setMessage('تمت إضافة المنتج بنجاح ✅');
            setNewName('');
            setNewPrice('');
            setNewCategory('');
            setNewDescription('');
            setNewImage('');
            await loadProducts();
        } catch (err: any) {
            setError(err?.message || 'حدث خطأ أثناء إضافة المنتج.');
        } finally {
            setAddingProduct(false);
        }
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setEditName(product.name);
        setEditPrice(String(product.price));
        setEditCategory(product.category || '');
        setEditImage(product.image || '');
    };

    const handleUpdateProduct = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;
        clearMessages();

        try {
            setActionLoading(`edit-${editingProduct.id}`);
            const response = await fetch(`${API_URL}/admin/products/${editingProduct.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editName.trim(),
                    price: Number(editPrice),
                    category: editCategory.trim(),
                    image: editImage.trim(),
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || 'فشل تعديل المنتج.');

            setMessage('تم تعديل المنتج بنجاح ✅');
            setEditingProduct(null);
            await loadProducts();
        } catch (err: any) {
            setError(err?.message || 'حدث خطأ أثناء تعديل المنتج.');
        } finally {
            setActionLoading('');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!window.confirm('هل أنت متأكدة أنك تريدين حذف هذا المنتج؟')) return;
        clearMessages();

        try {
            setActionLoading(`delete-product-${id}`);
            const response = await fetch(`${API_URL}/admin/products/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || 'فشل حذف المنتج.');

            setMessage('تم حذف المنتج بنجاح ✅');
            await loadProducts();
        } catch (err: any) {
            setError(err?.message || 'حدث خطأ أثناء حذف المنتج.');
        } finally {
            setActionLoading('');
        }
    };

    const handleUpdateOrderStatus = async (orderId: string, status: string) => {
        clearMessages();
        try {
            setActionLoading(`order-${orderId}`);
            const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || 'فشل تحديث حالة الطلب.');

            setMessage('تم تحديث حالة الطلب بنجاح ✅');
            await loadOrders();
        } catch (err: any) {
            setError(err?.message || 'حدث خطأ أثناء تحديث الطلب.');
        } finally {
            setActionLoading('');
        }
    };

    const totalSales = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const pendingOrders = orders.filter((order) => order.status === 'Pending').length;
    const completedOrders = orders.filter((order) => order.status === 'Completed').length;

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = orderFilter === 'all' || order.status === orderFilter;
        const matchesSearch = order.id.toLowerCase().includes(orderSearch.toLowerCase()) || order.address.toLowerCase().includes(orderSearch.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
    const recentOrders = [...orders].slice(-5).reverse();

    if (loading || !user || user.email !== OWNER_EMAIL) {
        return <div style={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Inter, sans-serif' }}>Loading Owner Panel...</div>;
    }

    const bg = darkMode ? '#111111' : '#f8fafc';
    const cardBg = darkMode ? '#1e1e1e' : '#ffffff';
    const text = darkMode ? '#ffffff' : '#111111';
    const secondary = darkMode ? '#aaaaaa' : '#64748b';
    const border = darkMode ? '#333333' : '#e2e8f0';
    const inputBg = darkMode ? '#292929' : '#f9f9f9';

    return (
        <div style={{ minHeight: '80vh', background: bg, color: text, padding: '40px 0 100px', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '35px' }}>
                    <div>
                        <p style={{ color: '#DB4444', fontWeight: '700', fontSize: '13px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '1.2px' }}>OWNER EXCLUSIVE DASHBOARD</p>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700', letterSpacing: '-0.5px' }}>Store Management</h1>
                        <p style={{ color: secondary, margin: '6px 0 0', fontSize: '15px' }}>Welcome owner, <strong>{user.username}</strong></p>
                    </div>
                    <button type="button" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: `1.5px solid ${border}`, background: cardBg, color: text, padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                        <ArrowLeft size={16} />
                        Back to Store
                    </button>
                </div>

                {message && <div style={{ padding: '14px 18px', borderRadius: '8px', background: '#e9f8ee', color: '#187a3d', marginBottom: '20px', fontWeight: '500', fontSize: '14px' }}>{message}</div>}
                {error && <div style={{ padding: '14px 18px', borderRadius: '8px', background: '#fff0f0', color: '#c62828', marginBottom: '20px', fontWeight: '500', fontSize: '14px' }}>{error}</div>}

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px', borderBottom: `1px solid ${border}`, paddingBottom: '15px' }}>
                    <AdminTab label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} darkMode={darkMode} />
                    <AdminTab label="Products Management" active={activeTab === 'products'} onClick={() => setActiveTab('products')} darkMode={darkMode} />
                    <AdminTab label="Customer Orders" active={activeTab === 'orders'} onClick={() => { setActiveTab('orders'); setOrderFilter('all'); }} darkMode={darkMode} />
                </div>

                {activeTab === 'dashboard' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                            <StatCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} icon={<DollarSign size={22} color="#0ba360" />} bgLight="#e9f8ee" darkMode={darkMode} onClick={() => { setActiveTab('orders'); setOrderFilter('all'); }} />
                            <StatCard title="Total Orders" value={String(orders.length)} icon={<Package size={22} color="#4e54c8" />} bgLight="#eef0fc" darkMode={darkMode} onClick={() => { setActiveTab('orders'); setOrderFilter('all'); }} />
                            <StatCard title="Pending Orders" value={String(pendingOrders)} icon={<Clock size={22} color="#f59e0b" />} bgLight="#fef3c7" darkMode={darkMode} onClick={() => { setActiveTab('orders'); setOrderFilter('Pending'); }} />
                            <StatCard title="Completed Orders" value={String(completedOrders)} icon={<CheckCircle2 size={22} color="#10b981" />} bgLight="#d1fae5" darkMode={darkMode} onClick={() => { setActiveTab('orders'); setOrderFilter('Completed'); }} />
                            <StatCard title="Total Products" value={String(products.length)} icon={<ShoppingBag size={22} color="#DB4444" />} bgLight="#fff5f5" darkMode={darkMode} onClick={() => setActiveTab('products')} />
                        </div>

                        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '35px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Recent Orders</h3>
                                <button onClick={() => setActiveTab('orders')} style={{ background: 'transparent', border: 'none', color: '#DB4444', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>View All →</button>
                            </div>
                            {recentOrders.length === 0 ? (
                                <p style={{ color: secondary }}>No recent orders found.</p>
                            ) : (
                                recentOrders.map((order) => (
                                    <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${border}`, padding: '12px 0', flexWrap: 'wrap', gap: '10px' }}>
                                        <div>
                                            <strong style={{ fontSize: '15px', display: 'block' }}>Order #{order.id.slice(-8).toUpperCase()}</strong>
                                            <span style={{ fontSize: '13px', color: secondary }}>{order.address}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <span style={{ fontWeight: '700', color: '#DB4444' }}>${order.total.toFixed(2)}</span>
                                            <span style={{ fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', backgroundColor: order.status === 'Completed' ? '#d1fae5' : '#fef3c7', color: order.status === 'Completed' ? '#10b981' : '#f59e0b' }}>{order.status}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'products' && (
                    <>
                        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '35px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <h2 style={{ margin: '0 0 25px', fontSize: '20px', fontWeight: '700' }}>Add New Product</h2>
                            <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                                <AdminInput placeholder="Product name" value={newName} onChange={setNewName} background={inputBg} color={text} border={border} />
                                <AdminInput placeholder="Price ($)" type="number" value={newPrice} onChange={setNewPrice} background={inputBg} color={text} border={border} />
                                <AdminInput placeholder="Category" value={newCategory} onChange={setNewCategory} background={inputBg} color={text} border={border} />
                                <AdminInput placeholder="Image URL" value={newImage} onChange={setNewImage} background={inputBg} color={text} border={border} />
                                <textarea placeholder="Product description..." value={newDescription} onChange={(e) => setNewDescription(e.target.value)} style={{ gridColumn: '1 / -1', minHeight: '100px', resize: 'vertical', background: inputBg, color: text, border: `1.5px solid ${border}`, borderRadius: '8px', padding: '14px 16px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', fontSize: '15px' }} />
                                <button type="submit" disabled={addingProduct} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: addingProduct ? '#999' : '#DB4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 24px', cursor: addingProduct ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '15px' }}>
                                    <Plus size={18} />
                                    {addingProduct ? 'Adding Product...' : 'Add Product'}
                                </button>
                            </form>
                        </div>

                        <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '35px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Products Management ({filteredProducts.length})</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: inputBg, border: `1.5px solid ${border}`, borderRadius: '8px', padding: '8px 14px', width: '280px' }}>
                                    <Search size={18} color={secondary} />
                                    <input type="text" placeholder="Search products..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: text, width: '100%', fontSize: '14px' }} />
                                </div>
                            </div>

                            {loadingProducts ? <p>Loading products...</p> : filteredProducts.map((product) => (
                                <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', border: `1px solid ${border}`, borderRadius: '10px', padding: '16px 20px', marginBottom: '12px', flexWrap: 'wrap', backgroundColor: darkMode ? '#252525' : '#fafafa' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                                        <img src={product.image || 'https://via.placeholder.com/60'} alt={product.name} style={{ width: '55px', height: '55px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#fff', padding: '4px', border: `1px solid ${border}` }} />
                                        <div>
                                            <strong style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>{product.name}</strong>
                                            <p style={{ margin: 0, color: '#DB4444', fontWeight: '700', fontSize: '15px' }}>${product.price}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => openEditModal(product)} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                                            <Edit2 size={16} />
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} disabled={actionLoading === `delete-product-${product.id}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '35px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
                                Customer Orders ({filteredOrders.length}) {orderFilter !== 'all' && <span style={{ fontSize: '14px', color: '#DB4444' }}>(Filter: {orderFilter})</span>}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: inputBg, border: `1.5px solid ${border}`, borderRadius: '8px', padding: '8px 14px', width: '250px' }}>
                                    <Search size={18} color={secondary} />
                                    <input type="text" placeholder="Search orders..." value={orderSearch} onChange={(e) => setOrderSearch(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: text, width: '100%', fontSize: '14px' }} />
                                </div>
                                {orderFilter !== 'all' && (
                                    <button onClick={() => setOrderFilter('all')} style={{ background: 'transparent', border: `1.5px solid ${border}`, color: text, padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                                        Show All
                                    </button>
                                )}
                            </div>
                        </div>

                        {loadingOrders ? <p>Loading orders...</p> : filteredOrders.map((order) => (
                            <div key={order.id} style={{ border: `1.5px solid ${border}`, borderRadius: '10px', padding: '24px', marginBottom: '18px', backgroundColor: darkMode ? '#252525' : '#fafafa' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                                    <strong style={{ fontSize: '16px' }}>Order ID: #{order.id.slice(-8).toUpperCase()}</strong>
                                    <span style={{ fontSize: '17px', fontWeight: '700', color: '#DB4444' }}>Total: ${order.total.toFixed(2)}</span>
                                </div>
                                <p style={{ color: secondary, margin: '6px 0', fontSize: '15px' }}><strong>Shipping Address:</strong> {order.address}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '14px', borderTop: `1px solid ${border}`, flexWrap: 'wrap', gap: '10px' }}>
                                    <span style={{ fontSize: '14px' }}>Status: <strong style={{ color: order.status === 'Completed' ? '#10b981' : '#f59e0b', padding: '4px 10px', borderRadius: '20px', backgroundColor: order.status === 'Completed' ? '#d1fae5' : '#fef3c7', marginLeft: '6px' }}>{order.status}</strong></span>
                                    {order.status === 'Pending' && (
                                        <button onClick={() => handleUpdateOrderStatus(order.id, 'Completed')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#10b981', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                                            <Check size={16} />
                                            Mark as Completed
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editingProduct && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
                    <div style={{ backgroundColor: cardBg, color: text, padding: '35px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', border: `1px solid ${border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Edit Product</h3>
                            <button onClick={() => setEditingProduct(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: secondary }}><X size={22} /></button>
                        </div>
                        <form onSubmit={handleUpdateProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Product Name</label>
                                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required style={{ width: '100%', padding: '12px', backgroundColor: inputBg, color: text, border: `1.5px solid ${border}`, borderRadius: '6px', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Price ($)</label>
                                <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} required style={{ width: '100%', padding: '12px', backgroundColor: inputBg, color: text, border: `1.5px solid ${border}`, borderRadius: '6px', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Category</label>
                                <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: inputBg, color: text, border: `1.5px solid ${border}`, borderRadius: '6px', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>Image URL</label>
                                <input type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: inputBg, color: text, border: `1.5px solid ${border}`, borderRadius: '6px', outline: 'none' }} />
                            </div>
                            <button type="submit" style={{ backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', marginTop: '10px', fontSize: '15px' }}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function AdminTab({ label, active, onClick, darkMode }: { label: string; active: boolean; onClick: () => void; darkMode: boolean }) {
    return (
        <button onClick={onClick} style={{ padding: '12px 24px', borderRadius: '8px', border: active ? 'none' : `1.5px solid ${darkMode ? '#444' : '#cbd5e1'}`, backgroundColor: active ? '#DB4444' : 'transparent', color: active ? '#fff' : (darkMode ? '#fff' : '#334155'), cursor: 'pointer', fontWeight: '700', fontSize: '14px', transition: 'all 0.2s' }}>
            {label}
        </button>
    );
}

function StatCard({ title, value, icon, bgLight, darkMode, onClick }: { title: string; value: string; icon: React.ReactNode; bgLight: string; darkMode: boolean; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            style={{
                border: `1.5px solid ${darkMode ? '#333' : '#e2e8f0'}`,
                borderRadius: '12px',
                padding: '24px',
                background: darkMode ? '#1e1e1e' : '#fff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
            }}
        >
            <div style={{ width: '45px', height: '45px', borderRadius: '10px', backgroundColor: darkMode ? '#2a2a2a' : bgLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div>
                <p style={{ margin: '0 0 4px', color: darkMode ? '#aaa' : '#64748b', fontSize: '13px', fontWeight: '600' }}>{title}</p>
                <strong style={{ fontSize: '24px', fontWeight: '700', color: darkMode ? '#fff' : '#0f172a' }}>{value}</strong>
            </div>
        </div>
    );
}

function AdminInput({ placeholder, value, onChange, type = 'text', background, color, border }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string; background: string; color: string; border: string }) {
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} style={{ background, color, border: `1.5px solid ${border}`, borderRadius: '8px', padding: '14px 16px', outline: 'none', width: '100%', boxSizing: 'border-box', fontSize: '15px', fontWeight: '500' }} />
    );
}