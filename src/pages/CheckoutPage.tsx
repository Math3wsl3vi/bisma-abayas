import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCardIcon, LockIcon, CheckIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
const CheckoutPage = () => {
  // State for checkout steps
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    saveAddress: true,
    specialInstructions: ''
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiration: '',
    cvv: '',
    sameAsShipping: true
  });
  // Handle form input changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target as HTMLInputElement;
    setShippingInfo({
      ...shippingInfo,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  // Navigate between steps
  const nextStep = () => {
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
  // Get estimated delivery date
  const getDeliveryDate = (method: string) => {
    const today = new Date();
    let days = 0;
    switch (method) {
      case 'standard':
        days = 7;
        break;
      case 'express':
        days = 3;
        break;
      case 'overnight':
        days = 1;
        break;
      default:
        days = 7;
    }
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  // Mock order data
  const orderSummary = {
    items: [{
      name: 'Premium Silk Hijab - Emerald Green',
      price: 39.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1623060386759-6e8a5067c2c4?q=80&w=2787&auto=format&fit=crop'
    }, {
      name: 'Modal Fabric Underscarves Set - 3 Pack',
      price: 24.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=2864&auto=format&fit=crop'
    }, {
      name: 'Everyday Comfort Abaya - Navy',
      price: 89.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1624623278313-a930126a11c3?q=80&w=2787&auto=format&fit=crop'
    }],
    subtotal: 154.97,
    shipping: 0,
    tax: 12.4,
    discount: 15.5,
    total: 151.87
  };
  return <div className="bg-cream">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-2xl md:text-3xl text-navy">
            Checkout
          </h1>
          <Link to="/cart" className="text-emerald hover:underline flex items-center">
            <ChevronLeftIcon size={16} className="mr-1" />
            Return to Cart
          </Link>
        </div>
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map(step => <div key={step} className="flex-1 relative">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep > step ? 'bg-emerald text-white' : currentStep === step ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {currentStep > step ? <CheckIcon size={16} /> : step}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-medium">
                      {step === 1 && 'Shipping Information'}
                      {step === 2 && 'Shipping Method'}
                      {step === 3 && 'Payment'}
                    </div>
                  </div>
                </div>
                {step < 3 && <>
                    <div className="hidden sm:block w-full absolute top-4 border-t border-gray-200"></div>
                    <div className={`hidden sm:block absolute top-4 border-t ${currentStep > step ? 'border-emerald' : 'border-transparent'}`} style={{
                width: currentStep > step ? '100%' : '0%'
              }}></div>
                  </>}
              </div>)}
          </div>
          <div className="flex justify-between mt-2 sm:hidden text-xs">
            <span>Shipping</span>
            <span>Method</span>
            <span>Payment</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && <div className="p-6">
                  <h2 className="font-serif text-xl text-navy mb-4">
                    Shipping Information
                  </h2>
                  <div className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-burgundy">*</span>
                      </label>
                      <input type="email" name="email" value={shippingInfo.email} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                    </div>
                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-burgundy">*</span>
                        </label>
                        <input type="text" name="firstName" value={shippingInfo.firstName} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-burgundy">*</span>
                        </label>
                        <input type="text" name="lastName" value={shippingInfo.lastName} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                      </div>
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-burgundy">*</span>
                      </label>
                      <input type="tel" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                    </div>
                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address <span className="text-burgundy">*</span>
                      </label>
                      <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                    </div>
                    {/* City, State, ZIP */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-burgundy">*</span>
                        </label>
                        <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-burgundy">*</span>
                        </label>
                        <input type="text" name="state" value={shippingInfo.state} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code <span className="text-burgundy">*</span>
                        </label>
                        <input type="text" name="zip" value={shippingInfo.zip} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                      </div>
                    </div>
                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-burgundy">*</span>
                      </label>
                      <select name="country" value={shippingInfo.country} onChange={handleShippingChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    {/* Save Address */}
                    <div className="flex items-center">
                      <input type="checkbox" id="saveAddress" name="saveAddress" checked={shippingInfo.saveAddress} onChange={handleShippingChange} className="h-4 w-4 text-emerald focus:ring-emerald border-gray-300 rounded" />
                      <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-700">
                        Save this address for future orders
                      </label>
                    </div>
                    {/* Special Instructions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Delivery Instructions (Optional)
                      </label>
                      <textarea name="specialInstructions" value={shippingInfo.specialInstructions} onChange={handleShippingChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" placeholder="E.g., Leave at front door, call upon arrival, etc."></textarea>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="btn bg-burgundy text-white hover:bg-burgundy-light" onClick={nextStep}>
                      Continue to Shipping Method
                      <ChevronRightIcon size={18} className="ml-2" />
                    </button>
                  </div>
                </div>}
              {/* Step 2: Shipping Method */}
              {currentStep === 2 && <div className="p-6">
                  <h2 className="font-serif text-xl text-navy mb-4">
                    Shipping Method
                  </h2>
                  <div className="space-y-4">
                    {/* Standard Shipping */}
                    <div className={`border rounded-md p-4 cursor-pointer ${shippingMethod === 'standard' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'}`} onClick={() => setShippingMethod('standard')}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${shippingMethod === 'standard' ? 'border-emerald' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                          {shippingMethod === 'standard' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Standard Shipping
                            </span>
                            <span className="font-medium">$5.99</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            5-7 business days
                          </p>
                          <p className="text-sm text-emerald mt-1">
                            Estimated delivery: {getDeliveryDate('standard')}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Express Shipping */}
                    <div className={`border rounded-md p-4 cursor-pointer ${shippingMethod === 'express' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'}`} onClick={() => setShippingMethod('express')}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${shippingMethod === 'express' ? 'border-emerald' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                          {shippingMethod === 'express' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Express Shipping
                            </span>
                            <span className="font-medium">$12.99</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            2-3 business days
                          </p>
                          <p className="text-sm text-emerald mt-1">
                            Estimated delivery: {getDeliveryDate('express')}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Overnight Shipping */}
                    <div className={`border rounded-md p-4 cursor-pointer ${shippingMethod === 'overnight' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'}`} onClick={() => setShippingMethod('overnight')}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${shippingMethod === 'overnight' ? 'border-emerald' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                          {shippingMethod === 'overnight' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Overnight Shipping
                            </span>
                            <span className="font-medium">$24.99</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            1 business day
                          </p>
                          <p className="text-sm text-emerald mt-1">
                            Estimated delivery: {getDeliveryDate('overnight')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button className="btn btn-outlined" onClick={prevStep}>
                      <ChevronLeftIcon size={18} className="mr-2" />
                      Back to Shipping
                    </button>
                    <button className="btn bg-burgundy text-white hover:bg-burgundy-light" onClick={nextStep}>
                      Continue to Payment
                      <ChevronRightIcon size={18} className="ml-2" />
                    </button>
                  </div>
                </div>}
              {/* Step 3: Payment */}
              {currentStep === 3 && <div className="p-6">
                  <h2 className="font-serif text-xl text-navy mb-4">
                    Payment Information
                  </h2>
                  <div className="space-y-6">
                    {/* Payment Methods */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Payment Method
                      </label>
                      <div className="space-y-3">
                        {/* Credit Card */}
                        <div className={`border rounded-md p-4 cursor-pointer ${paymentInfo.paymentMethod === 'credit-card' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'}`} onClick={() => setPaymentInfo({
                      ...paymentInfo,
                      paymentMethod: 'credit-card'
                    })}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${paymentInfo.paymentMethod === 'credit-card' ? 'border-emerald' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                              {paymentInfo.paymentMethod === 'credit-card' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                            </div>
                            <div className="flex items-center">
                              <CreditCardIcon size={20} className="mr-2 text-gray-500" />
                              <span className="font-medium">
                                Credit / Debit Card
                              </span>
                            </div>
                            <div className="ml-auto flex space-x-2">
                              <div className="w-10 h-6 bg-blue-700 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  VISA
                                </span>
                              </div>
                              <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  MC
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* PayPal */}
                        <div className={`border rounded-md p-4 cursor-pointer ${paymentInfo.paymentMethod === 'paypal' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'}`} onClick={() => setPaymentInfo({
                      ...paymentInfo,
                      paymentMethod: 'paypal'
                    })}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${paymentInfo.paymentMethod === 'paypal' ? 'border-emerald' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                              {paymentInfo.paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">PayPal</span>
                            </div>
                            <div className="ml-auto">
                              <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  PP
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Apple Pay */}
                        <div className={`border rounded-md p-4 cursor-pointer ${paymentInfo.paymentMethod === 'apple-pay' ? 'border-emerald bg-emerald bg-opacity-5' : 'border-gray-200'}`} onClick={() => setPaymentInfo({
                      ...paymentInfo,
                      paymentMethod: 'apple-pay'
                    })}>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border ${paymentInfo.paymentMethod === 'apple-pay' ? 'border-emerald' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                              {paymentInfo.paymentMethod === 'apple-pay' && <div className="w-3 h-3 rounded-full bg-emerald"></div>}
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">Apple Pay</span>
                            </div>
                            <div className="ml-auto">
                              <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  AP
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Credit Card Details */}
                    {paymentInfo.paymentMethod === 'credit-card' && <div className="space-y-4 border-t border-gray-200 pt-4">
                        {/* Card Number */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number <span className="text-burgundy">*</span>
                          </label>
                          <div className="relative">
                            <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} placeholder="1234 5678 9012 3456" className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <CreditCardIcon size={20} className="text-gray-400" />
                            </div>
                          </div>
                        </div>
                        {/* Name on Card */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card{' '}
                            <span className="text-burgundy">*</span>
                          </label>
                          <input type="text" name="cardName" value={paymentInfo.cardName} onChange={handlePaymentChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                        </div>
                        {/* Expiration & CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration Date{' '}
                              <span className="text-burgundy">*</span>
                            </label>
                            <input type="text" name="expiration" value={paymentInfo.expiration} onChange={handlePaymentChange} placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV <span className="text-burgundy">*</span>
                            </label>
                            <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                          </div>
                        </div>
                        {/* Billing Address */}
                        <div className="flex items-center">
                          <input type="checkbox" id="sameAsShipping" name="sameAsShipping" checked={paymentInfo.sameAsShipping} onChange={handlePaymentChange} className="h-4 w-4 text-emerald focus:ring-emerald border-gray-300 rounded" />
                          <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                            Billing address same as shipping address
                          </label>
                        </div>
                      </div>}
                    {/* Gift Card / Store Credit */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Apply Gift Card or Store Credit
                        </label>
                        <button className="text-sm text-emerald hover:underline">
                          + Add
                        </button>
                      </div>
                    </div>
                    {/* Place Order Button */}
                    <div className="border-t border-gray-200 pt-6">
                      <Link to="/order-confirmation" className="btn bg-burgundy text-white hover:bg-burgundy-light w-full flex items-center justify-center">
                        Place Order
                      </Link>
                      <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                        <LockIcon size={14} className="mr-1" />
                        <span>Secure Payment</span>
                      </div>
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
                      <ChevronLeftIcon size={18} className="mr-2" />
                      Back to Shipping Method
                    </button>
                  </div>
                </div>}
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="font-serif text-xl text-navy mb-4">
                  Order Summary
                </h2>
                {/* Order Items */}
                <div className="max-h-80 overflow-y-auto mb-4">
                  {orderSummary.items.map((item, index) => <div key={index} className="flex py-3 border-b border-gray-100">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium text-sm text-navy">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-burgundy mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>)}
                </div>
                {/* Price Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald">
                    <span>Discount</span>
                    <span>-${orderSummary.discount.toFixed(2)}</span>
                  </div>
                </div>
                {/* Total */}
                <div className="flex justify-between font-medium border-t border-gray-200 pt-4">
                  <span>Total</span>
                  <span className="text-burgundy">
                    ${orderSummary.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {/* Order Information */}
            <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
              {currentStep >= 1 && <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Shipping Address</h3>
                    {currentStep > 1 && <button className="text-sm text-emerald hover:underline" onClick={() => setCurrentStep(1)}>
                        Edit
                      </button>}
                  </div>
                  {shippingInfo.firstName && <div className="mt-2 text-sm text-gray-600">
                      <p>
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state}{' '}
                        {shippingInfo.zip}
                      </p>
                      <p>{shippingInfo.country}</p>
                    </div>}
                </div>}
              {currentStep >= 2 && <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Shipping Method</h3>
                    {currentStep > 2 && <button className="text-sm text-emerald hover:underline" onClick={() => setCurrentStep(2)}>
                        Edit
                      </button>}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {shippingMethod === 'standard' && <p>Standard Shipping (5-7 business days)</p>}
                    {shippingMethod === 'express' && <p>Express Shipping (2-3 business days)</p>}
                    {shippingMethod === 'overnight' && <p>Overnight Shipping (1 business day)</p>}
                    <p className="text-emerald">
                      Estimated delivery: {getDeliveryDate(shippingMethod)}
                    </p>
                  </div>
                </div>}
              {currentStep >= 3 && <div className="p-4">
                  <h3 className="font-medium">Payment Method</h3>
                  <div className="mt-2 text-sm text-gray-600">
                    {paymentInfo.paymentMethod === 'credit-card' && <p>
                        Credit Card{' '}
                        {paymentInfo.cardNumber && `(**** ${paymentInfo.cardNumber.slice(-4)})`}
                      </p>}
                    {paymentInfo.paymentMethod === 'paypal' && <p>PayPal</p>}
                    {paymentInfo.paymentMethod === 'apple-pay' && <p>Apple Pay</p>}
                  </div>
                </div>}
            </div>
            {/* Contact Support */}
            <div className="mt-6 bg-emerald bg-opacity-10 rounded-lg p-4">
              <h3 className="font-medium text-emerald mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our customer service team is available to assist you with your
                order.
              </p>
              <div className="text-sm">
                <p className="mb-1">Email: support@modestelegance.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default CheckoutPage;