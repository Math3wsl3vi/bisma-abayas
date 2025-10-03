import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, InstagramIcon } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products, categories, testimonials, collections } from '../utils/data';
const HomePage = () => {
  // Get bestseller products
  const bestsellers = products.filter(product => product.isBestseller);
  // Get new arrivals
  const newArrivals = products.filter(product => product.isNew);
  return <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative bg-navy text-white">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="font-serif text-3xl md:text-5xl mb-4">
                Modest Fashion for the Modern Woman
              </h1>
              <p className="text-lg mb-6 text-gray-200">
                Discover our new collection of elegant hijabs, abayas, and
                modest wear that combine tradition with contemporary style.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/category/new-arrivals" className="btn bg-gold text-navy hover:bg-gold-light">
                  Shop New Arrivals
                </Link>
                <Link to="/collections" className="btn border-2 border-white text-white hover:bg-white hover:text-navy">
                  Browse Collections
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img src="https://i.pinimg.com/1200x/18/ba/d5/18bad55a778b3783e4570b111270c3dc.jpg" alt="Modest Elegance Collection" className="rounded-lg shadow-lg w-full h-auto" />
                <div className="absolute -bottom-6 -right-6 bg-burgundy text-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-serif text-lg">Premium Quality</p>
                  <p className="text-sm">Ethically Sourced Materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="islamic-divider mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-navy px-4">
              Featured Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => <Link to={`/category/${category.id}`} key={category.id} className="relative group overflow-hidden rounded-lg shadow-md">
                <div className="aspect-w-1 aspect-h-1">
                  <img src={category.image} alt={category.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif text-xl mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-2">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-gold hover:text-gold-light text-sm font-medium">
                    Shop Now <ArrowRightIcon size={16} className="ml-1" />
                  </span>
                </div>
              </Link>)}
          </div>
        </div>
      </section>
      {/* Bestsellers */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="islamic-divider mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-navy px-4">
              Bestsellers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map(product => <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} originalPrice={product.originalPrice} image={product.images[0]} rating={product.rating} isNew={product.isNew} isBestseller={product.isBestseller} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/collections/bestsellers" className="btn btn-outlined">
              View All Bestsellers
            </Link>
          </div>
        </div>
      </section>
      {/* Banner */}
      <section className="py-12 bg-burgundy text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="font-serif text-2xl md:text-3xl mb-2">
                Ramadan Collection 2023
              </h2>
              <p className="text-gray-200">
                Elegant modest wear for the holy month
              </p>
            </div>
            <Link to="/collections/ramadan" className="btn bg-gold text-navy hover:bg-gold-light">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>
      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="islamic-divider mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-navy px-4">
              New Arrivals
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map(product => <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} originalPrice={product.originalPrice} image={product.images[0]} rating={product.rating} isNew={product.isNew} isBestseller={product.isBestseller} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/collections/new-arrivals" className="btn btn-outlined">
              View All New Arrivals
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="islamic-divider mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-navy px-4">
              Customer Testimonials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map(testimonial => <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-4">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < testimonial.rating ? 'text-gold' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>)}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <p className="mt-4 text-xs text-gray-500">{testimonial.date}</p>
              </div>)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/testimonials" className="btn btn-outlined">
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>
      {/* Instagram Feed */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="islamic-divider mb-10">
            <div className="flex items-center px-4">
              <InstagramIcon size={24} className="mr-2 text-navy" />
              <h2 className="font-serif text-2xl md:text-3xl text-navy">
                Follow Us on Instagram
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => <a key={i} href="#" className="relative group overflow-hidden" onClick={e => e.preventDefault()}>
                <img src={products[i % products.length].images[0]} alt="Instagram post" className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-navy bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <InstagramIcon size={24} />
                  </span>
                </div>
              </a>)}
          </div>
          <div className="mt-6 text-center">
            <a href="#" className="text-navy hover:text-emerald font-medium flex items-center justify-center" onClick={e => e.preventDefault()}>
              @ModestElegance <ArrowRightIcon size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mx-auto mb-6">
              <span className="text-navy font-serif text-2xl">ME</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-700 mb-6">
              Stay updated with our latest collections, exclusive offers, and
              modest fashion tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald" />
              <button className="btn bg-emerald text-white hover:bg-emerald-light whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default HomePage;