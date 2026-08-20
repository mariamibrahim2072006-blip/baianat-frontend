// src/pages/ProductDetails.tsx
import { useState, useEffect } from 'react';
import {
    Link,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { useShop, type ProductItem } from '../context/ShopContext';
import { Heart, Eye, Star } from 'lucide-react';

type ProductDetailsParams = {
    id: string;
};

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

type Review = {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        username: string;
    };
};

const API_URL = 'http://localhost:5000/api';

export default function ProductDetails() {
    const { id } = useParams<ProductDetailsParams>();

    const {
        addToCart,
        addToWishlist,
        wishlist,
        products,
        productsLoading,
        darkMode,
    } = useShop();

    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState<Size>('M');

    // حالات التعليقات والتقييمات
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewMessage, setReviewMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const navigate = useNavigate();

    const product: ProductItem | undefined = products.find(
        (item) => String(item.id) === id
    );

    // جلب التعليقات والتقييمات الخاصة بالمنتج عند تحميل الصفحة
    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/products/${id}/reviews`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setReviews(data);
                    }
                })
                .catch((err) => console.error('Error fetching reviews:', err));
        }
    }, [id]);

    // إرسال تعليق وتقييم جديد (مشروط بالشراء في السيرفر)
    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setSubmittingReview(true);
        setReviewMessage(null);

        try {
            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    productId: id,
                    rating: newRating,
                    comment: newComment,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'حدث خطأ أثناء إضافة التعليق');
            }

            setReviewMessage({ text: 'تم إضافة تعليقك بنجاح! ⭐', type: 'success' });
            setNewComment('');
            setNewRating(5);

            // إعادة جلب التعليقات لتحديث القائمة فوراً
            const res = await fetch(`${API_URL}/products/${id}/reviews`);
            const updatedReviews = await res.json();
            if (Array.isArray(updatedReviews)) {
                setReviews(updatedReviews);
            }
        } catch (error) {
            setReviewMessage({
                text: error instanceof Error ? error.message : 'يجب شراء المنتج وتسجيل الدخول أولاً لإضافة تعليق!',
                type: 'error'
            });
        } finally {
            setSubmittingReview(false);
        }
    };

    const formatPrice = (price: number) => {
        return `$${Number(price).toFixed(2).replace('.00', '')}`;
    };

    const relatedProducts = (() => {
        if (!product) return [];
        const sameCategory = products.filter(
            (item) => String(item.id) !== id && item.category === product.category
        );
        if (sameCategory.length >= 4) {
            return sameCategory.slice(0, 4);
        }
        const others = products.filter(
            (item) => String(item.id) !== id && item.category !== product.category
        );
        return [...sameCategory, ...others].slice(0, 4);
    })();

    if (productsLoading) {
        return (
            <div style={{ padding: '100px 50px', textAlign: 'center', fontSize: '18px', color: '#555' }}>
                جارٍ تحميل تفاصيل المنتج...
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ padding: '100px 50px', textAlign: 'center', fontSize: '18px', color: '#555' }}>
                <h2>عذراً، لم يتم العثور على المنتج</h2>
                <Link to="/" style={{ color: '#DB4444', textDecoration: 'none', fontWeight: '600', marginTop: '20px', display: 'inline-block' }}>
                    العودة للصفحة الرئيسية
                </Link>
            </div>
        );
    }

    const isWishlisted = wishlist.some(
        (item) => String(item.id) === String(product.id)
    );

    const isClothing = product.category?.toLowerCase() === 'clothing';

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: qty,
            selectedSize: isClothing ? selectedSize : undefined,
        });
    };

    const handleBuyNow = () => {
        addToCart({
            ...product,
            quantity: qty,
            selectedSize: isClothing ? selectedSize : undefined,
        });
        navigate('/cart');
    };

    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : (Number(product.rating) || 0);

    const totalReviewsCount = reviews.length > 0 ? reviews.length : (Number(product.reviews) || 0);
    const availableSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <div style={{ marginTop: '40px', marginBottom: '100px', padding: '0 50px', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ fontSize: '14px', color: '#808080', marginBottom: '40px' }}>
                <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>الرئيسية</Link>
                {' / '}
                <span>{product.name}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }}>
                <div style={{ backgroundColor: '#F5F5F5', height: '480px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={product.image} alt={product.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                </div>

                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px' }}>{product.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '24px', fontWeight: '600', color: '#DB4444' }}>{formatPrice(product.price)}</span>
                        {product.oldPrice && (
                            <span style={{ color: '#808080', textDecoration: 'line-through' }}>{formatPrice(product.oldPrice)}</span>
                        )}
                    </div>

                    <p style={{ marginBottom: '24px', color: '#555', lineHeight: '1.6' }}>{product.description || "لا يوجد وصف لهذا المنتج."}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <span style={{ color: '#FFAD33', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={16} fill="#FFAD33" />
                            <strong>{avgRating}</strong>
                        </span>
                        <span style={{ color: '#808080' }}>
                            ({totalReviewsCount} تعليق)
                        </span>
                    </div>

                    {isClothing && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                            <span style={{ fontSize: '16px', fontWeight: '500' }}>المقاس:</span>
                            {availableSizes.map((size: Size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    style={{
                                        width: '34px',
                                        height: '34px',
                                        border: selectedSize === size ? 'none' : '1px solid #ccc',
                                        backgroundColor: selectedSize === size ? '#DB4444' : '#fff',
                                        color: selectedSize === size ? '#fff' : '#000',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '40px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>-</button>
                            <div style={{ width: '50px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '16px' }}>{qty}</div>
                            <button onClick={() => setQty(qty + 1)} style={{ width: '40px', height: '44px', border: 'none', backgroundColor: '#DB4444', color: '#fff', cursor: 'pointer', fontSize: '18px' }}>+</button>
                        </div>

                        <button onClick={handleAddToCart} style={{ backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '0 36px', height: '44px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}>أضف للسلة</button>
                        <button onClick={handleBuyNow} style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '0 36px', height: '44px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}>Buy Now</button>
                        <button onClick={() => addToWishlist(product)} style={{ width: '44px', height: '44px', border: '1px solid #ccc', backgroundColor: isWishlisted ? '#DB4444' : '#fff', color: isWishlisted ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>{isWishlisted ? '❤️' : '♡'}</button>
                    </div>
                </div>
            </div>

            {/* ================= قسم التعليقات والتقييمات (Customer Comments) ================= */}
            <div style={{ marginTop: '60px', marginBottom: '60px', borderTop: '1px solid #e5e5e5', paddingTop: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '25px', color: '#111' }}>Customer Comments & Reviews 💬</h3>

                {/* فورم كتابة تعليق */}
                <form onSubmit={handleReviewSubmit} style={{ backgroundColor: '#fafafa', padding: '25px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '35px', maxWidth: '600px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Leave a Comment</h4>

                    {reviewMessage && (
                        <div style={{
                            padding: '10px 15px',
                            borderRadius: '4px',
                            marginBottom: '15px',
                            backgroundColor: reviewMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                            color: reviewMessage.type === 'success' ? '#155724' : '#721c24',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            {reviewMessage.text}
                        </div>
                    )}

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Rating:</label>
                        <select
                            value={newRating}
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '150px', backgroundColor: '#fff', fontWeight: '600' }}
                        >
                            <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                            <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                            <option value={3}>⭐⭐⭐ (3/5)</option>
                            <option value={2}>⭐⭐ (2/5)</option>
                            <option value={1}>⭐ (1/5)</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>Your Comment:</label>
                        <textarea
                            rows={3}
                            placeholder="شاركنا تعليقك على المنتج (متاحة لمن اشتروا المنتج فقط)..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none', backgroundColor: '#fff' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submittingReview}
                        style={{ backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', opacity: submittingReview ? 0.7 : 1 }}
                    >
                        {submittingReview ? 'Submitting...' : 'Post Comment'}
                    </button>
                </form>

                {/* عرض قائمة التعليقات */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '800px' }}>
                    {reviews.length === 0 ? (
                        <p style={{ color: '#777', fontStyle: 'italic' }}>لا توجد تعليقات لهذا المنتج حتى الآن.</p>
                    ) : (
                        reviews.map((rev) => (
                            <div key={rev.id} style={{ padding: '15px 20px', borderRadius: '6px', border: '1px solid #e5e5e5', backgroundColor: '#fff' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <strong style={{ fontSize: '15px', color: '#222' }}>{rev.user?.username || 'مستخدم'}</strong>
                                    <span style={{ color: '#FFAD33', fontSize: '14px' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                                </div>
                                <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>{rev.comment}</p>
                                <span style={{ display: 'block', fontSize: '11px', color: '#999', marginTop: '8px' }}>
                                    {new Date(rev.createdAt).toLocaleDateString('ar-EG')}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ================= قسم الاقتراحات (Related Items) ================= */}
            <div style={{ marginTop: '80px', borderTop: '1px solid #e5e5e5', paddingTop: '50px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                    <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }}></div>
                    <h3 style={{ color: '#DB4444', fontWeight: '600', fontSize: '18px', margin: 0 }}>Related Items</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
                    {relatedProducts.map((item) => {
                        const itemWishlisted = wishlist.some((w) => String(w.id) === String(item.id));
                        return (
                            <div key={item.id} className="group" style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: darkMode ? '#1e1e1e' : '#fff', border: '1px solid #eee', padding: '15px' }}>
                                <div style={{ height: '220px', backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '4px', marginBottom: '15px' }}>
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
                                        <button
                                            onClick={() => addToWishlist(item)}
                                            style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        >
                                            <Heart size={16} color={itemWishlisted ? '#DB4444' : '#000'} fill={itemWishlisted ? '#DB4444' : 'none'} />
                                        </button>
                                        <Link
                                            to={`/product/${item.id}`}
                                            style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000' }}
                                        >
                                            <Eye size={16} />
                                        </Link>
                                    </div>

                                    <Link to={`/product/${item.id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={item.image} alt={item.name} style={{ maxHeight: '160px', objectFit: 'contain' }} />
                                    </Link>
                                </div>

                                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: '500', margin: '0 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.name}
                                    </h4>
                                </Link>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '15px' }}>
                                        {formatPrice(item.price)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}