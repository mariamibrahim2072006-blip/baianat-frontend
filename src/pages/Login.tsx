// src/pages/Login.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // تأكدي إن ملف firebase.ts موجود في مجلد src وجنب الملف ده

const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (loading) {
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/login`,
                {
                    email: email.trim(),
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(
                '✅ Login successful:',
                response.data
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            await refreshUser();
            navigate('/');
        } catch (error: any) {
            console.error(
                '❌ Login error:',
                error
            );

            setError(
                error.response?.data?.message ||
                'فشل تسجيل الدخول، يرجى المحاولة مرة أخرى.'
            );
        } finally {
            setLoading(false);
        }
    };

    // دالة تسجيل الدخول بـ Google
    const handleGoogleLogin = async () => {
        if (loading) return;
        setError('');
        setLoading(true);

        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log('✅ Google User:', user.email, user.displayName);

            // إرسال البريد واسم المستخدم للباك إيند عشان يتعمل له توكن وسشن
            const response = await axios.post(
                `${API_URL}/google-login`, // هنعمل الإندبوينت دي في الباك إيند حالاً لو مش موجودة، أو نستخدم الـ login العادي
                {
                    email: user.email,
                    username: user.displayName || 'Google User',
                },
                {
                    withCredentials: true,
                }
            );

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            await refreshUser();
            navigate('/');
        } catch (error: any) {
            console.error('❌ Google login error:', error);
            setError('فشل تسجيل الدخول بواسطة Google.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-orb auth-orb-one" />
                <div className="auth-orb auth-orb-two" />
                <div className="auth-orb auth-orb-three" />
            </div>

            <main className="auth-card">
                <div className="auth-logo">
                    <span>B</span>
                </div>

                <div className="auth-header">
                    <p className="auth-small-title">
                        WELCOME BACK
                    </p>
                    <h1>
                        Login to Your Account
                    </h1>
                    <p>
                        Welcome back. Please enter your details.
                    </p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >
                    <div className="auth-field">
                        <label htmlFor="login-email">
                            Email
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            autoComplete="email"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="login-password">
                            Password
                        </label>
                        <div className="password-wrapper">
                            <input
                                id="login-password"
                                type={
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="current-password"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        (value) => !value
                                    )
                                }
                                disabled={loading}
                            >
                                {showPassword
                                    ? 'Hide'
                                    : 'Show'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="auth-message error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? 'Logging in...'
                            : 'Log In'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                {/* زرار جوجل الجديد */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#1e293b',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        marginTop: '15px',
                        transition: 'background-color 0.2s',
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.14v3.15C3.16 21.39 7.28 24 12 24z" />
                        <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.14C.41 8.12 0 9.81 0 12s.41 3.88 1.14 5.4l4.14-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.28 0 3.16 2.61 1.14 6.6l4.14 3.15c.95-2.84 3.6-4.95 6.72-4.95z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <Link to="/signup">
                        Create Account
                    </Link>
                </p>
            </main>
        </div>
    );
}