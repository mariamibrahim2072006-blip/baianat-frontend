// src/components/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import appleLogo from '../assets/apple-logo.png';
import iphoneImg from '../assets/iphone.png';

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

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // مراقبة حجم الشاشة عشان نخفي القائمة الجانبية في الموبايل ونعتمد على قائمة الموبايل العلوية
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section style={{ width: '100%', padding: '24px 5%' }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '40px'
      }}>

        {/* القائمة الجانبية تظهر فقط في الشاشات الكبيرة وتختفي في الموبايل لتجنب التداخل */}
        {!isMobile && (
          <aside style={{ width: '230px', flexShrink: 0, borderRight: '1px solid #e5e5e5', paddingRight: '24px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categories.map((category) => {
                const isHovered = hoveredCategory === category.name;
                return (
                  <li key={category.name}>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(category.name)}
                      onMouseEnter={() => setHoveredCategory(category.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        fontSize: '15px',
                        color: isHovered ? '#DB4444' : '#000',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: isHovered ? '#fff1f1' : 'transparent',
                        transition: 'all 0.2s ease',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                      }}
                    >
                      <span>{category.name}</span>
                      {category.hasArrow && <ChevronRight size={17} style={{ color: isHovered ? '#DB4444' : '#666' }} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        {/* بانر الأيفون: يأخذ عرض الشاشة بالكامل على الموبايل */}
        <div style={{
          position: 'relative',
          flex: 1,
          minHeight: '350px',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '30px 20px' : '0 50px',
          overflow: 'hidden',
          borderRadius: '8px',
          textAlign: isMobile ? 'center' : 'left',
          gap: isMobile ? '20px' : '0'
        }}>
          {/* النصوص */}
          <div style={{ maxWidth: isMobile ? '100%' : '380px', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: '15px', marginBottom: '15px' }}>
              <img src={appleLogo} alt="Apple" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              <span style={{ fontSize: '15px' }}>iPhone 14 Series</span>
            </div>
            <h1 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '650', lineHeight: '1.1', margin: '0 0 15px 0' }}>
              Up to 10% off Voucher
            </h1>
            <Link to="/" style={{ color: '#fff', textDecoration: 'underline', fontSize: '16px', fontWeight: '500' }}>
              Shop Now →
            </Link>
          </div>

          {/* صورة الأيفون */}
          <div style={{ maxWidth: isMobile ? '280px' : '450px', zIndex: 2 }}>
            <img src={iphoneImg} alt="iPhone" style={{ width: '100%', maxHeight: isMobile ? '220px' : '380px', objectFit: 'contain' }} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;