import React, { useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage('');

    try {
      console.log('جاري إرسال البيانات للباك إند:', {
        username,
        email,
      });

      const response = await axios.post(`${API_URL}/signup`, {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      console.log('✅ تم التسجيل بنجاح:', response.data);

      setMessage(
        'تم إنشاء الحساب بنجاح! سيتم تحويلك لصفحة تسجيل الدخول.'
      );

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('❌ خطأ في التسجيل:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage(
          'حدث خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = message.includes('بنجاح');

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-orb auth-orb-one"></div>
        <div className="auth-orb auth-orb-two"></div>
        <div className="auth-orb auth-orb-three"></div>
      </div>

      <main className="auth-card">
        <div className="auth-logo">
          <span>B</span>
        </div>

        <div className="auth-header">
          <p className="auth-small-title">WELCOME</p>

          <h1>Create Your Account</h1>

          <p>
            Create your account and get started with us.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSignUp}>
          <div className="auth-field">
            <label htmlFor="signup-username">
              Username
            </label>

            <input
              id="signup-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              minLength={3}
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">
              Email
            </label>

            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">
              Password
            </label>

            <div className="password-wrapper">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={6}
                required
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                disabled={loading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <span className="button-loading">
                <span className="spinner"></span>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {message && (
          <div
            className={`auth-message ${isSuccess ? 'success' : 'error'
              }`}
          >
            {message}
          </div>
        )}

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-switch">
          Already have an account?
          <Link to="/login"> Log In</Link>
        </p>
      </main>
    </div>
  );
};

export default SignUp;