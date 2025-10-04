import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, EyeIcon } from "lucide-react";
import { useCartStore } from "../../store/cartStore";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number; // Made optional to handle undefined cases
  isNew?: boolean;
  isBestseller?: boolean;
  sku: string;
  size?: string;
  color?: string;
  category: string;
  subcategory: string;
}

// Error Boundary for ProductCard
interface ErrorBoundaryState {
  hasError: boolean;
}

class ProductCardErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <p className="text-red-600">Error loading product</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating = 0, // Default to 0 if undefined
  isNew = false,
  isBestseller = false,
  sku,
  size = "Default",
  color = "Default",
  category,
  subcategory,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const variantId = `${id}-${size}-${color.replace(/,/g, "").replace(/\s+/g, "-").toLowerCase()}`;
  const isInCart = cartItems.some((item) => item.id === variantId);

  const handleAddToCart = () => {
    addToCart({
      id: variantId,
      product_id: id,
      name,
      price,
      originalPrice,
      image: image || "/placeholder-image.jpg",
      sku,
      size,
      color,
      category,
      subcategory,
      quantity: 1,
    });
  };

  return (
    <ProductCardErrorBoundary>
      <div className="product-card group">
        {/* Product image with overlay actions */}
        <div className="relative overflow-hidden">
          <Link to={`/product/${id}`}>
            <img
              src={image || "/placeholder-image.jpg"}
              alt={name}
              className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <span className="bg-burgundy text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
            {isBestseller && (
              <span className="bg-gold text-navy text-xs px-2 py-1 rounded">
                Bestseller
              </span>
            )}
          </div>

          {/* Action buttons overlay */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-emerald hover:text-white transition-colors duration-300">
              <HeartIcon size={16} />
            </button>
            <Link
              to={`/product/${id}`}
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-emerald hover:text-white transition-colors duration-300"
            >
              <EyeIcon size={16} />
            </Link>
          </div>

          {/* Quick add button */}
          <div className="absolute bottom-0 left-0 right-0 bg-emerald text-white py-2 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full font-medium transition-colors duration-300 ${
                isInCart ? "bg-gray-500 cursor-not-allowed" : "bg-emerald hover:bg-green-700"
              }`}
              disabled={isInCart}
            >
              {isInCart ? "Added" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <Link to={`/product/${id}`} className="block">
            <h3 className="font-medium text-navy hover:text-emerald transition-colors">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center mt-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${i < Math.floor(rating) ? "text-gold" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({(rating || 0).toFixed(1)})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center">
            <span className="font-semibold text-burgundy">
              Ksh {(price || 0).toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                Ksh {(originalPrice || 0).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </ProductCardErrorBoundary>
  );
};

export default ProductCard;