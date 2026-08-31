import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import PromoBanner from '../components/home/PromoBanner';
import BoutiqueStory from '../components/home/BoutiqueStory';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Lookbook from '../components/home/Lookbook';
import Testimonials from '../components/home/Testimonials';
import Instagram from '../components/home/Instagram';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <NewArrivals />
      <PromoBanner />
      <BoutiqueStory />
      <WhyChooseUs />
      <Lookbook />
      <Testimonials />
      <Instagram />
      <Newsletter />
    </>
  );
}
