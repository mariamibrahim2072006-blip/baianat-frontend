// src/components/BestSelling.tsx
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useShop, type ProductItem } from '../context/ShopContext';

export default function BestSelling() {
  const {
    products,
    productsLoading,
    addToCart,
    addToWishlist,
    wishlist,
    darkMode,
  } = useShop();

  const bestSellingIds = [201, 202, 203, 204];
  let productsToShow = products.filter((product) =>
    bestSellingIds.includes(Number(product.id))
  );

  if (productsToShow.length === 0) {
    productsToShow = products.slice(0, 4);
  }

  const formatPrice = (price: number) => {
    return `$${Number(price).toFixed(2).replace('.00', '')}`;
  };

  // الإضافة للسلة بدون تنقل إجباري
  const handleAddToCart = (product: ProductItem) => {
    addToCart(product);
  };

  if (productsLoading) {
    return (
      <section style={{ padding: '60px 5%' }}>
        <div style={{ textAlign: 'center', color: '#777' }}>جاري تحميل المنتجات الأكثر مبيعاً...</div>
      </section>
    );
  }

  return (
    <section style={{ padding: '60px 5%', borderBottom: '1px solid #e5e5e5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }} />
            <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>This Month</span>
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '600', margin: 0, color: darkMode ? '#fff' : '#000' }}>
            Best Selling Products
          </h2>
        </div>

        {/* تم تعديل الرابط هنا لينقل لصفحة المنتجات بنجاح */}
        <Link
          to="/products"
          style={{
            backgroundColor: '#DB4444',
            color: '#fff',
            padding: '12px 30px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          View All
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
        {productsToShow.map((product) => {
          const isWishlisted = wishlist.some((item) => String(item.id) === String(product.id));
          const rating = Number(product.rating ?? 5);

          return (
            <div key={product.id} className="group" style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>

              <div style={{ height: '250px', backgroundColor: darkMode ? '#1E1E1E' : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '4px' }}>

                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
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

                <Link to={`/product/${product.id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '160px', height: '160px', objectFit: 'contain' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                </Link>

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
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 10
                  }}
                  className="cart-hover-btn"
                >
                  <ShoppingCart size={18} /> Add To Cart
                </button>
              </div>

              <div style={{ padding: '12px 0', color: darkMode ? '#fff' : '#000' }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                  </h4>
                </Link>

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
                      <Star key={i} size={15} fill={i < Math.round(rating) ? "currentColor" : "none"} color={i < Math.round(rating) ? "#FFAD33" : "#ccc"} />
                    ))}
                  </div>
                  <span style={{ color: '#999', fontSize: '14px', fontWeight: '600' }}>
                    ({product.reviews ?? 65})
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <style>{`
        .group:hover .cart-hover-btn {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}