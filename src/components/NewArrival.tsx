import ps5Img from '../assets/ps5.png';
import womanImg from '../assets/woman.png';
import speakersImg from '../assets/speakers.png';
import perfumeImg from '../assets/perfume.png';

export default function NewArrival() {
    return (
        <div style={{ marginTop: '70px', marginBottom: '100px' }}>
            {/* Red Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '20px', height: '40px', backgroundColor: '#DB4444', borderRadius: '4px' }}></div>
                <span style={{ color: '#DB4444', fontWeight: '600', fontSize: '16px' }}>Featured</span>
            </div>

            {/* Section Title */}
            <h2 style={{ fontSize: '36px', fontWeight: '600', margin: '20px 0 50px 0' }}>New Arrival</h2>

            {/* Grid Layout for Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '30px'
            }}>
                {/* Left Big Card: PlayStation 5 */}
                <div style={{
                    backgroundColor: '#000',
                    borderRadius: '4px',
                    height: '600px',
                    position: 'relative',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    color: '#fff',
                    overflow: 'hidden'
                }}>
                    <img
                        src={ps5Img}
                        alt="PlayStation 5"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90%',
                            height: '90%',
                            objectFit: 'contain'
                        }}
                    />

                    <div style={{ zIndex: 1, maxWidth: '260px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 12px 0' }}>PlayStation 5</h3>
                        <p style={{ fontSize: '14px', color: '#FAFAFA', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                            Black and White version of the PS5 coming out on sale.
                        </p>
                        <a href="#" style={{ color: '#fff', fontWeight: '500', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                            Shop Now
                        </a>
                    </div>
                </div>

                {/* Right Stacked Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', height: '600px' }}>
                    {/* Top Card: Women's Collections */}
                    <div style={{
                        flex: 1,
                        backgroundColor: '#0D0D0D',
                        borderRadius: '4px',
                        position: 'relative',
                        padding: '24px 32px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        color: '#fff',
                        overflow: 'hidden'
                    }}>
                        <img
                            src={womanImg}
                            alt="Women's Collections"
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '60%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />

                        <div style={{ zIndex: 1, maxWidth: '260px' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 10px 0' }}>Women's Collections</h3>
                            <p style={{ fontSize: '14px', color: '#FAFAFA', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                                Featured woman collections that give you another vibe.
                            </p>
                            <a href="#" style={{ color: '#fff', fontWeight: '500', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                                Shop Now
                            </a>
                        </div>
                    </div>

                    {/* Bottom Row: 2 Small Cards */}
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        {/* Speakers Card */}
                        <div style={{
                            backgroundColor: '#0D0D0D',
                            borderRadius: '4px',
                            position: 'relative',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            color: '#fff',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={speakersImg}
                                alt="Speakers"
                                style={{
                                    position: 'absolute',
                                    top: '45%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '75%',
                                    height: '65%',
                                    objectFit: 'contain'
                                }}
                            />

                            <div style={{ zIndex: 1 }}>
                                <h4 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 6px 0' }}>Speakers</h4>
                                <p style={{ fontSize: '12px', color: '#FAFAFA', margin: '0 0 10px 0' }}>Amazon wireless speakers</p>
                                <a href="#" style={{ color: '#fff', fontSize: '14px', fontWeight: '500', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Shop Now</a>
                            </div>
                        </div>

                        {/* Perfume Card */}
                        <div style={{
                            backgroundColor: '#0D0D0D',
                            borderRadius: '4px',
                            position: 'relative',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            color: '#fff',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={perfumeImg}
                                alt="Perfume"
                                style={{
                                    position: 'absolute',
                                    top: '45%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '75%',
                                    height: '65%',
                                    objectFit: 'contain'
                                }}
                            />

                            <div style={{ zIndex: 1 }}>
                                <h4 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 6px 0' }}>Perfume</h4>
                                <p style={{ fontSize: '12px', color: '#FAFAFA', margin: '0 0 10px 0' }}>GUCCI INTENSE OUD EDP</p>
                                <a href="#" style={{ color: '#fff', fontSize: '14px', fontWeight: '500', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Row */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '70px',
                marginTop: '120px',
                flexWrap: 'wrap',
                textAlign: 'center'
            }}>
                {/* Service 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: '#2F2E30',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '8px solid #c1c0c1',
                        marginBottom: '20px'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                        </svg>
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 6px 0' }}>FREE AND FAST DELIVERY</h4>
                    <p style={{ fontSize: '13px', color: '#000', margin: 0 }}>Free delivery for all orders over $140</p>
                </div>

                {/* Service 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: '#2F2E30',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '8px solid #c1c0c1',
                        marginBottom: '20px'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 6px 0' }}>24/7 CUSTOMER SERVICE</h4>
                    <p style={{ fontSize: '13px', color: '#000', margin: 0 }}>Friendly 24/7 customer support</p>
                </div>

                {/* Service 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: '#2F2E30',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '8px solid #c1c0c1',
                        marginBottom: '20px'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 6px 0' }}>MONEY BACK GUARANTEE</h4>
                    <p style={{ fontSize: '13px', color: '#000', margin: 0 }}>We return money within 30 days</p>
                </div>
            </div>
        </div>
    );
}