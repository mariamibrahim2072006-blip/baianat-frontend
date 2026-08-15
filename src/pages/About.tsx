import { Link } from 'react-router-dom';

export default function About() {
    const stats = [
        { icon: '🏬', number: '10.5k', text: 'Sellers active our site' },
        { icon: '💲', number: '33k', text: 'Monthly Product Sale', active: true },
        { icon: '🛍️', number: '45.5k', text: 'Customer active in our site' },
        { icon: '💰', number: '25k', text: 'Annual gross sale in our site' },
    ];

    const team = [
        { name: 'Tom Cruise', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
        { name: 'Emma Watson', role: 'Managing Director', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80' },
        { name: 'Will Smith', role: 'Product Designer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    ];

    const services = [
        { icon: '🚚', title: 'FREE AND FAST DELIVERY', desc: 'Free delivery for all orders over $140' },
        { icon: '🎧', title: '24/7 CUSTOMER SERVICE', desc: 'Friendly 24/7 customer support' },
        { icon: '🛡️', title: 'MONEY BACK GUARANTEE', desc: 'We return money within 30 days' },
    ];

    return (
        <div style={{ marginTop: '50px', marginBottom: '140px' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: '14px', color: '#808080', marginBottom: '40px' }}>
                <Link to="/" style={{ color: '#808080', textDecoration: 'none' }}>Home</Link> / <span style={{ color: '#000' }}>About</span>
            </div>

            {/* 1. Our Story Section */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '60px',
                marginBottom: '120px',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, minWidth: '320px', maxWidth: '525px' }}>
                    <h2 style={{ fontSize: '54px', fontWeight: '600', margin: '0 0 40px 0', letterSpacing: '1px' }}>Our Story</h2>
                    <p style={{ fontSize: '16px', lineHeight: '26px', color: '#000', marginBottom: '24px' }}>
                        Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '26px', color: '#000' }}>
                        Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer goods to electronics.
                    </p>
                </div>

                <div style={{ flex: 1, minWidth: '320px', height: '480px', borderRadius: '4px', overflow: 'hidden' }}>
                    <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                        alt="Our Story"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* 2. Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '30px',
                marginBottom: '120px'
            }}>
                {stats.map((item, idx) => (
                    <div key={idx} style={{
                        border: item.active ? 'none' : '1px solid #c1c0c1',
                        backgroundColor: item.active ? '#DB4444' : '#fff',
                        color: item.active ? '#fff' : '#000',
                        borderRadius: '4px',
                        padding: '30px 20px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: item.active ? 'rgba(255,255,255,0.2)' : '#2F2E30',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            border: item.active ? '6px solid #fff' : '6px solid #c1c0c1'
                        }}>
                            {item.icon}
                        </div>
                        <h3 style={{ fontSize: '32px', fontWeight: '700', margin: 0 }}>{item.number}</h3>
                        <p style={{ fontSize: '14px', margin: 0 }}>{item.text}</p>
                    </div>
                ))}
            </div>

            {/* 3. Team Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '30px',
                marginBottom: '120px'
            }}>
                {team.map((member, idx) => (
                    <div key={idx}>
                        <div style={{
                            backgroundColor: '#F5F5F5',
                            height: '380px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}>
                            <img src={member.image} alt={member.name} style={{ width: '85%', height: '90%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '500', margin: '0 0 6px 0' }}>{member.name}</h3>
                            <p style={{ fontSize: '14px', color: '#808080', margin: '0 0 12px 0' }}>{member.role}</p>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '16px' }}>
                                <span style={{ cursor: 'pointer' }}>𝕏</span>
                                <span style={{ cursor: 'pointer' }}>📷</span>
                                <span style={{ cursor: 'pointer' }}>in</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 4. Services Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '80px',
                flexWrap: 'wrap',
                textAlign: 'center'
            }}>
                {services.map((item, idx) => (
                    <div key={idx} style={{ maxWidth: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            backgroundColor: '#2F2E30',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            border: '8px solid #c1c0c1',
                            marginBottom: '20px'
                        }}>
                            {item.icon}
                        </div>
                        <h4 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>{item.title}</h4>
                        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}