import { useShop } from '../context/ShopContext';

export default function Wishlist() {
    const { wishlist, removeFromWishlist, addToCart } = useShop();

    return (
        <div style={{ marginTop: '50px', marginBottom: '100px' }}>
            {/* Wishlist Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '500', margin: 0 }}>Wishlist ({wishlist.length})</h2>
            </div>

            {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <h3>Your wishlist is empty! ♡</h3>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '30px', marginBottom: '80px' }}>
                    {wishlist.map((item) => (
                        <div key={item.id}>
                            <div style={{
                                backgroundColor: '#F5F5F5',
                                height: '250px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {item.discount && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '12px',
                                        backgroundColor: '#DB4444',
                                        color: '#fff',
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                    }}>{item.discount}</span>
                                )}

                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        border: 'none',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        width: '34px',
                                        height: '34px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    🗑️
                                </button>

                                <img src={item.image} alt={item.name} style={{ width: '150px', height: '140px', objectFit: 'contain' }} />

                                <button
                                    onClick={() => addToCart(item)}
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🛒 Add To Cart
                                </button>
                            </div>

                            <div style={{ marginTop: '16px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>{item.name}</h3>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <span style={{ color: '#DB4444', fontWeight: '600' }}>${item.price}</span>
                                    {item.oldPrice && (
                                        <span style={{ color: '#808080', textDecoration: 'line-through' }}>${item.oldPrice}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}