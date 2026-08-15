import HeroSection from '../components/HeroSection';
import FlashSales from '../components/FlashSales';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import MusicBanner from '../components/MusicBanner';
import ExploreProducts from '../components/ExploreProducts';
import NewArrival from '../components/NewArrival';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FlashSales />
      <Categories />
      <BestSelling />
      <MusicBanner />
      <ExploreProducts />
      <NewArrival />
    </div>
  );
}