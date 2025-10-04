"use client";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCardIcon, LockIcon, CheckIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartStore, useCartSummary } from '../store/cartStore';
import { CartItemForOrder, Order, OrdersService } from '../service/orderService';

interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  saveAddress: boolean;
  specialInstructions: string;
}

interface PaymentInfo {
  paymentMethod: 'credit-card' | 'paypal' | 'apple-pay';
  cardNumber: string;
  cardName: string;
  expiration: string;
  cvv: string;
  sameAsShipping: boolean;
}

const CheckoutPage = () => {
  const { cartItems, clearCart, getCartSummary } = useCartStore();
  const cartSummary = useCartSummary();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Includes confirmation step
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Kenya',
    saveAddress: true,
    specialInstructions: ''
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiration: '',
    cvv: '',
    sameAsShipping: true
  });
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setShippingInfo({
      ...shippingInfo,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!shippingInfo.email || !shippingInfo.firstName || !shippingInfo.lastName ||
          !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city ||
          !shippingInfo.state || !shippingInfo.zip || !shippingInfo.country) {
        toast.error("Please fill in all required shipping fields.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }
    if (currentStep === 3 && paymentInfo.paymentMethod === 'credit-card') {
      if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiration || !paymentInfo.cvv) {
        toast.error("Please fill in all required payment fields.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const getDeliveryDate = (method: string) => {
    const today = new Date();
    let days = 0;
    switch (method) {
      case 'standard': days = 7; break;
      case 'express': days = 3; break;
      case 'overnight': days = 1; break;
      default: days = 7;
    }
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const getShippingCost = (method: string) => {
    switch (method) {
      case 'standard': return 5.99;
      case 'express': return 12.99;
      case 'overnight': return 24.99;
      default: return 5.99;
    }
  };

const handlePlaceOrder = async () => {
  if (cartItems.length === 0) {
    toast.error("Your cart is empty.", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }

  setLoading(true);

  try {
    const shippingCost = getShippingCost(shippingMethod);
    const totalAmount = cartSummary.total + shippingCost;

    const orderData: Parameters<typeof OrdersService.createOrder>[0] = {
      customer_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      customer_email: shippingInfo.email,
      customer_phone: shippingInfo.phone,
      shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}, ${shippingInfo.country}${shippingInfo.specialInstructions ? `, Instructions: ${shippingInfo.specialInstructions}` : ''}`,
      payment_method: paymentInfo.paymentMethod,
      shipping_method: shippingMethod, // Add this
      shipping_cost: shippingCost, // Add this
      total_amount: totalAmount,
      items: cartItems.map(item => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        size: item.size, // Make sure these are included
        color: item.color // Make sure these are included
      } as CartItemForOrder))
    };

    const order = await OrdersService.createOrder(orderData);
    setOrderDetails(order);
    clearCart();
    nextStep();

    toast.success(`Order placed successfully! Order ID: ${order.id.slice(-8).toUpperCase()}`, {
      position: "top-right",
      autoClose: 3000,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to place order. Please try again.";
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000,
    });
  } finally {
    setLoading(false);
  }
};

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleCloseReceipt = () => {
    setOrderDetails(null);
    navigate("/");
  };

  return (
    <div className="bg-cream min-h-screen">
      <ToastContainer />
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-2xl md:text-3xl text-navy">Checkout</h1>
          <Link to="/cart" className="text-emerald hover:underline flex items-center">
            <ChevronLeftIcon size={16} className="mr-1" /> Return to Cart
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex-1 relative">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > step ? 'bg-emerald text-white' :
                    currentStep === step ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step ? <CheckIcon size={16} /> : step}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-medium z-50">
                      {step === 1 && 'Shipping Information'}
                      {step === 2 && 'Shipping Method'}
                      {step === 3 && 'Payment'}
                      {step === 4 && 'Confirmation'}
                    </div>
                  </div>
                </div>
                {step < 4 && (
                  <>
                    <div className="hidden sm:block w-full absolute top-4 border-t border-gray-200"></div>
                    <div className={`hidden sm:block absolute top-4 border-t ${
                      currentStep > step ? 'border-emerald' : 'border-transparent'
                    }`} style={{ width: currentStep > step ? '100%' : '0%' }}></div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 sm:hidden text-xs">
            <span>Shipping</span>
            <span>Method</span>
            <span>Payment</span>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="p-6">
                  <h2 className="font-serif text-xl text-navy mb-4">Shipping Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-burgundy">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-burgundy">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-burgundy">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-burgundy">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address <span className="text-burgundy">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-burgundy">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-burgundy">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code <span className="text-burgundy">*</span>
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={shippingInfo.zip}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-burgundy">*</span>
                      </label>
                      <select
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                        required
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveAddress"
                        name="saveAddress"
                        checked={shippingInfo.saveAddress}
                        onChange={handleShippingChange}
                        className="h-4 w-4 text-emerald focus:ring-emerald border-gray-300 rounded"
                      />
                      <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-700">
                        Save this address for future orders
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Delivery Instructions (Optional)
                      </label>
                      <textarea
                        name="specialInstructions"
                        value={shippingInfo.specialInstructions}
                        onChange={handleShippingChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                        placeholder="E.g., Leave at front door, call upon arrival, etc."
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      className="btn bg-burgundy text-white hover:bg-burgundy-light"
                      onClick={nextStep}
                    >
                      Continue to Shipping Method
                      <ChevronRightIcon size={18} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              {/* Step 2: Shipping Method */}
              {currentStep === 2 && (
                <div className="p-6">
                  <h2 className="font-serif text-xl text-navy mb-4">Shipping Method</h2>
                  <div className="space-y-4">
                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        shippingMethod === 'standard' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'
                      }`}
                      onClick={() => setShippingMethod('standard')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${
                          shippingMethod === 'standard' ? 'border-emerald' : 'border-gray-300'
                        } flex items-center justify-center mr-3`}>
                          {shippingMethod === 'standard' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">Standard Shipping</span>
                            <span className="font-medium">$5.99</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">5-7 business days</p>
                          <p className="text-sm text-emerald mt-1">
                            Estimated delivery: {getDeliveryDate('standard')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        shippingMethod === 'express' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'
                      }`}
                      onClick={() => setShippingMethod('express')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${
                          shippingMethod === 'express' ? 'border-emerald' : 'border-gray-300'
                        } flex items-center justify-center mr-3`}>
                          {shippingMethod === 'express' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">Express Shipping</span>
                            <span className="font-medium">Ksh 1200</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">2-3 business days</p>
                          <p className="text-sm text-emerald mt-1">
                            Estimated delivery: {getDeliveryDate('express')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        shippingMethod === 'overnight' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'
                      }`}
                      onClick={() => setShippingMethod('overnight')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${
                          shippingMethod === 'overnight' ? 'border-emerald' : 'border-gray-300'
                        } flex items-center justify-center mr-3`}>
                          {shippingMethod === 'overnight' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">Overnight Shipping</span>
                            <span className="font-medium">Ksh 1300</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">1 business day</p>
                          <p className="text-sm text-emerald mt-1">
                            Estimated delivery: {getDeliveryDate('overnight')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button className="btn btn-outlined" onClick={prevStep}>
                      <ChevronLeftIcon size={18} className="mr-2" /> Back to Shipping
                    </button>
                    <button
                      className="btn bg-burgundy text-white hover:bg-burgundy-light"
                      onClick={nextStep}
                    >
                      Continue to Payment
                      <ChevronRightIcon size={18} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="p-6">
                  <h2 className="font-serif text-xl text-navy mb-4">Payment Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                      <div className="space-y-3">
                        <div
                          className={`border rounded-md p-4 cursor-pointer ${
                            paymentInfo.paymentMethod === 'credit-card' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'
                          }`}
                          onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'credit-card' })}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${
                              paymentInfo.paymentMethod === 'credit-card' ? 'border-emerald' : 'border-gray-300'
                            } flex items-center justify-center mr-3`}>
                              {paymentInfo.paymentMethod === 'credit-card' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                            </div>
                            <div className="flex items-center">
                              <CreditCardIcon size={20} className="mr-2 text-gray-500" />
                              <span className="font-medium">Credit / Debit Card</span>
                            </div>
                            <div className="ml-auto flex space-x-2">
                              <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">VISA</span>
                              </div>
                              <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">MC</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`border rounded-md p-4 cursor-pointer ${
                            paymentInfo.paymentMethod === 'paypal' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'
                          }`}
                          onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'paypal' })}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${
                              paymentInfo.paymentMethod === 'paypal' ? 'border-emerald' : 'border-gray-300'
                            } flex items-center justify-center mr-3`}>
                              {paymentInfo.paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">PayPal</span>
                            </div>
                            <div className="ml-auto">
                              <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">PP</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`border rounded-md p-4 cursor-pointer ${
                            paymentInfo.paymentMethod === 'apple-pay' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'
                          }`}
                          onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: 'apple-pay' })}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${
                              paymentInfo.paymentMethod === 'apple-pay' ? 'border-emerald' : 'border-gray-300'
                            } flex items-center justify-center mr-3`}>
                              {paymentInfo.paymentMethod === 'apple-pay' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">Apple Pay</span>
                            </div>
                            <div className="ml-auto">
                              <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">AP</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {paymentInfo.paymentMethod === 'credit-card' && (
                      <div className="space-y-4 border-t border-gray-200 pt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number <span className="text-burgundy">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                              required
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <CreditCardIcon size={20} className="text-gray-400" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card <span className="text-burgundy">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={handlePaymentChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration Date <span className="text-burgundy">*</span>
                            </label>
                            <input
                              type="text"
                              name="expiration"
                              value={paymentInfo.expiration}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV <span className="text-burgundy">*</span>
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sameAsShipping"
                            name="sameAsShipping"
                            checked={paymentInfo.sameAsShipping}
                            onChange={handlePaymentChange}
                            className="h-4 w-4 text-emerald focus:ring-emerald border-gray-300 rounded"
                          />
                          <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                            Billing address same as shipping address
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-6">
                      <button
                        className="btn bg-burgundy text-white hover:bg-burgundy-light w-full flex items-center justify-center"
                        onClick={handlePlaceOrder}
                        disabled={loading || cartItems.length === 0}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Placing Order...
                          </>
                        ) : (
                          <>
                            Place Order
                            <LockIcon size={14} className="ml-2" />
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        By placing your order, you agree to our{' '}
                        <Link to="/terms-conditions" className="text-emerald hover:underline">
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy-policy" className="text-emerald hover:underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-start">
                    <button className="btn btn-outlined" onClick={prevStep}>
                      <ChevronLeftIcon size={18} className="mr-2" /> Back to Shipping Method
                    </button>
                  </div>
                </div>
              )}
              {/* Step 4: Confirmation */}
              {currentStep === 4 && orderDetails && (
                <div className="p-6 print:p-4">
                  <h2 className="font-serif text-xl text-navy mb-4 print:text-base">Order Confirmation</h2>
                  <div className="space-y-6 print:space-y-4">
                    <div>
                      <p className="text-lg font-medium print:text-base">
                        Order ID: {orderDetails.id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600 print:text-xs">
                        Placed on: {orderDetails.created_at}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold print:text-base">Customer Details</h3>
                      <p className="text-sm print:text-xs">Name: {orderDetails.customer_name}</p>
                      <p className="text-sm print:text-xs">Email: {orderDetails.customer_email}</p>
                      <p className="text-sm print:text-xs">Phone: {orderDetails.customer_phone}</p>
                      <p className="text-sm print:text-xs">Address: {orderDetails.shipping_address.address}</p>
                      <p className="text-sm print:text-xs">Payment Method: {orderDetails.payment_method}</p>
                      <p className="text-sm print:text-xs">Status: {orderDetails.status}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold print:text-base">Order Items</h3>
                      {orderDetails.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 mb-4 print:mb-2 print:flex print:items-start">
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="w-16 h-16 object-cover rounded-lg print:w-12 print:h-12 print:rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm print:text-xs">{item.product_name}</p>
                            <p className="text-sm text-gray-500 print:text-xs">Qty: {item.quantity}</p>
                            <p className="font-medium text-sm print:text-xs">
                              Ksh {(item.unit_price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 print:pt-2">
                      <div className="flex justify-between text-lg font-semibold print:text-base">
                        <span>Total</span>
                        <span>Ksh {orderDetails.total_amount.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex gap-4 print:hidden">
                      <button
                        onClick={handlePrintReceipt}
                        className="btn bg-green-600 text-white hover:bg-green-700"
                      >
                        Print Receipt
                      </button>
                      <button
                        onClick={handleCloseReceipt}
                        className="btn bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="font-serif text-xl text-navy mb-4">Order Summary</h2>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <div className="max-h-80 overflow-y-auto mb-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex py-3 border-b border-gray-100">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium text-sm text-navy">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                          <p className="text-xs text-gray-500 mt-1">Color: {item.color}</p>
                          <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                          <p className="text-sm text-burgundy mt-1">Ksh{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Ksh {cartSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>Ksh {getShippingCost(shippingMethod).toFixed(2)}</span>
                  </div>
                  {cartSummary.totalDiscount > 0 && (
                    <div className="flex justify-between text-sm text-emerald">
                      <span>Discount</span>
                      <span>-Ksh {cartSummary.totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between font-medium border-t border-gray-200 pt-4">
                  <span>Total</span>
                  <span className="text-burgundy">Ksh {(cartSummary.total + getShippingCost(shippingMethod)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            {currentStep >= 1 && (
              <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Shipping Address</h3>
                    {currentStep > 1 && (
                      <button
                        className="text-sm text-emerald hover:underline"
                        onClick={() => setCurrentStep(1)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  {shippingInfo.firstName && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                      <p>{shippingInfo.country}</p>
                      {shippingInfo.specialInstructions && (
                        <p>Instructions: {shippingInfo.specialInstructions}</p>
                      )}
                    </div>
                  )}
                </div>
                {currentStep >= 2 && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Shipping Method</h3>
                      {currentStep > 2 && (
                        <button
                          className="text-sm text-emerald hover:underline"
                          onClick={() => setCurrentStep(2)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {shippingMethod === 'standard' && <p>Standard Shipping (5-7 business days)</p>}
                      {shippingMethod === 'express' && <p>Express Shipping (2-3 business days)</p>}
                      {shippingMethod === 'overnight' && <p>Overnight Shipping (1 business day)</p>}
                      <p className="text-emerald">Estimated delivery: {getDeliveryDate(shippingMethod

)}</p>
                    </div>
                  </div>
                )}
                {currentStep >= 3 && (
                  <div className="p-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="mt-2 text-sm text-gray-600">
                      {paymentInfo.paymentMethod === 'credit-card' && (
                        <p>Credit Card {paymentInfo.cardNumber && `(**** Ksh {paymentInfo.cardNumber.slice(-4)})`}</p>
                      )}
                      {paymentInfo.paymentMethod === 'paypal' && <p>PayPal</p>}
                      {paymentInfo.paymentMethod === 'apple-pay' && <p>Apple Pay</p>}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="mt-6 bg-emerald bg-opacity-10 rounded-lg p-4">
              <h3 className="font-medium text-emerald mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our customer service team is available to assist you with your order.
              </p>
              <div className="text-sm">
                <p className="mb-1">Email: support@modestelegance.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container-custom {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .container-custom * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-4 {
            padding: 1rem !important;
          }
          .print\\:text-base {
            font-size: 1rem !important;
          }
          .print\\:text-xs {
            font-size: 0.75rem !important;
          }
          .print\\:w-12 {
            width: 3rem !important;
          }
          .print\\:h-12 {
            height: 3rem !important;
          }
          .print\\:mb-2 {
            margin-bottom: 0.5rem !important;
          }
          .print\\:rounded {
            border-radius: 0.25rem !important;
          }
          .print\\:pt-2 {
            padding-top: 0.5rem !important;
          }
          .print\\:space-y-4 > * + * {
            margin-top: 1rem !important;
          }
          .print\\:flex {
            display: flex !important;
          }
          .print\\:items-start {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;