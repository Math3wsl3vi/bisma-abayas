import React, { useState, useEffect } from 'react';
import { useAdminStore, Product } from '../../store/adminStore';
import { X } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const { addProduct, updateProduct, loading, error } = useAdminStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    images: [] as string[],
    price: 0,
    original_price: 0,
    brand: '',
    category: '',
    subcategory: '',
    material: '',
    sizes: [] as string[],
    colors: [] as string[],
    stock: 0,
    is_new: false,
    is_bestseller: false,
    rating: 0,
    reviews: 0,
    sku: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        image_url: product.image_url,
        images: product.images || [],
        price: product.price,
        original_price: product.original_price || product.price,
        brand: product.brand || '',
        category: product.category,
        subcategory: product.subcategory || '',
        material: product.material || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        stock: product.stock,
        is_new: product.is_new,
        is_bestseller: product.is_bestseller || false,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        sku: product.sku || '',
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      image_url: formData.image_url,
      images: formData.images,
      price: formData.price,
      original_price: formData.original_price,
      brand: formData.brand,
      category: formData.category,
      subcategory: formData.subcategory,
      material: formData.material,
      sizes: formData.sizes,
      colors: formData.colors,
      stock: formData.stock,
      is_new: formData.is_new,
      is_bestseller: formData.is_bestseller,
      rating: formData.rating,
      reviews: formData.reviews,
      sku: formData.sku,
      specs: {
        size: formData.sizes.length > 0 ? formData.sizes[0] : undefined,
        color: formData.colors.length > 0 ? formData.colors[0] : undefined,
      },
    };

    try {
      if (product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }
      onClose();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleImageUrlChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      image_url: value,
      images: value ? [value] : [] // Also populate images array
    }));
  };

  const handleSizesChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      sizes: value ? value.split(',').map(s => s.trim()) : [] 
    }));
  };

  const handleColorsChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      colors: value ? value.split(',').map(c => c.trim()) : [] 
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., HIJ-SLK-EMR-001"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                required
                value={formData.image_url}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (Ksh) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (Ksh)
              </label>
              <input
                type="number"
                min="0"
                value={formData.original_price}
                onChange={(e) => setFormData(prev => ({ ...prev, original_price: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Material */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 100% Silk"
              />
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sizes
              </label>
              <input
                type="text"
                value={formData.sizes.join(', ')}
                onChange={(e) => handleSizesChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., S, M, L, XL (comma separated)"
              />
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors
              </label>
              <input
                type="text"
                value={formData.colors.join(', ')}
                onChange={(e) => handleColorsChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Black, Navy, Cream (comma separated)"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <select
                required
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Brand</option>
                <option value="Modest Elegance">Modest Elegance</option>
                <option value="Silk Serenity">Silk Serenity</option>
                <option value="Grace Couture">Grace Couture</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="hijabs">Hijabs</option>
                <option value="abayas">Abayas</option>
                <option value="underscarves">Underscarves</option>
                <option value="accessories">Accessories</option>
                <option value="modest-wear">Modest Wear</option>
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., silk, chiffon, casual"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reviews */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reviews Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviews}
                onChange={(e) => setFormData(prev => ({ ...prev, reviews: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product description..."
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isNew"
                checked={formData.is_new}
                onChange={(e) => setFormData(prev => ({ ...prev, is_new: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isNew" className="ml-2 text-sm text-gray-700">
                New Product
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isBestseller"
                checked={formData.is_bestseller}
                onChange={(e) => setFormData(prev => ({ ...prev, is_bestseller: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isBestseller" className="ml-2 text-sm text-gray-700">
                Bestseller
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {product ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                product ? 'Update Product' : 'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}