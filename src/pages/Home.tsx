// src/pages/Home.tsx
import HeroSection from '../components/HeroSection';
import FlashSales from '../components/FlashSales';
import Categories from '../components/Categories'; // قسم المربعات والأيكونات
import BestSelling from '../components/BestSelling';
import MusicBanner from '../components/MusicBanner';
import ExploreProducts from '../components/ExploreProducts';
import NewArrival from '../components/NewArrival';

export default function Home() {
  return (
    <div className="home-page px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto">
      {/* 1. الهيرو سكشن (القائمة الجانبية جنب بانر الأيفون) */}
      <HeroSection />

      {/* 2. فلاش سيلز */}
      <FlashSales />

      {/* 3. قسم تصفح الفئات (Categories اللي فيها الأيكونات والمربعات) */}
      <Categories />

      {/* 4. الأكثر مبيعاً */}
      <BestSelling />

      {/* 5. بانر الموسيقى */}
      <MusicBanner />

      {/* 6. استكشف المنتجات */}
      <ExploreProducts />

      {/* 7. الوصول الجديد */}
      <NewArrival />
    </div>
  );
}