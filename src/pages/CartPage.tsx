import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  XIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  LockIcon, 
  CreditCardIcon, 
  ChevronRightIcon,
  Trash2Icon
} from 'lucide-react';
import { useCartStore, useCartTotal, useCartSummary } from '../store/cartStore';

const CartPage = () => {
  // State for promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const cartTotal = useCartTotal();
  const cartSummary = useCartSummary();
  
  // Calculate cart totals
  const subtotal = cartTotal;
  const shipping = subtotal >= 75 ? 0 : 5.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal + shipping + tax - discount;

  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(id, newQuantity);
    }
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  // Handle clear entire cart
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  // Handle promo code application
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'modest10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Invalid promo code');
    }
  };

  // Handle save for later
  const handleSaveForLater = (id: string) => {
    // In a real app, this would move the item to a saved items list
    alert(`Item saved for later`);
  };

  return (
    <div className="bg-cream">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-2xl md:text-3xl text-navy">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <Trash2Icon size={16} className="mr-1" />
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="hidden md:flex text-sm font-medium text-gray-500 border-b border-gray-200 pb-4">
                    <div className="w-1/2">Product</div>
                    <div className="w-1/6 text-center">Price</div>
                    <div className="w-1/6 text-center">Quantity</div>
                    <div className="w-1/6 text-center">Subtotal</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-6 flex flex-col md:flex-row">
                        {/* Product info */}
                        <div className="md:w-1/2 flex">
                          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <Link
                              to={`/product/${item.product_id}`}
                              className="font-medium text-navy hover:text-emerald"
                            >
                              {item.name}
                            </Link>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.color && <span>Color: {item.color}</span>}
                              {item.color && item.size && <span> / </span>}
                              {item.size && <span>Size: {item.size}</span>}
                            </div>
                            {item.material && (
                              <div className="text-sm text-gray-500">
                                Material: {item.material}
                              </div>
                            )}
                            <div className="flex mt-2 md:hidden">
                              <span className="text-burgundy font-medium">
                                Ksh {item.price.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex space-x-4 mt-3">
                              <button
                                className="text-sm text-red-500 hover:text-red-700 flex items-center"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <XIcon size={14} className="mr-1" />
                                Remove
                              </button>
                              <button
                                className="text-sm text-gray-500 hover:text-emerald"
                                onClick={() => handleSaveForLater(item.id)}
                              >
                                Save for later
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Price - desktop */}
                        <div className="hidden md:flex md:w-1/6 items-center justify-center">
                          <span className="text-burgundy font-medium">
                            Ksh {item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              Ksh {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {/* Quantity */}
                        <div className="md:w-1/6 flex items-center justify-center mt-4 md:mt-0">
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                              }
                              className="w-10 h-8 border-t border-b border-gray-300 text-center text-sm"
                            />
                            <button
                              className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {/* Subtotal - desktop */}
                        <div className="hidden md:flex md:w-1/6 items-center justify-center">
                          <span className="font-medium">
                            Ksh {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        {/* Mobile price & subtotal */}
                        <div className="flex justify-between items-center mt-4 md:hidden">
                          <div className="text-sm text-gray-500">Subtotal:</div>
                          <div className="font-medium">
                            Ksh {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Continue shopping */}
              <div className="mt-6">
                <Link
                  to="/category/all"
                  className="text-emerald font-medium flex items-center hover:underline"
                >
                  <ShoppingBagIcon size={18} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="font-serif text-xl text-navy mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>Ksh {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {shipping === 0 ? 'Free' : `Ksh ${shipping.toLocaleString()}`}
                      </span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-emerald">
                        <span>Discount (10%)</span>
                        <span>-Ksh {discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Tax</span>
                      <span>Ksh {tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-burgundy">Ksh {total.toLocaleString()}</span>
                    </div>

                  </div>
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald"
                      />
                      <button
                        className="bg-emerald text-white px-4 py-2 rounded-r-md hover:bg-emerald-light"
                        onClick={handleApplyPromo}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-sm mt-1">{promoError}</p>
                    )}
                    {promoApplied && (
                      <p className="text-emerald text-sm mt-1">
                        Promo code applied successfully!
                      </p>
                    )}
                  </div>
                  {/* Checkout Button */}
                  <Link
                    to="/checkout"
                    className="btn bg-burgundy text-white hover:bg-burgundy-light w-full flex items-center justify-center"
                  >
                    Proceed to Checkout
                    <ChevronRightIcon size={18} className="ml-2" />
                  </Link>
                  {/* Secure Checkout */}
                  <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                    <LockIcon size={14} className="mr-1" />
                    <span>Secure Checkout</span>
                  </div>
                  {/* Payment Methods */}
                  <div className="mt-4 flex items-center justify-center">
                    <CreditCardIcon size={20} className="text-gray-400 mr-2" />
                    <span className="text-gray-500 text-sm">
                      Multiple payment methods available
                    </span>
                  </div>
                </div>
              </div>
              {/* Shipping Notice */}
              <div className="mt-6 bg-emerald bg-opacity-10 rounded-lg p-4 flex items-start">
                <TruckIcon size={20} className="text-emerald mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald">
                    Free shipping on orders over $75
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {subtotal >= 75
                      ? 'Your order qualifies for free shipping!'
                      : `Add $${(75 - subtotal).toLocaleString()} more to qualify for free shipping.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <ShoppingBagIcon size={24} className="text-gray-400" />
            </div>
            <h2 className="font-serif text-xl text-navy mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/category/all"
              className="btn bg-emerald text-white hover:bg-emerald-light"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;