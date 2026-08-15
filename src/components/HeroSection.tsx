
import appleLogo from '../assets/apple-logo.png';
import iphoneImg from '../assets/iphone.png';

export default function HeroSection() {
  const categories = [
    { name: "Woman's Fashion", hasArrow: true },
    { name: "Men's Fashion", hasArrow: true },
    { name: "Electronics", hasArrow: false },
    { name: "Home & Lifestyle", hasArrow: false },
    { name: "Medicine", hasArrow: false },
    { name: "Sports & Outdoor", hasArrow: false },
    { name: "Baby's & Toys", hasArrow: false },
    { name: "Groceries & Pets", hasArrow: false },
    { name: "Health & Beauty", hasArrow: false },
  ];

  return (
    <div style={{ display: 'flex', padding: '0 5%', marginTop: '40px', gap: '45px' }}>
      {/* Sidebar Categories */}
      <div style={{ width: '220px', borderRight: '1px solid #e5e5e5', paddingRight: '15px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map((item, index) => (
            <li key={index} style={{
              cursor: 'pointer',
              fontSize: '15px',
              color: '#000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{item.name}</span>
              {item.hasArrow && <span style={{ fontSize: '14px', fontWeight: 'bold' }}>&gt;</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Banner */}
      <div style={{
        flex: 1,
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '4px',
        padding: '40px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Left Text Box */}
        <div style={{ maxWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={appleLogo} alt="Apple Logo" style={{ width: '24px', height: 'auto' }} />
            <span style={{ fontSize: '14px' }}>iPhone 14 Series</span>
          </div>

          <h1 style={{ fontSize: '40px', fontWeight: '600', margin: '15px 0', lineHeight: '1.2' }}>
            Up to 10% off Voucher
          </h1>

          <a href="#" style={{
            color: '#fff',
            fontWeight: '500',
            textDecoration: 'underline',
            textUnderlineOffset: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Shop Now &rarr;
          </a>
        </div>

        {/* Banner Image */}
        <div style={{ width: '320px', display: 'flex', justifyContent: 'center' }}>
          <img src={iphoneImg} alt="iPhone 14 Series" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Pagination Dots */}
        <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#808080', cursor: 'pointer' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#808080', cursor: 'pointer' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#DB4444', border: '2px solid #fff', cursor: 'pointer' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#808080', cursor: 'pointer' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#808080', cursor: 'pointer' }}></span>
        </div>
      </div>
    </div>
  );
}