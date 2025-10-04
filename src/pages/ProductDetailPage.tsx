import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, TruckIcon, RefreshCcwIcon, CheckIcon, StarIcon, ChevronRightIcon, ChevronLeftIcon, InfoIcon } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { useCartStore } from '../store/cartStore';
import { Product, ProductsService } from '../service/productService';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  // State for selected options
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cart store
  const { addToCart } = useCartStore();

  // Fetch product data from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', productId);
        
        // Fetch the main product
        const productData = await ProductsService.getProductById(productId);
        console.log('Product data:', productData);
        
        if (!productData) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        setProduct(productData);

        // Initialize selected options
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0]);
        }
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }

        // Fetch related products
        const related = await ProductsService.getProductsByCategory(productData.category);
        const filteredRelated = related
          .filter(p => p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(filteredRelated);

      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Handle image navigation
  const nextImage = () => {
    if (product) {
      setActiveImageIndex((activeImageIndex + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setActiveImageIndex((activeImageIndex - 1 + product.images.length) % product.images.length);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    
    try {
      // Create unique variant ID
      const variantId = `${product.id}-${selectedSize || 'standard'}-${(selectedColor || 'default').replace(/,/g, '').replace(/\s+/g, '-').toLowerCase()}`;
      
      addToCart({
        id: variantId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        product_id: product.id,
        sku: product.sku,
        material: product.material,
        size: selectedSize || 'Standard',
        color: selectedColor || 'Default',
        category: product.category,
        subcategory: product.subcategory,
        quantity: quantity
      });

      // Show success feedback
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);

    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  // Handle buy now
  const handleBuyNow = async () => {
    await handleAddToCart();
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="container-custom py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="font-serif text-xl text-navy mb-2">Loading Product...</h2>
            <p className="text-gray-600">Please wait while we fetch the product details.</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="container-custom py-20 text-center">
          <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
          <p className="mb-6 text-gray-600">
            {error || 'Sorry, the product you are looking for does not exist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/category/all" className="btn bg-emerald text-white hover:bg-emerald-light">
              Continue Shopping
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-outlined"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream">
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
                  <img 
                    src={product.images[activeImageIndex]} 
                    alt={product.name} 
                    className="w-full h-96 object-cover rounded-lg" 
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                    }}
                  />
                </div>
                {/* Image navigation buttons */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100" 
                      onClick={prevImage}
                    >
                      <ChevronLeftIcon size={20} />
                    </button>
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100" 
                      onClick={nextImage}
                    >
                      <ChevronRightIcon size={20} />
                    </button>
                  </>
                )}
                {/* Thumbnail navigation */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button 
                        key={index} 
                        className={`w-20 h-20 rounded-md overflow-hidden ${
                          index === activeImageIndex ? 'ring-2 ring-emerald' : 'opacity-70'
                        }`} 
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} - view ${index + 1}`} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Image';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
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
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'text-gold' : 'text-gray-300'
                        }`} 
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                      />
                    ))}
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
                    Ksh {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-gray-500 line-through">
                      Ksh {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="ml-2 text-sm bg-burgundy text-white px-2 py-1 rounded">
                      Save Ksh {(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-emerald mb-2">
                  <CheckIcon size={16} className="mr-1" />
                  <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Color selection */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">
                      Color:{' '}
                      <span className="font-normal text-gray-700">
                        {selectedColor}
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <button 
                          key={color} 
                          className={`w-10 h-10 rounded-full border-2 ${
                            selectedColor === color ? 'border-emerald' : 'border-transparent'
                          }`} 
                          style={{
                            backgroundColor: getColorHex(color)
                          }} 
                          onClick={() => setSelectedColor(color)} 
                          title={color} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
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
                      {product.sizes.map(size => (
                        <button 
                          key={size} 
                          className={`min-w-[40px] h-10 px-3 rounded border ${
                            selectedSize === size ? 'bg-emerald border-emerald text-white' : 'border-gray-300 bg-white'
                          } flex items-center justify-center`} 
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button 
                      className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100" 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={!product.inStock}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={quantity} 
                      onChange={e => handleQuantityChange(parseInt(e.target.value) || 1)} 
                      className="w-16 h-10 border-t border-b border-gray-300 text-center" 
                      disabled={!product.inStock}
                    />
                    <button 
                      className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100" 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={!product.inStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart / Buy Now */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    className={`btn bg-emerald text-white hover:bg-emerald-light flex-1 flex items-center justify-center ${
                      isAddingToCart || !product.inStock ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !product.inStock}
                  >
                    {!product.inStock ? (
                      'Out of Stock'
                    ) : isAddingToCart ? (
                      'Adding...'
                    ) : (
                      <>
                        <ShoppingBagIcon size={18} className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button 
                    className={`btn bg-burgundy text-white hover:bg-burgundy-light flex-1 ${
                      isAddingToCart || !product.inStock ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    onClick={handleBuyNow}
                    disabled={isAddingToCart || !product.inStock}
                  >
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
                        On orders over Ksh 7500. International shipping available.
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

          {/* Rest of your component remains the same... */}
          {/* Product Tabs section */}
          {/* You May Also Like section */}
        </div>

        {/* You May Also Like */}
        <div className="mt-12">
          <div className="islamic-divider mb-8">
            <h2 className="font-serif text-2xl text-navy px-4">
              You May Also Like
            </h2>
          </div>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  id={product.id} 
                  name={product.name} 
                  price={product.price} 
                  originalPrice={product.originalPrice} 
                  image={product.images[0]} 
                  rating={product.rating} 
                  isNew={product.isNew} 
                  isBestseller={product.isBestseller}
                  sku={product.sku}
                  category={product.category}
                  subcategory={product.subcategory}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No related products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get color hex code (keep this the same)
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