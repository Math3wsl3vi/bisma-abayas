import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FilterIcon, SlidersIcon, ChevronDownIcon, ChevronUpIcon, XIcon, CheckIcon } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products, categories } from '../utils/data';
const ProductListingPage = () => {
  const {
    categoryName
  } = useParams<{
    categoryName: string;
  }>();
  // Find the current category
  const currentCategory = categories.find(c => c.id === categoryName) || {
    id: categoryName || 'all',
    name: categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'All Products',
    description: 'Browse our collection',
    image: 'https://images.unsplash.com/photo-1611507929918-08ee0bcbc4ab?q=80&w=2787&auto=format&fit=crop',
    subcategories: []
  };
  // Filter products by category
  const filteredProducts = categoryName === 'all' ? products : products.filter(product => product.category === categoryName);
  // State for filters
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    material: true,
    color: true,
    size: false
  });
  // Filter states
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 200
  });
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  // Sort state
  const [sortOption, setSortOption] = useState('featured');
  // Toggle filter section
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  // Toggle filter visibility on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  // Toggle material selection
  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };
  // Toggle color selection
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  // Toggle size selection
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  // Apply filters
  const applyFilters = (products: typeof filteredProducts) => {
    return products.filter(product => {
      // Price filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }
      // Material filter
      if (selectedMaterials.length > 0 && product.material) {
        const productMaterials = product.material.toLowerCase();
        if (!selectedMaterials.some(m => productMaterials.includes(m.toLowerCase()))) {
          return false;
        }
      }
      // Color filter
      if (selectedColors.length > 0 && product.colors) {
        if (!product.colors.some(c => selectedColors.includes(c.toLowerCase()))) {
          return false;
        }
      }
      // Size filter
      if (selectedSizes.length > 0 && product.sizes) {
        if (!product.sizes.some(s => selectedSizes.includes(s))) {
          return false;
        }
      }
      return true;
    });
  };
  // Apply sorting
  const applySorting = (products: typeof filteredProducts) => {
    switch (sortOption) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...products].filter(p => p.isNew).concat([...products].filter(p => !p.isNew));
      case 'bestsellers':
        return [...products].filter(p => p.isBestseller).concat([...products].filter(p => !p.isBestseller));
      case 'featured':
      default:
        return products;
    }
  };
  // Get filtered and sorted products
  const displayProducts = applySorting(applyFilters(filteredProducts));
  // Available materials from products
  const availableMaterials = Array.from(new Set(filteredProducts.map(p => p.material).filter(Boolean).map(m => m.split(' ').pop() || m)));
  // Available colors from products
  const availableColors = Array.from(new Set(filteredProducts.flatMap(p => p.colors || [])));
  // Available sizes from products
  const availableSizes = Array.from(new Set(filteredProducts.flatMap(p => p.sizes || [])));
  return <div className="bg-cream">
      {/* Category Banner */}
      <div className="relative bg-navy text-white">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="container-custom py-10 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center text-sm">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            {categoryName !== 'all' && <>
                <Link to="/category/all" className="text-gray-300 hover:text-white">
                  Shop
                </Link>
                <span className="mx-2">/</span>
              </>}
            <span className="text-gold">{currentCategory.name}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl">
            {currentCategory.name}
          </h1>
          <p className="mt-2 text-gray-300">{currentCategory.description}</p>
        </div>
      </div>
      {/* Product Listing */}
      <div className="container-custom py-8">
        {/* Mobile Filter Button */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <button className="flex items-center text-navy font-medium" onClick={toggleFilters}>
            <FilterIcon size={18} className="mr-2" />
            Filters
          </button>
          {/* Sort Dropdown - Mobile */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald text-sm" value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
              <option value="bestsellers">Bestsellers</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDownIcon size={16} />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className={`lg:w-1/4 xl:w-1/5 ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-auto' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="font-serif text-xl">Filters</h2>
              <button onClick={toggleFilters}>
                <XIcon size={20} />
              </button>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('price')}>
                <h3 className="font-medium text-navy">Price Range</h3>
                {expandedSections.price ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
              </div>
              {expandedSections.price && <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      ${priceRange.min}
                    </span>
                    <span className="text-sm text-gray-600">
                      ${priceRange.max}
                    </span>
                  </div>
                  <div className="relative h-1 bg-gray-200 rounded-full">
                    <div className="absolute h-1 bg-emerald rounded-full" style={{
                  left: `${priceRange.min / 200 * 100}%`,
                  right: `${100 - priceRange.max / 200 * 100}%`
                }}></div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">
                        Min
                      </label>
                      <input type="number" min="0" max={priceRange.max} value={priceRange.min} onChange={e => setPriceRange({
                    ...priceRange,
                    min: parseInt(e.target.value) || 0
                  })} className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">
                        Max
                      </label>
                      <input type="number" min={priceRange.min} max="200" value={priceRange.max} onChange={e => setPriceRange({
                    ...priceRange,
                    max: parseInt(e.target.value) || 200
                  })} className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                    </div>
                  </div>
                </div>}
            </div>
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('material')}>
                <h3 className="font-medium text-navy">Material</h3>
                {expandedSections.material ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
              </div>
              {expandedSections.material && <div className="mt-3 space-y-2">
                  {availableMaterials.map(material => <div key={material} className="flex items-center">
                      <button className={`w-5 h-5 rounded border ${selectedMaterials.includes(material) ? 'bg-emerald border-emerald text-white' : 'border-gray-300'} flex items-center justify-center mr-2`} onClick={() => toggleMaterial(material)}>
                        {selectedMaterials.includes(material) && <CheckIcon size={14} />}
                      </button>
                      <span className="text-gray-700">{material}</span>
                    </div>)}
                </div>}
            </div>
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('color')}>
                <h3 className="font-medium text-navy">Color</h3>
                {expandedSections.color ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
              </div>
              {expandedSections.color && <div className="mt-3 flex flex-wrap gap-2">
                  {availableColors.map(color => <button key={color} className={`w-8 h-8 rounded-full border-2 ${selectedColors.includes(color) ? 'border-emerald' : 'border-transparent'}`} style={{
                backgroundColor: getColorHex(color)
              }} onClick={() => toggleColor(color)} title={color} />)}
                </div>}
            </div>
            {availableSizes.length > 0 && <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('size')}>
                  <h3 className="font-medium text-navy">Size</h3>
                  {expandedSections.size ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
                </div>
                {expandedSections.size && <div className="mt-3 flex flex-wrap gap-2">
                    {availableSizes.map(size => <button key={size} className={`min-w-[40px] h-8 px-2 rounded border ${selectedSizes.includes(size) ? 'bg-emerald border-emerald text-white' : 'border-gray-300 bg-white'} flex items-center justify-center text-sm`} onClick={() => toggleSize(size)}>
                        {size}
                      </button>)}
                  </div>}
              </div>}
            {/* Apply/Clear Filters Buttons - Mobile Only */}
            <div className="mt-8 flex gap-4 lg:hidden">
              <button className="w-1/2 py-2 border border-gray-300 rounded-md text-navy font-medium" onClick={() => {
              setPriceRange({
                min: 0,
                max: 200
              });
              setSelectedMaterials([]);
              setSelectedColors([]);
              setSelectedSizes([]);
            }}>
                Clear All
              </button>
              <button className="w-1/2 py-2 bg-emerald text-white rounded-md font-medium" onClick={toggleFilters}>
                Apply Filters
              </button>
            </div>
          </div>
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-gray-600">{displayProducts.length} products</p>
              <div className="flex items-center">
                <span className="mr-2 text-gray-700">Sort by:</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">New Arrivals</option>
                    <option value="bestsellers">Bestsellers</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDownIcon size={16} />
                  </div>
                </div>
              </div>
            </div>
            {/* Subcategories Pills */}
            {currentCategory.subcategories && currentCategory.subcategories.length > 0 && <div className="flex flex-wrap gap-2 mb-6">
                  <Link to={`/category/${currentCategory.id}`} className="px-4 py-1 rounded-full bg-emerald text-white text-sm">
                    All
                  </Link>
                  {currentCategory.subcategories.map(subcategory => <Link key={subcategory} to={`/category/${currentCategory.id}?subcategory=${subcategory}`} className="px-4 py-1 rounded-full bg-white border border-gray-200 hover:border-emerald text-gray-700 text-sm">
                      {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                    </Link>)}
                </div>}
            {/* Products */}
            {displayProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map(product => <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} originalPrice={product.originalPrice} image={product.images[0]} rating={product.rating} isNew={product.isNew} isBestseller={product.isBestseller} />)}
              </div> : <div className="text-center py-12">
                <p className="text-gray-600">
                  No products match your current filters.
                </p>
                <button className="mt-4 btn btn-outlined" onClick={() => {
              setPriceRange({
                min: 0,
                max: 200
              });
              setSelectedMaterials([]);
              setSelectedColors([]);
              setSelectedSizes([]);
            }}>
                  Clear All Filters
                </button>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
// Helper function to get color hex code
function getColorHex(color: string): string {
  const colorMap: Record<string, string> = {
    black: '#000000',
    navy: '#0A2342',
    burgundy: '#800020',
    emerald: '#0D5C46',
    cream: '#FDF5E6',
    white: '#FFFFFF',
    gray: '#808080',
    'dusty rose': '#DCAE96',
    teal: '#008080',
    gold: '#D4AF37',
    beige: '#F5F5DC',
    brown: '#964B00',
    'sage green': '#9CAF88'
  };
  return colorMap[color.toLowerCase()] || '#CCCCCC';
}
export default ProductListingPage;