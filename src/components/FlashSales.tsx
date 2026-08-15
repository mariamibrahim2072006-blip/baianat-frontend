import { useShop } from '../context/ShopContext';

export default function FlashSales() {
    const { addToCart, addToWishlist, wishlist, searchTerm, darkMode } = useShop();

    const products = [
        {
            id: 101,
            name: 'HAVIT HV-G92 Gamepad',
            price: 120,
            oldPrice: 160,
            discount: '-40%',
            rating: '★★★★★',
            reviews: '(88)',
            image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400&q=80',
        },
        {
            id: 102,
            name: 'AK-900 Wired Keyboard',
            price: 960,
            oldPrice: 1160,
            discount: '-35%',
            rating: '★★★★☆',
            reviews: '(75)',
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
        },
        {
            id: 103,
            name: 'IPS LCD Gaming Monitor',
            price: 370,
            oldPrice: 400,
            discount: '-30%',
            rating: '★★★★★',
            reviews: '(99)',
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
        },
        {
            id: 104,
            name: 'S-Series Comfort Chair',
            price: 375,
            oldPrice: 400,
            discount: '-25%',
            rating: '★★★★☆',
            reviews: '(99)',
            image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=400&q=80',
        },
    ];

    // فلترة المنتجات حسب شريط البحث
    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    return (
        <section style={{ marginTop: '80px', marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }}></div>
                <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>Today's</span>
            </div>

            <h2 style={{ fontSize: '36px', fontWeight: '600', margin: '0 0 30px 0', color: darkMode ? '#fff' : '#000' }}>Flash Sales</h2>

            {filteredProducts.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px 0', color: '#888', fontSize: '16px' }}>No products match your search.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '30px' }}>
                    {filteredProducts.map((product) => {
                        const isWishlisted = wishlist.some((item) => item.id === product.id);

                        return (
                            <div key={product.id}>
                                <div style={{
                                    backgroundColor: darkMode ? '#1E1E1E' : '#F5F5F5',
                                    height: '250px',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '12px',
                                        backgroundColor: '#DB4444',
                                        color: '#fff',
                                        padding: '4px 12px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        zIndex: 2
                                    }}>
                                        {product.discount}
                                    </span>

                                    {/* Wishlist Button */}
                                    <button
                                        type="button"
                                        onClick={() => addToWishlist(product)}
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            backgroundColor: isWishlisted ? '#DB4444' : (darkMode ? '#333' : '#fff'),
                                            color: isWishlisted ? '#fff' : (darkMode ? '#fff' : '#000'),
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '34px',
                                            height: '34px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '16px',
                                            zIndex: 10,
                                            transition: '0.2s'
                                        }}
                                    >
                                        {isWishlisted ? '❤️' : '♡'}
                                    </button>

                                    <img src={product.image} alt={product.name} style={{ width: '150px', height: '140px', objectFit: 'contain' }} />

                                    {/* Add To Cart Button */}
                                    <button
                                        type="button"
                                        onClick={() => addToCart(product)}
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            width: '100%',
                                            backgroundColor: '#000',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '12px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            zIndex: 10
                                        }}
                                    >
                                        Add To Cart
                                    </button>
                                </div>

                                <div style={{ marginTop: '16px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: darkMode ? '#fff' : '#000' }}>{product.name}</h3>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ color: '#DB4444', fontWeight: '600' }}>${product.price}</span>
                                        <span style={{ color: '#808080', textDecoration: 'line-through' }}>${product.oldPrice}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ color: '#FFAD33', fontSize: '14px' }}>{product.rating}</span>
                                        <span style={{ color: '#808080', fontSize: '14px', fontWeight: '600' }}>{product.reviews}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}