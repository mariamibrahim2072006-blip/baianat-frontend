// src/pages/Login.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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

            // حفظ التوكن في localStorage لضمان عمله أونلاين بين Vercel و Railway
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