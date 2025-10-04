// src/store/cartStore.ts (updated)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, ProductsService } from '../service/productService'

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  product_id: string
  sku: string
  material?: string
  size: string
  color: string
  category: string
  subcategory: string
}

interface CartStore {
  cartItems: CartItem[]
  products: Product[] // Cache for product data
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  loadProducts: () => Promise<void>
  syncCartWithProducts: () => Promise<void>
  getItemCount: () => number
  getCartSummary: () => {
    totalItems: number
    subtotal: number
    totalDiscount: number
    total: number
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      products: [],
      
      addToCart: (item) => {
        set((state) => {
          // Create unique ID combining product ID, size, and color for variant tracking
          const variantId = `${item.product_id}-${item.size}-${item.color.replace(/,/g, '').replace(/\s+/g, '-').toLowerCase()}`
          
          const existing = state.cartItems.find((i) => i.id === variantId)
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === variantId 
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) } 
                  : i
              ),
            }
          }
          return { 
            cartItems: [...state.cartItems, { 
              ...item, 
              id: variantId,
              quantity: item.quantity || 1 
            }] 
          }
        })
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }
        
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => {
        set({ cartItems: [] })
      },

      loadProducts: async () => {
        try {
          const products = await ProductsService.getAllProducts()
          set({ products })
          console.log('Products loaded:', products.length)
        } catch (error) {
          console.error('Failed to load products:', error)
        }
      },

      syncCartWithProducts: async () => {
        try {
          const { cartItems } = get()
          const productIds = [...new Set(cartItems.map(item => item.product_id))]
          const products = await ProductsService.getProductsByIds(productIds)
          
          // Update cart items with latest product data
          const updatedCartItems = cartItems.map(cartItem => {
            const currentProduct = products.find(p => p.id === cartItem.product_id)
            if (currentProduct) {
              // Check if product is still available
              if (!currentProduct.inStock || currentProduct.stock < cartItem.quantity) {
                return null // Remove unavailable items
              }
              
              return {
                ...cartItem,
                price: currentProduct.price,
                originalPrice: currentProduct.originalPrice,
                name: currentProduct.name,
                image: currentProduct.images[0] || cartItem.image,
                // Keep variant-specific properties like size, color, etc.
              }
            }
            return null // Remove items if product no longer exists
          }).filter(Boolean) as CartItem[]
          
          set({ cartItems: updatedCartItems, products })
          console.log('Cart synchronized with latest products')
        } catch (error) {
          console.error('Failed to sync cart with products:', error)
        }
      },

      getItemCount: () => {
        const { cartItems } = get()
        return cartItems.reduce((total, item) => total + item.quantity, 0)
      },

      getCartSummary: () => {
        const { cartItems } = get()
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const totalDiscount = cartItems.reduce((sum, item) => {
          const discount = (item.originalPrice || item.price) - item.price
          return sum + (discount > 0 ? discount * item.quantity : 0)
        }, 0)
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
        
        return {
          totalItems,
          subtotal,
          totalDiscount,
          total: subtotal
        }
      }
    }),
    {
      name: 'bisma-cart-storage',
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
)

// Computed selectors
export const useCartTotal = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export const useCartItemCount = () => useCartStore(state => state.getItemCount())

export const useCartSummary = () => useCartStore(state => state.getCartSummary())