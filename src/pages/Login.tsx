import { Link } from 'react-router-dom';
import authImg from '../assets/auth-side.png';

export default function Login() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '60px',
            marginBottom: '140px',
            marginLeft: 'calc(-50vw + 50%)', // يلغي الهامش الشمال تماماً ويلتصق بالحافة
            gap: '80px',
            flexWrap: 'wrap'
        }}>
            {/* Left Full Bleed Image */}
            <div style={{
                flex: '1.2',
                minWidth: '380px',
                backgroundColor: '#CBE4E8',
                borderRadius: '0 4px 4px 0',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: '700px'
            }}>
                <img
                    src={authImg}
                    alt="Side Graphic"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Right Form */}
            <div style={{ flex: '1', minWidth: '320px', maxWidth: '380px', paddingRight: '40px' }}>
                <h2 style={{
                    fontSize: '36px',
                    fontWeight: '500',
                    margin: '0 0 12px 0',
                    letterSpacing: '1px',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    Log in to <span style={{ fontWeight: '600' }}>Exclusive</span>
                </h2>
                <p style={{ fontSize: '16px', color: '#000', margin: '0 0 40px 0' }}>
                    Enter your details below
                </p>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <input
                        type="text"
                        placeholder="Email or Phone Number"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid #c1c0c1',
                            outline: 'none',
                            padding: '8px 0',
                            fontSize: '16px'
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid #c1c0c1',
                            outline: 'none',
                            padding: '8px 0',
                            fontSize: '16px'
                        }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <button type="button" style={{
                            backgroundColor: '#DB4444',
                            color: '#fff',
                            border: 'none',
                            padding: '16px 48px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                            Log In
                        </button>

                        <a href="#" style={{ color: '#DB4444', fontSize: '15px', textDecoration: 'none' }}>
                            Forget Password?
                        </a>
                    </div>
                </form>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px', fontSize: '15px', color: '#666' }}>
                    <span>Don't have an account?</span>
                    <Link to="/signup" style={{ color: '#000', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}