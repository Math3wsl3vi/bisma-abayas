import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container-custom">
        {/* Islamic pattern decoration */}
        <div className="relative h-8 mb-8">
          <div className="absolute inset-0 islamic-pattern"></div>
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center">
            <div className="bg-navy px-6">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-navy font-serif text-lg">ZC</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About column */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">About Us</h3>
            <p className="text-gray-300 mb-4">
              Modest Elegance offers premium Islamic clothing for the modern
              Muslim woman, combining traditional values with contemporary
              style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/hijabs" className="text-gray-300 hover:text-gold">
                  Hijabs
                </Link>
              </li>
              <li>
                <Link to="/category/abayas" className="text-gray-300 hover:text-gold">
                  Abayas
                </Link>
              </li>
              <li>
                <Link to="/category/modest-wear" className="text-gray-300 hover:text-gold">
                  Modest Wear
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-300 hover:text-gold">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/collections/new-arrivals" className="text-gray-300 hover:text-gold">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections/bestsellers" className="text-gray-300 hover:text-gold">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-gold">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="text-gray-300 hover:text-gold">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-gold">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-gold">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-300 hover:text-gold">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl mb-4 text-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon size={18} className="mr-2 mt-1 flex-shrink-0 text-gold" />
                <span className="text-gray-300">
                  123 Elegance Street, Fashion District, NY 10001, USA
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon size={18} className="mr-2 flex-shrink-0 text-gold" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MailIcon size={18} className="mr-2 flex-shrink-0 text-gold" />
                <span className="text-gray-300">info@modestelegance.com</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              Customer service hours: 9am-5pm EST (Sunday-Thursday)
            </p>
          </div>
        </div>
        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-xl mb-2 text-gold">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest collections and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-grow px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold" />
              <button className="btn bg-gold text-navy hover:bg-gold-light whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Modest Elegance. All rights
            reserved.
          </p>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-4">Payment Methods:</span>
            <div className="flex space-x-2">
              <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-700">VISA</span>
              </div>
              <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">MC</span>
              </div>
              <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500">PP</span>
              </div>
              <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800">AP</span>
              </div>
            </div>
          </div>
        </div>
        {/* Tagline */}
        <div className="text-center mt-6">
          <p className="text-gold italic font-serif">
            "Shop with confidence - Modest fashion for the modern Muslim woman"
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;