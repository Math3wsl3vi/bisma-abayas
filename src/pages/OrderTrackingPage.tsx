import React, { useState } from 'react';
import { SearchIcon, TruckIcon, PackageIcon, CheckCircleIcon, ClipboardCheckIcon, MapPinIcon } from 'lucide-react';
const OrderTrackingPage = () => {
  // State for tracking form
  const [trackingInfo, setTrackingInfo] = useState({
    orderNumber: '',
    email: ''
  });
  // State to track if form has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setTrackingInfo({
      ...trackingInfo,
      [name]: value
    });
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('tracking-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 100);
  };
  // Mock shipment data
  const shipmentData = {
    orderNumber: 'ME-78901234',
    status: 'shipped',
    trackingNumber: '1ZW4567890123456789',
    carrier: 'UPS',
    estimatedDelivery: 'May 15, 2023',
    shippingAddress: {
      name: 'Sarah Ahmed',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    },
    items: [{
      name: 'Premium Silk Hijab - Emerald Green',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1623060386759-6e8a5067c2c4?q=80&w=2787&auto=format&fit=crop'
    }, {
      name: 'Modal Fabric Underscarves Set - 3 Pack',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=2864&auto=format&fit=crop'
    }, {
      name: 'Everyday Comfort Abaya - Navy',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1624623278313-a930126a11c3?q=80&w=2787&auto=format&fit=crop'
    }],
    updates: [{
      status: 'Order Confirmed',
      date: 'May 8, 2023',
      time: '10:32 AM',
      description: 'Your order has been confirmed and is being processed.'
    }, {
      status: 'Processing',
      date: 'May 9, 2023',
      time: '2:15 PM',
      description: 'Your order is being prepared for shipment.'
    }, {
      status: 'Shipped',
      date: 'May 10, 2023',
      time: '11:05 AM',
      description: 'Your order has been shipped and is on its way.'
    }]
  };
  // Get the current status step
  const getCurrentStep = () => {
    switch (shipmentData.status) {
      case 'confirmed':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
        return 3;
      case 'out-for-delivery':
        return 4;
      case 'delivered':
        return 5;
      default:
        return 1;
    }
  };
  return <div className="bg-cream">
      <div className="container-custom py-8">
        <h1 className="font-serif text-2xl md:text-3xl text-navy mb-6 text-center">
          Track Your Order
        </h1>
        <div className="max-w-3xl mx-auto">
          {/* Tracking Form */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center">
                Enter your order number and email address to track the status of
                your order.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Number <span className="text-burgundy">*</span>
                    </label>
                    <input type="text" name="orderNumber" value={trackingInfo.orderNumber} onChange={handleChange} placeholder="e.g., ME-12345678" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-burgundy">*</span>
                    </label>
                    <input type="email" name="email" value={trackingInfo.email} onChange={handleChange} placeholder="Enter the email used for your order" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald" required />
                  </div>
                </div>
                <div className="mt-6">
                  <button type="submit" className="btn bg-burgundy text-white hover:bg-burgundy-light w-full flex items-center justify-center">
                    <SearchIcon size={18} className="mr-2" />
                    Track Order
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Tracking Results */}
          {isSubmitted && <div id="tracking-results" className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-xl text-navy mb-1">
                      Order #{shipmentData.orderNumber}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Tracking Number:{' '}
                      <a href="#" className="text-emerald hover:underline">
                        {shipmentData.trackingNumber}
                      </a>{' '}
                      ({shipmentData.carrier})
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-600">
                      Estimated Delivery:{' '}
                      <span className="font-medium">
                        {shipmentData.estimatedDelivery}
                      </span>
                    </p>
                  </div>
                </div>
                {/* Progress Tracker */}
                <div className="mb-10">
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-200"></div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-emerald transition-all duration-500" style={{
                  width: `${(getCurrentStep() - 1) * 25}%`
                }}></div>
                    <div className="relative flex justify-between">
                      {/* Order Confirmed */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${getCurrentStep() >= 1 ? 'bg-emerald text-white' : 'bg-gray-200 text-gray-500'}`}>
                          <ClipboardCheckIcon size={20} />
                        </div>
                        <span className="text-xs mt-2 text-center">
                          Order
                          <br />
                          Confirmed
                        </span>
                      </div>
                      {/* Processing */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${getCurrentStep() >= 2 ? 'bg-emerald text-white' : 'bg-gray-200 text-gray-500'}`}>
                          <PackageIcon size={20} />
                        </div>
                        <span className="text-xs mt-2 text-center">
                          Processing
                        </span>
                      </div>
                      {/* Shipped */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${getCurrentStep() >= 3 ? 'bg-emerald text-white' : 'bg-gray-200 text-gray-500'}`}>
                          <TruckIcon size={20} />
                        </div>
                        <span className="text-xs mt-2 text-center">
                          Shipped
                        </span>
                      </div>
                      {/* Out for Delivery */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${getCurrentStep() >= 4 ? 'bg-emerald text-white' : 'bg-gray-200 text-gray-500'}`}>
                          <MapPinIcon size={20} />
                        </div>
                        <span className="text-xs mt-2 text-center">
                          Out for
                          <br />
                          Delivery
                        </span>
                      </div>
                      {/* Delivered */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${getCurrentStep() >= 5 ? 'bg-emerald text-white' : 'bg-gray-200 text-gray-500'}`}>
                          <CheckCircleIcon size={20} />
                        </div>
                        <span className="text-xs mt-2 text-center">
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Shipment Details */}
                  <div>
                    <h3 className="font-medium text-navy mb-4">
                      Shipment Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm text-gray-600 mb-1">
                          Shipping Address:
                        </h4>
                        <div className="text-sm">
                          <p>{shipmentData.shippingAddress.name}</p>
                          <p>{shipmentData.shippingAddress.address}</p>
                          <p>
                            {shipmentData.shippingAddress.city},{' '}
                            {shipmentData.shippingAddress.state}{' '}
                            {shipmentData.shippingAddress.zip}
                          </p>
                          <p>{shipmentData.shippingAddress.country}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-600 mb-1">
                          Items in this shipment:
                        </h4>
                        <div className="space-y-3">
                          {shipmentData.items.map((item, index) => <div key={index} className="flex items-center">
                              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Shipment Updates */}
                  <div>
                    <h3 className="font-medium text-navy mb-4">
                      Shipment Updates
                    </h3>
                    <div className="relative pl-6 border-l border-gray-200">
                      {shipmentData.updates.map((update, index) => <div key={index} className={`mb-6 ${index === 0 ? 'relative' : ''}`}>
                          {index === 0 && <div className="absolute -left-9 top-0 w-4 h-4 rounded-full bg-emerald border-4 border-cream"></div>}
                          <div className="absolute -left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-emerald bg-white"></div>
                          <div>
                            <div className="flex justify-between">
                              <h4 className="font-medium">{update.status}</h4>
                              <span className="text-xs text-gray-500">
                                {update.date}, {update.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {update.description}
                            </p>
                          </div>
                        </div>)}
                    </div>
                    <div className="mt-6">
                      <a href={`https://www.ups.com/track?tracknum=${shipmentData.trackingNumber}`} target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline flex items-center text-sm">
                        <TruckIcon size={16} className="mr-1" />
                        Track with {shipmentData.carrier}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
                  <button className="btn btn-outlined">Contact Support</button>
                  <a href="#" className="text-emerald hover:underline">
                    View Order Details
                  </a>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default OrderTrackingPage;