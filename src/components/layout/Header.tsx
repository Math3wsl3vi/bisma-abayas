import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, UserIcon, ShoppingBagIcon, MenuIcon, XIcon } from 'lucide-react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  return <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-navy text-white text-xs py-2">
        <div className="container-custom flex justify-center md:justify-between items-center">
          <p className="hidden md:block">Free shipping on orders over Ksh 7500</p>
          <div className="flex space-x-4">
            <Link to="/track-order" className="hover:text-gold-light">
              Track Order
            </Link>
            <Link to="/contact" className="hover:text-gold-light">
              Contact Us
            </Link>
            <Link to="/faq" className="hover:text-gold-light">
              FAQ
            </Link>
          </div>
        </div>
      </div>
      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center">
              <span className="text-white font-serif text-lg">ME</span>
            </div>
            <div className="ml-2">
              <h1 className="font-serif text-xl md:text-2xl text-navy">
                Bisma Abayas
              </h1>
              <p className="text-xs text-gray-500">Fashion Boutique</p>
            </div>
          </Link>
          {/* Search - desktop */}
          <div className="hidden md:flex relative w-1/3">
            <input type="text" placeholder="Search for products..." className="w-full py-2 pl-4 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald">
              <SearchIcon size={18} />
            </button>
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="hover:text-emerald">
              <UserIcon size={22} />
            </Link>
            <Link to="/cart" className="relative hover:text-emerald">
              <ShoppingBagIcon size={22} />
              <span className="absolute -top-2 -right-2 bg-burgundy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <button className="md:hidden hover:text-emerald" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Navigation - desktop */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="container-custom">
          <ul className="flex justify-center space-x-8 py-4">
            <li>
              <Link to="/" className="font-medium hover:text-emerald">
                Home
              </Link>
            </li>
            <li className="relative">
              <button className="font-medium hover:text-emerald flex items-center" onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}>
                Shop
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isShopDropdownOpen && <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48 z-10">
                  <Link to="/category/all" className="block px-4 py-2 hover:bg-cream">
                    All Products
                  </Link>
                  <Link to="/category/hijabs" className="block px-4 py-2 hover:bg-cream">
                    Hijabs
                  </Link>
                  <Link to="/category/abayas" className="block px-4 py-2 hover:bg-cream">
                    Abayas
                  </Link>
                  <Link to="/category/underscarves" className="block px-4 py-2 hover:bg-cream">
                    Underscarves
                  </Link>
                  <Link to="/category/accessories" className="block px-4 py-2 hover:bg-cream">
                    Accessories
                  </Link>
                </div>}
            </li>
            <li>
              <Link to="/collections" className="font-medium hover:text-emerald">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/about" className="font-medium hover:text-emerald">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-medium hover:text-emerald">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container-custom py-4">
            <div className="mb-4">
              <input type="text" placeholder="Search for products..." className="w-full py-2 pl-4 pr-10 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald" />
            </div>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="block font-medium hover:text-emerald">
                  Home
                </Link>
              </li>
              <li>
                <button className="flex justify-between w-full font-medium hover:text-emerald" onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}>
                  Shop
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isShopDropdownOpen && <ul className="mt-2 ml-4 space-y-2">
                    <li>
                      <Link to="/category/all" className="block hover:text-emerald">
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/hijabs" className="block hover:text-emerald">
                        Hijabs
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/abayas" className="block hover:text-emerald">
                        Abayas
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/underscarves" className="block hover:text-emerald">
                        Underscarves
                      </Link>
                    </li>
                    <li>
                      <Link to="/category/accessories" className="block hover:text-emerald">
                        Accessories
                      </Link>
                    </li>
                  </ul>}
              </li>
              <li>
                <Link to="/collections" className="block font-medium hover:text-emerald">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="block font-medium hover:text-emerald">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block font-medium hover:text-emerald">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>}
    </header>;
};
export default Header;