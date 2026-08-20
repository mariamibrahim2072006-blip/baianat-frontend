// src/components/ExploreProducts.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

// مكون الـ Skeleton للتحميل الاحترافي
const SkeletonCard = ({ darkMode }: { darkMode: boolean }) => (
    <div style={{
        height: '350px',
        backgroundColor: darkMode ? '#333' : '#e0e0e0',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite'
    }}></div>
);

export default function ExploreProducts() {
    const {
        addToCart,
        addToWishlist,
        wishlist,
        darkMode,
        products,
        productsLoading,
        searchTerm,
    } = useShop();

    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === 'all' ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim());

        return matchesCategory && matchesSearch;
    });

    return (
        <section
            style={{
                marginTop: '80px',
                marginBottom: '80px',
                padding: '0 50px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '20px',
                }}
            >
                <div
                    style={{
                        width: '20px',
                        height: '40px',
                        backgroundColor: '#DB4444',
                        borderRadius: '4px',
                    }}
                />

                <span
                    style={{
                        color: '#DB4444',
                        fontWeight: '600',
                        fontSize: '16px',
                    }}
                >
                    Our Products
                </span>
            </div>

            <h2
                style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    margin: '0 0 30px 0',
                    color: darkMode ? '#fff' : '#000',
                }}
            >
                Explore Our Products
            </h2>

            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '40px',
                    flexWrap: 'wrap',
                }}
            >
                {[
                    ['all', 'All'],
                    ['electronics', 'Electronics'],
                    ['furniture', 'Furniture'],
                    ['animals', 'Animals'],
                    ['clothing', 'Clothing'],
                    ['bags', 'Bags'],
                ].map(([value, label]) => (
                    <button
                        key={value}
                        onClick={() =>
                            setSelectedCategory(value)
                        }
                        style={{
                            padding: '10px 20px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            backgroundColor:
                                selectedCategory === value
                                    ? '#DB4444'
                                    : '#fff',
                            color:
                                selectedCategory === value
                                    ? '#fff'
                                    : '#000',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* تم تحويل الـ Grid ليكون Responsive باستخدام auto-fit */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                    gap: '30px',
                }}
            >
                {productsLoading
                    ? [...Array(8)].map((_, i) => <SkeletonCard key={i} darkMode={darkMode} />)
                    : filteredProducts.map((product) => {
                        const isWishlisted = wishlist.some(
                            (item) =>
                                String(item.id) === String(product.id)
                        );

                        return (
                            <div
                                key={product.id}
                                style={{
                                    position: 'relative',
                                }}
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor:
                                                darkMode
                                                    ? '#1E1E1E'
                                                    : '#F5F5F5',
                                            height: '250px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {/* إضافة Lazy Loading هنا للسرعة */}
                                        <img
                                            src={
                                                product.image && product.image.trim() !== ''
                                                    ? product.image
                                                    : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
                                            }
                                            alt={product.name}
                                            loading="lazy"
                                            style={{
                                                width: '150px',
                                                height: '140px',
                                                objectFit: 'contain',
                                            }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';
                                            }}
                                        />
                                    </div>
                                </Link>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToWishlist(
                                            product
                                        );
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '34px',
                                        height: '34px',
                                        cursor: 'pointer',
                                        backgroundColor:
                                            isWishlisted
                                                ? '#DB4444'
                                                : '#fff',
                                    }}
                                >
                                    {isWishlisted
                                        ? '❤️'
                                        : '♡'}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(
                                            product
                                        );
                                    }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '80px',
                                        width: '100%',
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '12px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Add To Cart
                                </button>

                                <Link
                                    to={`/product/${product.id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: darkMode
                                            ? '#fff'
                                            : '#000',
                                    }}
                                >
                                    <div
                                        style={{
                                            marginTop: '16px',
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                margin: '0 0 8px 0',
                                            }}
                                        >
                                            {product.name}
                                        </h3>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: '#FFAD33',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                ★{' '}
                                                {product.rating}
                                            </span>

                                            <span
                                                style={{
                                                    color: '#808080',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                ({product.reviews})
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
            </div>

            {/* الأنيميشن الخاص بالتحميل */}
            <style>{`
                @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
            `}</style>
        </section>
    );
}