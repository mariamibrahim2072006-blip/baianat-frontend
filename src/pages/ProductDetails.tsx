import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart, addToWishlist, wishlist } = useShop();
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');

    const product = {
        id: Number(id) || 101,
        name: 'Havic HV G-92 Gamepad',
        price: 192.00,
        rating: '★★★★★',
        reviews: '(150 Reviews)',
        stock: 'In Stock',
        description: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
        image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80'
    };

    const isWishlisted = wishlist.some(i => i.id === product.id);

    return (
        <div style={{ marginTop: '40px', marginBottom: '100px' }}>
            <div style={{ fontSize: '14px', color: '#808080', marginBottom: '40px' }}>
                <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#000' }}>{product.name}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center' }}>
                {/* Product Image */}
                <div style={{ backgroundColor: '#F5F5F5', height: '480px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={product.image} alt={product.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                </div>

                {/* Product Meta */}
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>{product.name}</h1>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', fontSize: '14px' }}>
                        <span style={{ color: '#FFAD33' }}>{product.rating}</span>
                        <span style={{ color: '#808080' }}>{product.reviews}</span>
                        <span style={{ color: '#808080' }}>|</span>
                        <span style={{ color: '#00FF66', fontWeight: '500' }}>{product.stock}</span>
                    </div>

                    <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>${product.price.toFixed(2)}</div>
                    <p style={{ color: '#333', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                        {product.description}
                    </p>

                    {/* Size Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <span style={{ fontSize: '16px' }}>Size:</span>
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
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
                                    fontWeight: '500'
                                }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Quantity & Actions */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: '40px', height: '44px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>-</button>
                            <div style={{ width: '50px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>{qty}</div>
                            <button onClick={() => setQty(qty + 1)} style={{ width: '40px', height: '44px', border: 'none', backgroundColor: '#DB4444', color: '#fff', cursor: 'pointer', fontSize: '18px' }}>+</button>
                        </div>

                        <button
                            onClick={() => addToCart({ ...product, quantity: qty })}
                            style={{ backgroundColor: '#DB4444', color: '#fff', border: 'none', padding: '0 36px', height: '44px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                        >
                            Buy Now
                        </button>

                        <button
                            onClick={() => addToWishlist(product)}
                            style={{ width: '44px', height: '44px', border: '1px solid #ccc', backgroundColor: isWishlisted ? '#DB4444' : '#fff', color: isWishlisted ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}
                        >
                            {isWishlisted ? '❤️' : '♡'}
                        </button>
                    </div>

                    {/* Delivery Box */}
                    <div style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid #ccc' }}>
                            <span style={{ fontSize: '24px' }}>🚚</span>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '15px' }}>Free Delivery</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Enter your postal code for Delivery Availability</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                            <span style={{ fontSize: '24px' }}>🔄</span>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '15px' }}>Return Delivery</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Free 30 Days Delivery Returns. Details</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}