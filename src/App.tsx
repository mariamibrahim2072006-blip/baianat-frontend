// src/App.tsx
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // استيراد مكون التنبيهات الاحترافي

import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // تم إضافة الـ Footer هنا
import ScrollToTop from './components/ScrollToTop'; // زرار الصعود للأعلى

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Admin from './pages/Admin';
import OwnerDashboard from './pages/OwnerDashboard'; // <-- لوحة تحكم المالكة المستقلة وآمنة تماماً
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist'; // صفحة المفضلة
import ExploreProducts from './components/ExploreProducts';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* صندوق التنبيهات الاحترافي العائم لكل المشروع */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111111',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '14px 20px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          },
        }}
      />

      <TopHeader />
      <Navbar />

      {/* حاوية رئيسية تمتد لكل الشاشة وبها كرات متوزعة في كل مكان */}
      <main
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          overflow: 'hidden',
        }}
      >
        {/* 1. دائرة مضيئة فوق (على الشمال) */}
        <div
          className="glow-ball-1"
          style={{
            position: 'absolute',
            top: '80px',
            left: '5%',
            width: '380px',
            height: '380px',
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.3,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* 2. دائرة مضيئة في المنتصف (على اليمين لتملى فراغ النص) */}
        <div
          className="glow-ball-2"
          style={{
            position: 'absolute',
            top: '45vh',
            right: '8%',
            width: '420px',
            height: '420px',
            background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
            borderRadius: '50%',
            filter: 'blur(90px)',
            opacity: 0.28,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* 3. دائرة مضيئة إضافية في منتصف الشمال (لخلق توازن تام) */}
        <div
          className="glow-ball-1"
          style={{
            position: 'absolute',
            top: '65vh',
            left: '10%',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)',
            borderRadius: '50%',
            filter: 'blur(85px)',
            opacity: 0.25,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* 4. دائرة مضيئة تحت خالص (عشان تقفل الشكل بأناقة) */}
        <div
          className="glow-ball-2"
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '15%',
            width: '450px',
            height: '450px',
            background: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
            borderRadius: '50%',
            filter: 'blur(95px)',
            opacity: 0.25,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* محتوى الصفحات */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />    {/* مسار صفحة About */}
            <Route path="/contact" element={<Contact />} />   {/* مسار صفحة Contact */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} /> {/* <-- لوحة المالكة الخاصة في حتة لوحدها تماماً */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} /> {/* مسار صفحة الـ Wishlist */}
            {/* مسار زرار View All Products ليعرض جميع المنتجات ببراعة */}
            <Route path="/products" element={<div style={{ padding: '40px 5%' }}><ExploreProducts /></div>} />
          </Routes>
        </div>
      </main>

      <Footer /> {/* الـ Footer يظهر أسفل الموقع */}
      <ScrollToTop /> {/* زرار الصعود للأعلى يظهر عند النزول */}

      {/* حركات الـ Animation */}
      <style>{`
        @keyframes moveBall1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(70px, 100px) scale(1.15); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes moveBall2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-80px, -90px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .glow-ball-1 {
          animation: moveBall1 12s ease-in-out infinite;
        }

        .glow-ball-2 {
          animation: moveBall2 14s ease-in-out infinite;
        }
      `}</style>
    </BrowserRouter>
  );
};

export default App;
