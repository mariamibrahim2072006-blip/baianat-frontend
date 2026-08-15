import dogFoodImg from '../assets/dog-food.png';
import cameraImg from '../assets/canon-camera.png';
import laptopImg from '../assets/laptop.png';
const curologyImg = "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80";
import carImg from '../assets/car.png';
import shoesImg from '../assets/shoes.png';
import controllerImg from '../assets/controller.png';
import jacketImg from '../assets/jacket.png';

export default function ExploreProducts() {
    const products = [
        { id: 1, name: 'Breed Dry Dog Food', price: '$100', rating: '★★★☆☆', reviews: '(35)', isNew: false, image: dogFoodImg },
        { id: 2, name: 'CANON EOS DSLR Camera', price: '$360', rating: '★★★★☆', reviews: '(95)', isNew: false, hasCart: true, image: cameraImg },
        { id: 3, name: 'ASUS FHD Gaming Laptop', price: '$700', rating: '★★★★★', reviews: '(325)', isNew: false, image: laptopImg },
        { id: 4, name: 'Curology Product Set', price: '$500', rating: '★★★★☆', reviews: '(145)', isNew: false, image: curologyImg },
        { id: 5, name: 'Kids Electric Car', price: '$960', rating: '★★★★★', reviews: '(65)', isNew: true, colors: ['#FB1314', '#DB4444'], image: carImg },
        { id: 6, name: 'Jr. Zoom Soccer Cleats', price: '$1160', rating: '★★★★★', reviews: '(35)', isNew: false, colors: ['#EEFF61', '#DB4444'], image: shoesImg },
        { id: 7, name: 'GP11 Shooter USB Gamepad', price: '$660', rating: '★★★★.5', reviews: '(55)', isNew: true, colors: ['#000', '#DB4444'], image: controllerImg },
        { id: 8, name: 'Quilted Satin Jacket', price: '$660', rating: '★★★★.5', reviews: '(55)', isNew: false, colors: ['#184A48', '#DB4444'], image: jacketImg },
    ];

    return (
        <div style={{ marginTop: '70px', marginBottom: '80px' }}>
            {/* Red Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }}></div>
                <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>Our Products</span>
            </div>

            {/* Header & Arrows */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px',
                marginBottom: '50px'
            }}>
                <h2 style={{ fontSize: '36px', fontWeight: '600', margin: 0 }}>Explore Our Products</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ width: '46px', height: '46px', borderRadius: '50%', border: 'none', backgroundColor: '#F5F5F5', cursor: 'pointer', fontSize: '18px' }}>&larr;</button>
                    <button style={{ width: '46px', height: '46px', borderRadius: '50%', border: 'none', backgroundColor: '#F5F5F5', cursor: 'pointer', fontSize: '18px' }}>&rarr;</button>
                </div>
            </div>

            {/* Products Grid (8 Items) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '30px'
            }}>
                {products.map((item) => (
                    <div key={item.id}>
                        {/* Image Box */}
                        <div style={{
                            backgroundColor: '#F5F5F5',
                            height: '250px',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {item.isNew && (
                                <span style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    backgroundColor: '#00FF66',
                                    color: '#fff',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>NEW</span>
                            )}

                            {/* Action Icons */}
                            <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button style={{ border: 'none', backgroundColor: '#fff', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}>♡</button>
                                <button style={{ border: 'none', backgroundColor: '#fff', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer' }}>👁</button>
                            </div>

                            {/* Product Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: '150px', height: '140px', objectFit: 'contain' }}
                            />

                            {item.hasCart && (
                                <button style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}>Add To Cart</button>
                            )}
                        </div>

                        {/* Info */}
                        <div style={{ marginTop: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>{item.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                                <span style={{ color: '#DB4444', fontWeight: '600' }}>{item.price}</span>
                                <span style={{ color: '#FFAD33', fontSize: '14px' }}>{item.rating}</span>
                                <span style={{ color: '#808080', fontSize: '14px', fontWeight: '600' }}>{item.reviews}</span>
                            </div>

                            {/* Color Options */}
                            {item.colors && (
                                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', alignItems: 'center' }}>
                                    {item.colors.map((c, i) => (
                                        <span key={i} style={{
                                            width: '14px',
                                            height: '14px',
                                            borderRadius: '50%',
                                            backgroundColor: c,
                                            display: 'inline-block',
                                            border: i === 0 ? '1px solid #000' : 'none'
                                        }}></span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Products Button */}
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <button style={{
                    backgroundColor: '#DB4444',
                    color: '#fff',
                    border: 'none',
                    padding: '16px 48px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                }}>View All Products</button>
            </div>
        </div>
    );
}