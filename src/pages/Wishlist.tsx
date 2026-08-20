import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Wishlist() {
    const { wishlist, removeFromWishlist, addToCart } = useShop();
    const navigate = useNavigate();

    // طباعة محتوى المفضلة للتأكد في الكونسول
    console.log("Current Wishlist Items:", wishlist);

    const handleMoveToCart = (item: any) => {
        addToCart(item);
        removeFromWishlist(item.id);
    };

    if (wishlist.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Your Wishlist is Empty ❤️</h2>
                <p style={{ color: '#666', marginBottom: '24px' }}>You haven't added any products to your wishlist yet.</p>
                <Link to="/" style={{ display: 'inline-block', backgroundColor: '#DB4444', color: '#fff', padding: '14px 40px', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}>
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '40px', marginBottom: '100px', padding: '0 50px' }}>
            <div style={{ fontSize: '14px', color: '#808080', marginBottom: '40px' }}>
                <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#000' }}>Wishlist</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Wishlist ({wishlist.length})</h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '30px'
            }}>
                {wishlist.map((item: any) => (
                    <div key={item.id} style={{ position: 'relative' }}>
                        {/* زر حذف من المفضلة */}
                        <button
                            onClick={() => removeFromWishlist(item.id)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '34px',
                                height: '34px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                zIndex: 2,
                                color: '#DB4444',
                                fontSize: '16px'
                            }}
                        >
                            ✕
                        </button>

                        <div
                            style={{ backgroundColor: '#F5F5F5', height: '250px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            onClick={() => navigate(`/product/${item.id}`)}
                        >
                            <img 
                                src={item.image} 
                                alt={item.name || item.title} 
                                style={{ width: '150px', height: '140px', objectFit: 'contain' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/150?text=No+Image';
                                }}
                            />
                        </div>

                        {/* زر نقل للسلة */}
                        <button
                            onClick={() => handleMoveToCart(item)}
                            style={{
                                width: '100%',
                                backgroundColor: '#000',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 0',
                                borderRadius: '0 0 4px 4px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            🛒 Add To Cart
                        </button>

                        <div style={{ marginTop: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
                                {(item.name || item.title)?.slice(0, 20)}...
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ color: '#DB4444', fontWeight: '600' }}>${item.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}