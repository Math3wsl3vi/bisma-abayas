import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleIcon, TruckIcon, MailIcon, ShoppingBagIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Order, OrdersService } from '../service/orderService';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        toast.error('No order ID provided.', {
          position: 'top-right',
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      try {
        const orderData = await OrdersService.getOrderById(orderId);
        if (!orderData) {
          throw new Error('Order not found.');
        }
        setOrder(orderData);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order details.';
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const getEstimatedDelivery = (shippingMethod: string) => {
    const today = new Date();
    let fromDays = 0;
    let toDays = 0;
    switch (shippingMethod) {
      case 'standard':
        fromDays = 5;
        toDays = 7;
        break;
      case 'express':
        fromDays = 2;
        toDays = 3;
        break;
      case 'overnight':
        fromDays = 1;
        toDays = 1;
        break;
      default:
        fromDays = 5;
        toDays = 7;
    }
    const fromDate = new Date(today.getTime() + fromDays * 24 * 60 * 60 * 1000);
    const toDate = new Date(today.getTime() + toDays * 24 * 60 * 60 * 1000);
    return {
      from: fromDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      to: toDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    };
  };

  const calculateOrderSummary = (order: Order) => {
    const subtotal = order.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
    const shipping = order.shipping_cost || 0;
    const tax = subtotal * 0.08; // Assuming 8% tax rate, adjust as needed
    const discount = order.items.length > 2 ? subtotal * 0.1 : 0; // Example: 10% discount for 3+ items
    const total = subtotal + shipping + tax - discount;
    return { subtotal, shipping, tax, discount, total };
  };

  if (loading) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="container-custom py-8 text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="container-custom py-8 text-center">
          <p className="text-gray-600">Order not found.</p>
          <Link to="/" className="btn btn-outlined mt-4">Return to Home</Link>
        </div>
      </div>
    );
  }

  const { subtotal, shipping, tax, discount, total } = calculateOrderSummary(order);
  const estimatedDelivery = getEstimatedDelivery(order.shipping_method);

  return (
    <div className="bg-cream min-h-screen">
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
                  {order.id.slice(-8).toUpperCase()}
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
                      Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/order-tracking?order=${order.id}`}
                      className="btn bg-emerald text-white hover:bg-emerald-light"
                    >
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
                          {estimatedDelivery.from} - {estimatedDelivery.to}
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
                          A confirmation email has been sent to {order.customer_email}.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="flex items-start">
                      <ShoppingBagIcon size={20} className="text-emerald mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Order Status</h3>
                        <p className="text-sm text-emerald">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
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
                    {order.items.map((item, index) => (
                      <div key={index} className="flex">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-navy">
                              {item.product_name}
                            </h3>
                            <span className="font-medium">
                              ${(item.unit_price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Price: ${item.unit_price.toFixed(2)} each
                          </p>
                          {item.size && (
                            <p className="text-sm text-gray-600 mt-1">
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-sm text-gray-600 mt-1">
                              Color: {item.color}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
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
                        <p>{order.customer_name}</p>
                        <p>{order.shipping_address.address}</p>
                      </div>
                    </div>
                    {/* Payment Info */}
                    <div className="md:w-1/2">
                      <h2 className="font-medium text-lg text-navy mb-2">
                        Payment Information
                      </h2>
                      <div className="text-sm text-gray-600">
                        <p>Method: {order.payment_method}</p>
                        {order.payment_method === 'credit-card' && (
                          <p>Card ending in: {order.payment_status === 'paid' ? '****' : 'N/A'}</p>
                        )}
                        <p className="mt-2">
                          Shipping Method: {order.shipping_method}
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
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-emerald">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-base pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-burgundy">${total.toFixed(2)}</span>
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
            <Link to={`/order-tracking?order=${order.id}`} className="btn bg-navy text-white hover:bg-navy-light">
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
          .btn {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmationPage;