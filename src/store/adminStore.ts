import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabaseAdmin } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  specs: {
    size?: string;
    color?: string;
  };
  brand: string;
  category: string;
  colors: string[];
  stock: number;
  is_new: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id?: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: { address: string };
  shipping_method: string;
  shipping_cost: number;
  customer_email: string;
  customer_phone: string;
  customer_name: string;
  created_at: string;
  updated_at?: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product_name: string;
  product_image: string;
  size?: string;
  color?: string;
}

interface AdminStore {
  products: Product[];
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'is_active'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  getStats: () => {
    totalProducts: number;
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
  };
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      products: [],
      orders: [],
      loading: false,
      error: null,

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabaseAdmin
            .from('products')
            .select('id, name, description, price, image_url, specs, brand, category, colors, stock, is_new, is_active, created_at')
            .order('created_at', { ascending: false });

          if (error) throw new Error(`Failed to fetch products: ${error.message}`);
          set({ products: data || [] });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
          set({ error: errorMessage });
          console.error('Error fetching products:', error);
        } finally {
          set({ loading: false });
        }
      },

      addProduct: async (productData) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabaseAdmin
            .from('products')
            .insert([{
              ...productData,
              is_active: true,
              created_at: new Date().toISOString(),
            }])
            .select()
            .single();

          if (error) throw new Error(`Failed to add product: ${error.message}`);

          set((state) => ({
            products: [data, ...state.products],
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to add product';
          set({ error: errorMessage });
          console.error('Error adding product:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateProduct: async (id, productData) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabaseAdmin
            .from('products')
            .update(productData)
            .eq('id', id)
            .select()
            .single();

          if (error) throw new Error(`Failed to update product: ${error.message}`);

          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
          set({ error: errorMessage });
          console.error('Error updating product:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabaseAdmin
            .from('products')
            .delete()
            .eq('id', id);

          if (error) throw new Error(`Failed to delete product: ${error.message}`);

          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
          set({ error: errorMessage });
          console.error('Error deleting product:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      fetchOrders: async () => {
        set({ loading: true, error: null });
        try {
          const { data: orders, error: ordersError } = await supabaseAdmin
            .from('orders')
            .select('id, customer_id, total_amount, status, payment_method, payment_status, shipping_address, shipping_method, shipping_cost, customer_email, customer_phone, customer_name, created_at, updated_at')
            .order('created_at', { ascending: false });

          if (ordersError) throw new Error(`Failed to fetch orders: ${ordersError.message}`);

          // Fetch order items for each order
          const ordersWithItems = await Promise.all(
            (orders || []).map(async (order) => {
              const { data: items, error: itemsError } = await supabaseAdmin
                .from('order_items')
                .select('id, product_id, quantity, unit_price, product_name, product_image, size, color')
                .eq('order_id', order.id);

              if (itemsError) throw new Error(`Failed to fetch order items: ${itemsError.message}`);

              return {
                ...order,
                items: items || [],
              };
            })
          );

          set({ orders: ordersWithItems });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';
          set({ error: errorMessage });
          console.error('Error fetching orders:', error);
        } finally {
          set({ loading: false });
        }
      },

      getOrderById: async (orderId: string): Promise<Order | null> => {
        try {
          const { data: order, error } = await supabaseAdmin
            .from('orders')
            .select(`
              id,
              customer_id,
              total_amount,
              status,
              payment_method,
              payment_status,
              shipping_address,
              shipping_method,
              shipping_cost,
              customer_email,
              customer_phone,
              customer_name,
              created_at,
              updated_at,
              order_items (
                id,
                product_id,
                quantity,
                unit_price,
                product_name,
                product_image,
                size,
                color
              )
            `)
            .eq('id', orderId)
            .single();

          if (error) {
            console.error('Error fetching order:', error);
            throw new Error(`Failed to fetch order: ${error.message}`);
          }

          if (!order) {
            return null;
          }

          // Transform the data to match the Order interface
          const transformedOrder: Order = {
            ...order,
            items: order.order_items || [],
          };

          // Remove the nested order_items field to avoid duplication
          delete (transformedOrder as any).order_items;

          console.log('Fetched order with items:', transformedOrder);
          return transformedOrder;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order';
          console.error('Error in getOrderById:', error);
          throw new Error(errorMessage);
        }
      },

      updateOrderStatus: async (orderId, status) => {
        set({ loading: true, error: null });
        try {
          // Get the current order before updating
          const { data: currentOrder, error: fetchError } = await supabaseAdmin
            .from('orders')
            .select('*, order_items(id, product_id, quantity, unit_price, product_name, product_image, size, color)')
            .eq('id', orderId)
            .single();

          if (fetchError) throw new Error(`Failed to fetch order: ${fetchError.message}`);

          const previousStatus = currentOrder.status;

          // Update order status
          const { error: updateError } = await supabaseAdmin
            .from('orders')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', orderId);

          if (updateError) throw new Error(`Failed to update order status: ${updateError.message}`);

          // If order is being marked as shipped or delivered for the first time, reduce stock
          if ((status === 'shipped' || status === 'delivered') && 
              previousStatus !== 'shipped' && previousStatus !== 'delivered') {
            
            // Reduce stock for each item in the order
            for (const item of currentOrder.order_items) {
              // Get current product stock
              const { data: product, error: productError } = await supabaseAdmin
                .from('products')
                .select('stock')
                .eq('id', item.product_id)
                .single();

              if (productError) {
                console.error('Error fetching product:', productError);
                continue;
              }

              // Update product stock
              const newStock = Math.max(0, product.stock - item.quantity);
              
              const { error: stockError } = await supabaseAdmin
                .from('products')
                .update({ stock: newStock })
                .eq('id', item.product_id);

              if (stockError) {
                console.error('Error updating product stock:', stockError);
              }
            }

            // Refresh products in the store
            const { data: updatedProducts } = await supabaseAdmin
              .from('products')
              .select('id, name, description, price, image_url, specs, brand, category, colors, stock, is_new, is_active, created_at')
              .order('created_at', { ascending: false });

            if (updatedProducts) {
              set({ products: updatedProducts });
            }
          }

          // Update orders in state
          set((state) => ({
            orders: state.orders.map((order) =>
              order.id === orderId ? { ...order, status } : order
            ),
          }));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update order status';
          set({ error: errorMessage });
          console.error('Error updating order status:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      getStats: () => {
        const state = get();
        const totalProducts = state.products.length;
        const totalOrders = state.orders.length;
        const pendingOrders = state.orders.filter(order => order.status === 'pending').length;
        const totalRevenue = state.orders
          .filter(order => order.status === 'delivered')
          .reduce((sum, order) => sum + order.total_amount, 0);

        return {
          totalProducts,
          totalOrders,
          pendingOrders,
          totalRevenue
        };
      }
    }),
    {
      name: 'bisma-admin-storage',
      partialize: (state) => ({ 
        products: state.products,
        orders: state.orders 
      }),
    }
  )
);