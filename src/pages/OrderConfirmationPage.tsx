import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, TruckIcon, MailIcon, ShoppingBagIcon } from 'lucide-react';
const OrderConfirmationPage = () => {
  // Mock order data
  const order = {
    orderNumber: 'ME-78901234',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
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
    shippingAddress: {
      name: 'Sarah Ahmed',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    },
    shippingMethod: 'Standard Shipping',
    payment: {
      method: 'Credit Card',
      last4: '4321'
    },
    subtotal: 154.97,
    shipping: 0,
    tax: 12.4,
    discount: 15.5,
    total: 151.87,
    estimatedDelivery: {
      from: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      }),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      })
    }
  };
  return <div className="bg-cream">
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon size={32} className="text-emerald" />
              </div>
              <h1 className="font-serif text-2xl md:text-3xl text-navy mb-2">
                Thank You for Your Order!
              </h1>
              <p className="text-gray-600 mb-4">
                Your order has been placed successfully.
              </p>
              <div className="bg-navy bg-opacity-5 rounded-md py-3 px-4 inline-block">
                <span className="text-navy font-medium">Order Number: </span>
                <span className="text-burgundy font-medium">
                  {order.orderNumber}
                </span>
              </div>
            </div>
            {/* Order Details */}
            <div className="border-t border-gray-100">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h2 className="font-medium text-lg text-navy mb-2">
                      Order Details
                    </h2>
                    <p className="text-sm text-gray-600">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div>
                    <Link to={`/order-tracking?order=${order.orderNumber}`} className="btn bg-emerald text-white hover:bg-emerald-light">
                      Track Your Order
                    </Link>
                  </div>
                </div>
                {/* Delivery Info */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="md:w-1/3">
                    <div className="flex items-start">
                      <TruckIcon size={20} className="text-emerald mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Estimated Delivery</h3>
                        <p className="text-sm text-gray-600">
                          {order.estimatedDelivery.from} -{' '}
                          {order.estimatedDelivery.to}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="flex items-start">
                      <MailIcon size={20} className="text-emerald mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Confirmation Email</h3>
                        <p className="text-sm text-gray-600">
                          A confirmation email has been sent to your email
                          address.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="flex items-start">
                      <ShoppingBagIcon size={20} className="text-emerald mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Order Status</h3>
                        <p className="text-sm text-emerald">Confirmed</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Order Items */}
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <h2 className="font-medium text-lg text-navy mb-4">
                    Items in Your Order
                  </h2>
                  <div className="space-y-4">
                    {order.items.map((item, index) => <div key={index} className="flex">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-navy">
                              {item.name}
                            </h3>
                            <span className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Price: ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>)}
                  </div>
                </div>
                {/* Order Summary */}
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Shipping Address */}
                    <div className="md:w-1/2">
                      <h2 className="font-medium text-lg text-navy mb-2">
                        Shipping Address
                      </h2>
                      <div className="text-sm text-gray-600">
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                          {order.shippingAddress.city},{' '}
                          {order.shippingAddress.state}{' '}
                          {order.shippingAddress.zip}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                    {/* Payment Info */}
                    <div className="md:w-1/2">
                      <h2 className="font-medium text-lg text-navy mb-2">
                        Payment Information
                      </h2>
                      <div className="text-sm text-gray-600">
                        <p>Method: {order.payment.method}</p>
                        <p>Card ending in: {order.payment.last4}</p>
                        <p className="mt-2">
                          Shipping Method: {order.shippingMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Order Total */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="max-w-xs ml-auto">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>
                          {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald">
                        <span>Discount</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-base pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-burgundy">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="btn btn-outlined">
              Continue Shopping
            </Link>
            <Link to="/order-tracking" className="btn bg-navy text-white hover:bg-navy-light">
              Track Your Order
            </Link>
          </div>
          {/* Support Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              If you have any questions about your order, please contact our
              customer support:
            </p>
            <p className="mt-2">
              <a href="mailto:support@modestelegance.com" className="text-emerald hover:underline">
                support@modestelegance.com
              </a>{' '}
              |{' '}
              <a href="tel:+15551234567" className="text-emerald hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default OrderConfirmationPage;