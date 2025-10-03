import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, TruckIcon, RefreshCcwIcon, CheckIcon, StarIcon, ChevronRightIcon, ChevronLeftIcon, InfoIcon } from 'lucide-react';
import { products } from '../utils/data';
import ProductCard from '../components/ui/ProductCard';
const ProductDetailPage = () => {
  const {
    productId
  } = useParams<{
    productId: string;
  }>();
  // Find the current product
  const product = products.find(p => p.id === productId);
  if (!product) {
    return <div className="container-custom py-20 text-center">
        <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
        <p className="mb-6">
          Sorry, the product you are looking for does not exist.
        </p>
        <Link to="/category/all" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>;
  }
  // State for selected options
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  // Get related products
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  // Handle image navigation
  const nextImage = () => {
    setActiveImageIndex((activeImageIndex + 1) % product.images.length);
  };
  const prevImage = () => {
    setActiveImageIndex((activeImageIndex - 1 + product.images.length) % product.images.length);
  };
  return <div className="bg-cream">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm">
          <Link to="/" className="text-gray-600 hover:text-emerald">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/category/all" className="text-gray-600 hover:text-emerald">
            Shop
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/category/${product.category}`} className="text-gray-600 hover:text-emerald">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img src={product.images[activeImageIndex]} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
                </div>
                {/* Image navigation buttons */}
                {product.images.length > 1 && <>
                    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100" onClick={prevImage}>
                      <ChevronLeftIcon size={20} />
                    </button>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100" onClick={nextImage}>
                      <ChevronRightIcon size={20} />
                    </button>
                  </>}
                {/* Thumbnail navigation */}
                {product.images.length > 1 && <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {product.images.map((image, index) => <button key={index} className={`w-20 h-20 rounded-md overflow-hidden ${index === activeImageIndex ? 'ring-2 ring-emerald' : 'opacity-70'}`} onClick={() => setActiveImageIndex(index)}>
                        <img src={image} alt={`${product.name} - view ${index + 1}`} className="w-full h-full object-cover" />
                      </button>)}
                  </div>}
              </div>
            </div>
            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:border-l border-gray-100">
              <div className="mb-4">
                <h1 className="font-serif text-2xl md:text-3xl text-navy mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'}`} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews} reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              </div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-medium text-burgundy">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && <span className="ml-2 text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>}
                  {product.originalPrice && <span className="ml-2 text-sm bg-burgundy text-white px-2 py-1 rounded">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>}
                </div>
                <div className="flex items-center text-sm text-emerald mb-2">
                  <CheckIcon size={16} className="mr-1" />
                  <span>In Stock</span>
                </div>
              </div>
              <div className="space-y-6">
                {/* Color selection */}
                {product.colors && product.colors.length > 0 && <div>
                    <h3 className="font-medium mb-2">
                      Color:{' '}
                      <span className="font-normal text-gray-700">
                        {selectedColor}
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => <button key={color} className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-emerald' : 'border-transparent'}`} style={{
                    backgroundColor: getColorHex(color)
                  }} onClick={() => setSelectedColor(color)} title={color} />)}
                    </div>
                  </div>}
                {/* Size selection */}
                {product.sizes && product.sizes.length > 0 && <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">
                        Size:{' '}
                        <span className="font-normal text-gray-700">
                          {selectedSize}
                        </span>
                      </h3>
                      <Link to="/size-guide" className="text-emerald text-sm flex items-center">
                        <InfoIcon size={14} className="mr-1" /> Size Guide
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => <button key={size} className={`min-w-[40px] h-10 px-3 rounded border ${selectedSize === size ? 'bg-emerald border-emerald text-white' : 'border-gray-300 bg-white'} flex items-center justify-center`} onClick={() => setSelectedSize(size)}>
                          {size}
                        </button>)}
                    </div>
                  </div>}
                {/* Quantity */}
                <div>
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100" onClick={() => handleQuantityChange(quantity - 1)}>
                      -
                    </button>
                    <input type="number" min="1" max="10" value={quantity} onChange={e => handleQuantityChange(parseInt(e.target.value) || 1)} className="w-16 h-10 border-t border-b border-gray-300 text-center" />
                    <button className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100" onClick={() => handleQuantityChange(quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                {/* Add to Cart / Buy Now */}
                <div className="flex flex-wrap gap-3">
                  <button className="btn bg-emerald text-white hover:bg-emerald-light flex-1 flex items-center justify-center">
                    <ShoppingBagIcon size={18} className="mr-2" />
                    Add to Cart
                  </button>
                  <button className="btn bg-burgundy text-white hover:bg-burgundy-light flex-1">
                    Buy Now
                  </button>
                  <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100">
                    <HeartIcon size={20} />
                  </button>
                </div>
                {/* Shipping & Returns */}
                <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
                  <div className="flex items-start">
                    <TruckIcon size={18} className="mr-2 text-emerald flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Free shipping</p>
                      <p className="text-gray-600">
                        On orders over $75. International shipping available.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <RefreshCcwIcon size={18} className="mr-2 text-emerald flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Easy returns</p>
                      <p className="text-gray-600">
                        30 day return policy.{' '}
                        <Link to="/shipping-returns" className="text-emerald underline">
                          Read more
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button className={`px-6 py-4 font-medium text-sm ${activeTab === 'description' ? 'border-b-2 border-emerald text-emerald' : 'text-gray-600 hover:text-emerald'}`} onClick={() => setActiveTab('description')}>
                Description
              </button>
              <button className={`px-6 py-4 font-medium text-sm ${activeTab === 'details' ? 'border-b-2 border-emerald text-emerald' : 'text-gray-600 hover:text-emerald'}`} onClick={() => setActiveTab('details')}>
                Additional Details
              </button>
              <button className={`px-6 py-4 font-medium text-sm ${activeTab === 'reviews' ? 'border-b-2 border-emerald text-emerald' : 'text-gray-600 hover:text-emerald'}`} onClick={() => setActiveTab('reviews')}>
                Reviews ({product.reviews})
              </button>
            </div>
            <div className="p-6">
              {activeTab === 'description' && <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <h4 className="font-medium text-navy mb-2">
                    Styling Suggestions
                  </h4>
                  <p className="text-gray-700 mb-4">
                    This{' '}
                    {product.category === 'hijabs' ? 'hijab' : product.category === 'abayas' ? 'abaya' : 'item'}{' '}
                    pairs beautifully with{' '}
                    {product.category === 'hijabs' ? 'neutral-colored abayas and can be styled in multiple ways - as a traditional wrap, turban style, or with a modern twist.' : product.category === 'abayas' ? 'both casual and formal accessories. Layer with statement jewelry for special occasions or keep it simple for everyday elegance.' : 'other items in our collection for a complete modest look.'}
                  </p>
                  <h4 className="font-medium text-navy mb-2">
                    Care Instructions
                  </h4>
                  <p className="text-gray-700">
                    {product.material && product.material.toLowerCase().includes('silk') ? 'Hand wash in cold water with mild detergent. Do not wring. Lay flat to dry away from direct sunlight. Iron on low heat if needed.' : 'Machine wash cold on gentle cycle. Tumble dry low or hang to dry. Iron on medium heat if needed.'}
                  </p>
                </div>}
              {activeTab === 'details' && <div>
                  <h3 className="font-serif text-lg text-navy mb-4">
                    Product Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium">{product.material}</span>
                    </div>
                    {product.dimensions && <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Dimensions</span>
                        <span className="font-medium">
                          {product.dimensions}
                        </span>
                      </div>}
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                    </div>
                    {product.subcategory && <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Style</span>
                        <span className="font-medium">
                          {product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1)}
                        </span>
                      </div>}
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">SKU</span>
                      <span className="font-medium">{product.sku}</span>
                    </div>
                  </div>
                </div>}
              {activeTab === 'reviews' && <div>
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <div className="text-3xl font-medium">
                        {product.rating.toFixed(1)}
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'}`} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Based on {product.reviews} reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map(star => {
                    const percentage = Math.round(star > 3 ? Math.random() * 30 + 70 : Math.random() * 20);
                    return <div key={star} className="flex items-center mb-1">
                            <div className="text-sm text-gray-500 w-6">
                              {star}
                            </div>
                            <StarIcon className="h-4 w-4 text-gold mr-2" fill="currentColor" />
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gold h-2 rounded-full" style={{
                          width: `${percentage}%`
                        }}></div>
                            </div>
                            <div className="text-sm text-gray-500 w-8 text-right">
                              {percentage}%
                            </div>
                          </div>;
                  })}
                    </div>
                  </div>
                  <div className="mb-6">
                    <button className="btn btn-outlined">Write a Review</button>
                  </div>
                  {/* Sample reviews */}
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="font-medium text-gray-600">
                              SA
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">Sarah A.</div>
                            <div className="text-sm text-gray-500">
                              3 weeks ago
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < 5 ? 'text-gold' : 'text-gray-300'}`} fill={i < 5 ? 'currentColor' : 'none'} />)}
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">
                        Beautiful quality, exactly as pictured
                      </h4>
                      <p className="text-gray-700">
                        I absolutely love this {product.category}! The quality
                        is excellent and the color is true to the pictures. It's
                        very comfortable to wear and I've received many
                        compliments. Will definitely be ordering more!
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="font-medium text-gray-600">
                              LM
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">Leila M.</div>
                            <div className="text-sm text-gray-500">
                              1 month ago
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < 4 ? 'text-gold' : 'text-gray-300'}`} fill={i < 4 ? 'currentColor' : 'none'} />)}
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">
                        Great product, shipping took a while
                      </h4>
                      <p className="text-gray-700">
                        The {product.category} is beautiful and the material
                        feels luxurious. My only complaint is that shipping took
                        longer than expected. Otherwise, very happy with my
                        purchase!
                      </p>
                    </div>
                    <div className="text-center">
                      <button className="text-emerald font-medium hover:underline">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
        {/* You May Also Like */}
        <div className="mt-12">
          <div className="islamic-divider mb-8">
            <h2 className="font-serif text-2xl text-navy px-4">
              You May Also Like
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} originalPrice={product.originalPrice} image={product.images[0]} rating={product.rating} isNew={product.isNew} isBestseller={product.isBestseller} />)}
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
export default ProductDetailPage;