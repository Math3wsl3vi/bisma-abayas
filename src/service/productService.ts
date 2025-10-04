// src/services/productsService.ts

import { supabaseAdmin } from "../lib/supabase"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory: string
  rating: number
  reviews: number
  sku: string
  material: string
  sizes: string[]
  colors: string[]
  isNew: boolean
  isBestseller: boolean
  inStock: boolean
  stock: number
  brand?: string
  specs?: {
    display?: string
    processor?: string
    storage?: string
  }
  created_at?: string
}

export class ProductsService {
  static async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    
    // Transform the data to match our frontend structure
    return (data || []).map(product => this.transformProduct(product))
  }

  static async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) return null
    return data ? this.transformProduct(data) : null
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(product => this.transformProduct(product)) // Fixed: was this.transformProduct(data)
  }

  static async getProductsBySubcategory(category: string, subcategory: string): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('subcategory', subcategory)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(product => this.transformProduct(product)) // Fixed: was this.transformProduct(data)
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('is_bestseller', true)
      .eq('is_active', true)
      .limit(6)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(product => this.transformProduct(product)) // Fixed: was this.transformProduct(data)
  }

  static async getNewArrivals(): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('is_new', true)
      .eq('is_active', true)
      .limit(8)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(product => this.transformProduct(product)) // Fixed: was this.transformProduct(data)
  }

  static async getProductsByBrand(brand: string): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('brand', brand)
      .eq('is_active', true)
      .order('price', { ascending: true })

    if (error) throw error
    return (data || []).map(product => this.transformProduct(product)) // Fixed: was this.transformProduct(data)
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(product => this.transformProduct(product)) // Fixed: was this.transformProduct(data)
  }

  // Helper method to transform database product to frontend product structure
  private static transformProduct(dbProduct: any): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      description: dbProduct.description,
      price: dbProduct.price / 100, // Convert from cents to dollars
      originalPrice: dbProduct.original_price ? dbProduct.original_price / 100 : undefined,
      images: dbProduct.images || [dbProduct.image_url].filter(Boolean),
      category: dbProduct.category,
      subcategory: dbProduct.subcategory,
      rating: dbProduct.rating || 0,
      reviews: dbProduct.reviews || 0,
      sku: dbProduct.sku,
      material: dbProduct.material,
      sizes: dbProduct.sizes || ['Standard'],
      colors: dbProduct.colors || [],
      isNew: dbProduct.is_new || false,
      isBestseller: dbProduct.is_bestseller || false,
      inStock: dbProduct.in_stock !== false,
      stock: dbProduct.stock || 0,
      brand: dbProduct.brand,
      specs: dbProduct.specs,
      created_at: dbProduct.created_at
    }
  }

  // Method to get products by IDs (useful for cart synchronization)
  static async getProductsByIds(ids: string[]): Promise<Product[]> {
    if (ids.length === 0) return []

    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .in('id', ids)
      .eq('is_active', true)

    if (error) throw error
    return (data || []).map(product => this.transformProduct(product)) // Fixed: was this.transformProduct(data)
  }

  // Method to check product availability
  static async checkProductAvailability(id: string, quantity: number): Promise<boolean> {
    const product = await this.getProductById(id)
    if (!product) return false
    return product.inStock && product.stock >= quantity
  }
}