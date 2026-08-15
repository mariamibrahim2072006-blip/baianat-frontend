import coatImg from '../assets/coat.png';
import bagImg from '../assets/bag.png';
import coolerImg from '../assets/cooler.png';
import bookshelfImg from '../assets/bookshelf.png';

export default function BestSelling() {
  const products = [
    { id: 1, name: 'The north coat', price: '$260', oldPrice: '$360', rating: '★★★★★', reviews: '(65)', image: coatImg },
    { id: 2, name: 'Gucci duffle bag', price: '$960', oldPrice: '$1160', rating: '★★★★★', reviews: '(65)', image: bagImg },
    { id: 3, name: 'RGB liquid CPU Cooler', price: '$160', oldPrice: '$170', rating: '★★★★.5', reviews: '(65)', image: coolerImg },
    { id: 4, name: 'Small BookShelf', price: '$360', oldPrice: '', rating: '★★★★★', reviews: '(65)', image: bookshelfImg },
  ];

  return (
    <div style={{ marginTop: '80px', marginBottom: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }}></div>
        <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>This Month</span>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: '20px', 
        marginBottom: '60px' 
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: '600', margin: 0 }}>Best Selling Products</h2>
        <button style={{
          backgroundColor: '#DB4444',
          color: '#fff',
          border: 'none',
          padding: '16px 48px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          View All
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
        gap: '30px' 
      }}>
        {products.map((item) => (
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
              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{ border: 'none', backgroundColor: '#fff', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}>♡</button>
                <button style={{ border: 'none', backgroundColor: '#fff', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}>👁</button>
              </div>

              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '160px', height: '140px', objectFit: 'contain' }} 
              />
            </div>

            <div style={{ marginTop: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>{item.name}</h3>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#DB4444', fontWeight: '600' }}>{item.price}</span>
                {item.oldPrice && (
                  <span style={{ color: '#808080', textDecoration: 'line-through' }}>{item.oldPrice}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#FFAD33', fontSize: '14px' }}>{item.rating}</span>
                <span style={{ color: '#808080', fontSize: '14px', fontWeight: '600' }}>{item.reviews}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}