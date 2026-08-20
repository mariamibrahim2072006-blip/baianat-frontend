// src/components/FlashSales.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useShop, type ProductItem } from '../context/ShopContext';
import 'swiper/css';

const FlashSales: React.FC = () => {
    const { products, addToCart, addToWishlist, wishlist } = useShop();
    const swiperRef = useRef<SwiperType | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [timeLeft] = useState({ days: '03', hours: '23', minutes: '19', seconds: '56' });

    const formatPrice = (price: number) => {
        return `$${Number(price).toFixed(2).replace('.00', '')}`;
    };

    const handleAddToCart = (product: ProductItem) => {
        addToCart(product);
    };

    return (
        <section style={{ padding: '80px 5%', borderBottom: '1px solid #e5e5e5' }}>
            {/* الهيدر، العداد، وأزرار التنقل */}
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                marginBottom: '40px',
                gap: '20px'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }}></div>
                        <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>Today's</span>
                    </div>
                    <h2 style={{ fontSize: '36px', fontWeight: '600', margin: 0 }}>Flash Sales</h2>
                </div>

                {/* العداد */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {Object.entries(timeLeft).map(([key, value], index) => (
                        <React.Fragment key={key}>
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#000', fontWeight: '500', display: 'block', marginBottom: '4px' }}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </span>
                                <span style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: '1' }}>{value}</span>
                            </div>
                            {index < 3 && <span style={{ color: '#DB4444', fontSize: '24px', fontWeight: 'bold', marginTop: '15px' }}>:</span>}
                        </React.Fragment>
                    ))}
                </div>

                {/* أزرار التحريك */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        style={{ width: '46px', height: '46px', borderRadius: '50%', border: 'none', backgroundColor: '#F5F5F5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
                    >
                        &larr;
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        style={{ width: '46px', height: '46px', borderRadius: '50%', border: 'none', backgroundColor: '#F5F5F5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}
                    >
                        &rarr;
                    </button>
                </div>
            </div>

            {/* السلايدر */}
            <Swiper
                spaceBetween={30}
                slidesPerView={isMobile ? 1.5 : 4}
                onSwiper={(swiper: SwiperType) => { swiperRef.current = swiper; }}
            >
                {products.map((product: ProductItem) => {
                    const isWishlisted = wishlist.some((item) => String(item.id) === String(product.id));

                    return (
                        <SwiperSlide key={product.id}>
                            <div className="group" style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '250px', backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '4px' }}>

                                    <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#DB4444', color: '#fff', fontSize: '12px', padding: '4px 12px', borderRadius: '4px' }}>
                                        -40%
                                    </span>

                                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <button
                                            onClick={() => addToWishlist(product)}
                                            style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                        >
                                            <Heart size={18} color={isWishlisted ? '#DB4444' : '#000'} fill={isWishlisted ? '#DB4444' : 'none'} />
                                        </button>
                                        <Link
                                            to={`/product/${product.id}`}
                                            style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000' }}
                                        >
                                            <Eye size={18} />
                                        </Link>
                                    </div>

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{ height: '170px', objectFit: 'contain' }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23888" font-family="sans-serif" font-size="14">No Image</text></svg>';
                                        }}
                                    />

                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            backgroundColor: '#000',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '10px 0',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            opacity: isMobile ? 1 : 0,
                                            transition: 'opacity 0.3s ease'
                                        }}
                                        className="cart-hover-btn"
                                    >
                                        <ShoppingCart size={18} /> Add To Cart
                                    </button>
                                </div>

                                <div style={{ padding: '12px 0' }}>
                                    <h4 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {product.name}
                                    </h4>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.oldPrice && (
                                            <span style={{ color: '#999', textDecoration: 'line-through', fontWeight: '500', fontSize: '15px' }}>
                                                {formatPrice(product.oldPrice)}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ display: 'flex', color: '#FFAD33' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={15} fill="currentColor" />
                                            ))}
                                        </div>
                                        <span style={{ color: '#999', fontSize: '14px', fontWeight: '600' }}>(88)</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Link
                    to="/products"
                    style={{ backgroundColor: '#DB4444', color: '#fff', padding: '16px 48px', borderRadius: '4px', textDecoration: 'none', fontWeight: '500', display: 'inline-block' }}
                >
                    View All Products
                </Link>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .group:hover .cart-hover-btn {
                        opacity: 1 !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default FlashSales;