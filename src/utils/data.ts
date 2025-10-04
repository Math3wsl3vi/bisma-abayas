// Mock data for the e-commerce site
// Products
export const products = [{
  id: 'premium-silk-hijab-emerald',
  name: 'Premium Silk Hijab - Emerald Green',
  price: 39.99,
  originalPrice: 49.99,
  images: ['https://i.pinimg.com/1200x/8a/51/c3/8a51c325c656f1a909b6eb0c52921579.jpg', 'https://i.pinimg.com/1200x/79/2f/b3/792fb37c43b60235d46d6a503762a4db.jpg', 'https://i.pinimg.com/1200x/8a/51/c3/8a51c325c656f1a909b6eb0c52921579.jpg'],
  description: 'Luxurious 100% silk hijab in a stunning emerald green shade. This premium quality hijab drapes beautifully and adds an elegant touch to any outfit. The lightweight fabric ensures comfort all day long.',
  category: 'hijabs',
  subcategory: 'silk',
  rating: 4.8,
  reviews: 124,
  sku: 'HIJ-SLK-EMR-001',
  material: '100% Silk',
  dimensions: '180cm x 70cm',
  colors: ['emerald', 'navy', 'burgundy', 'black', 'cream'],
  isNew: false,
  isBestseller: true,
  inStock: true
}, {
  id: 'chiffon-pleated-hijab-burgundy',
  name: 'Pleated Chiffon Hijab - Burgundy',
  price: 24.99,
  images: ['https://i.pinimg.com/1200x/8b/be/3c/8bbe3c125132b2a178d6040b76cb8e6e.jpg', 'https://i.pinimg.com/1200x/8b/be/3c/8bbe3c125132b2a178d6040b76cb8e6e.jpg'],
  description: "Elegant pleated chiffon hijab in a rich burgundy color. The pleated texture adds dimension and style while remaining easy to style. Made from high-quality chiffon that's both breathable and durable.",
  category: 'hijabs',
  subcategory: 'chiffon',
  rating: 4.5,
  reviews: 89,
  sku: 'HIJ-CHF-BRG-002',
  material: 'Polyester Chiffon',
  dimensions: '175cm x 75cm',
  colors: ['burgundy', 'navy', 'black', 'cream', 'dusty rose'],
  isNew: false,
  isBestseller: false,
  inStock: true
}, {
  id: 'jersey-hijab-navy',
  name: 'Premium Jersey Hijab - Navy',
  price: 19.99,
  images: ['https://i.pinimg.com/1200x/8b/be/3c/8bbe3c125132b2a178d6040b76cb8e6e.jpg', 'https://i.pinimg.com/1200x/8b/be/3c/8bbe3c125132b2a178d6040b76cb8e6e.jpg'],
  description: "Comfortable and versatile jersey hijab in classic navy. Perfect for everyday wear with its soft, stretchy fabric that's easy to style. The premium quality ensures it maintains its shape all day.",
  category: 'hijabs',
  subcategory: 'jersey',
  rating: 4.7,
  reviews: 156,
  sku: 'HIJ-JRS-NVY-003',
  material: 'Premium Cotton Jersey',
  dimensions: '170cm x 65cm',
  colors: ['navy', 'black', 'gray', 'emerald', 'burgundy', 'cream'],
  isNew: false,
  isBestseller: true,
  inStock: true
}, {
  id: 'cotton-crinkle-hijab-cream',
  name: 'Crinkle Cotton Hijab - Cream',
  price: 22.99,
  images: ['https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=2787&auto=format&fit=crop', 'https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=2787&auto=format&fit=crop'],
  description: 'Light and airy crinkle cotton hijab in a versatile cream color. The natural crinkle texture adds volume and makes styling effortless. Made from 100% cotton for breathability and comfort.',
  category: 'hijabs',
  subcategory: 'cotton',
  rating: 4.6,
  reviews: 92,
  sku: 'HIJ-CTN-CRM-004',
  material: '100% Cotton',
  dimensions: '180cm x 80cm',
  colors: ['cream', 'black', 'navy', 'burgundy', 'sage green'],
  isNew: true,
  isBestseller: false,
  inStock: true
}, {
  id: 'premium-abaya-black-gold',
  name: 'Premium Black Abaya with Gold Embroidery',
  price: 129.99,
  originalPrice: 159.99,
  images: ['https://i.pinimg.com/736x/ec/0b/22/ec0b22a0dbdb526c1ca00ab2c5fb3fd0.jpg', 'https://i.pinimg.com/736x/ec/0b/22/ec0b22a0dbdb526c1ca00ab2c5fb3fd0.jpg'],
  description: 'Elegant black abaya with intricate gold embroidery details. Made from high-quality crepe fabric that drapes beautifully and ensures comfort. The subtle gold embellishments add a touch of luxury to this modest piece.',
  category: 'abayas',
  subcategory: 'embroidered',
  rating: 4.9,
  reviews: 78,
  sku: 'ABY-EMB-BLK-001',
  material: 'Premium Crepe',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['black'],
  isNew: true,
  isBestseller: true,
  inStock: true
}, {
  id: 'everyday-abaya-navy',
  name: 'Everyday Comfort Abaya - Navy',
  price: 89.99,
  images: ['https://images.unsplash.com/photo-1624623278313-a930126a11c3?q=80&w=2787&auto=format&fit=crop', 'https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c?q=80&w=2787&auto=format&fit=crop'],
  description: "Comfortable and practical navy abaya for everyday wear. Features a simple, elegant design with convenient pockets and a flowy silhouette. Made from breathable nida fabric that's perfect for daily activities.",
  category: 'abayas',
  subcategory: 'casual',
  rating: 4.7,
  reviews: 112,
  sku: 'ABY-CAS-NVY-002',
  material: 'Nida Fabric',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['navy', 'black', 'gray', 'burgundy'],
  isNew: false,
  isBestseller: false,
  inStock: true
}, {
  id: 'kimono-style-abaya-emerald',
  name: 'Kimono Style Abaya - Emerald',
  price: 109.99,
  images: ['https://images.unsplash.com/photo-1618333258404-78d8a6e39005?q=80&w=2787&auto=format&fit=crop', 'https://images.unsplash.com/photo-1624454002302-36b660e0ea5a?q=80&w=2787&auto=format&fit=crop'],
  description: 'Modern kimono-style abaya in a stunning emerald green. Features wide sleeves, an open front design, and a matching belt. Perfect for layering over your favorite outfits for a contemporary modest look.',
  category: 'abayas',
  subcategory: 'modern',
  rating: 4.8,
  reviews: 64,
  sku: 'ABY-KMN-EMR-003',
  material: 'Premium Crepe',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['emerald', 'black', 'burgundy', 'dusty rose'],
  isNew: true,
  isBestseller: false,
  inStock: true
}, {
  id: 'formal-abaya-burgundy',
  name: 'Formal Beaded Abaya - Burgundy',
  price: 149.99,
  originalPrice: 179.99,
  images: ['https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=2787&auto=format&fit=crop', 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=2787&auto=format&fit=crop'],
  description: 'Luxurious burgundy abaya with delicate beading detail, perfect for special occasions. Features a flattering A-line silhouette and button closures. The premium fabric and exquisite embellishments make this a standout piece.',
  category: 'abayas',
  subcategory: 'formal',
  rating: 4.9,
  reviews: 42,
  sku: 'ABY-FRM-BRG-004',
  material: 'Premium Nida with Beading',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['burgundy', 'black', 'navy'],
  isNew: true,
  isBestseller: false,
  inStock: true
}, {
  id: 'modal-underscarves-set',
  name: 'Modal Fabric Underscarves Set - 3 Pack',
  price: 24.99,
  originalPrice: 29.99,
  images: ['https://i.pinimg.com/736x/08/52/ff/0852ffb0558fb5a36c7dca43985d53ae.jpg', 'https://i.pinimg.com/1200x/8c/33/07/8c3307508b7f9acf30fe8af830b0b2e2.jpg'],
  description: 'Set of three comfortable modal fabric underscarves in essential colors (black, navy, cream). The soft, stretchy material provides excellent coverage and grip to keep your hijab in place all day.',
  category: 'underscarves',
  subcategory: 'basic',
  rating: 4.7,
  reviews: 186,
  sku: 'UND-MDL-SET-001',
  material: 'Modal Blend',
  sizes: ['Standard'],
  colors: ['Black, Navy, Cream set'],
  isNew: false,
  isBestseller: true,
  inStock: true
}, {
  id: 'cotton-hijab-pins-set',
  name: 'Magnetic Hijab Pins Set - Gold',
  price: 18.99,
  images: ['https://images.unsplash.com/photo-1618001789159-ffffe6f96ef2?q=80&w=2787&auto=format&fit=crop', 'https://images.unsplash.com/photo-1613843873862-f3c7c80eff4c?q=80&w=2787&auto=format&fit=crop'],
  description: 'Set of 5 magnetic hijab pins with decorative gold-tone tops. These innovative pins secure your hijab without damaging the fabric and are easy to use. The magnetic design provides strong hold without piercing the fabric.',
  category: 'accessories',
  subcategory: 'pins',
  rating: 4.6,
  reviews: 94,
  sku: 'ACC-PIN-GLD-001',
  material: 'Metal with Gold Plating',
  colors: ['Gold'],
  isNew: false,
  isBestseller: true,
  inStock: true
}, {
  id: 'volumizing-scrunchie',
  name: 'Volumizing Hijab Scrunchie',
  price: 12.99,
  images: ['https://images.unsplash.com/photo-1625695894530-9b3f6bf44007?q=80&w=2787&auto=format&fit=crop', 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=2808&auto=format&fit=crop'],
  description: 'Create the perfect hijab volume with this comfortable scrunchie. The lightweight design adds height and fullness without discomfort. Made from soft fabric with a secure grip to stay in place all day.',
  category: 'accessories',
  subcategory: 'volumizers',
  rating: 4.5,
  reviews: 127,
  sku: 'ACC-VOL-SCR-002',
  material: 'Cotton Blend',
  colors: ['Black', 'Brown', 'Beige'],
  isNew: true,
  isBestseller: false,
  inStock: true
}, {
  id: 'prayer-dress-set-teal',
  name: 'Two-Piece Prayer Dress Set - Teal',
  price: 59.99,
  images: ['https://images.unsplash.com/photo-1581699216404-d189a8430190?q=80&w=2787&auto=format&fit=crop', 'https://images.unsplash.com/photo-1581699219482-7ff3b041c8d1?q=80&w=2787&auto=format&fit=crop'],
  description: "Comfortable two-piece prayer dress set in a beautiful teal color. Includes an overhead abaya and matching prayer hijab. Made from soft, flowing fabric that's perfect for prayer and easy to pack for travel.",
  category: 'modest-wear',
  subcategory: 'prayer-sets',
  rating: 4.8,
  reviews: 73,
  sku: 'MDW-PRS-TEL-001',
  material: 'Soft Polyester',
  sizes: ['S/M', 'L/XL'],
  colors: ['Teal', 'Black', 'Navy', 'Burgundy'],
  isNew: false,
  isBestseller: false,
  inStock: true
}];
// Categories
export const categories = [{
  id: 'hijabs',
  name: 'Hijabs',
  description: 'Beautiful hijabs in various fabrics, colors, and styles',
  image: 'https://i.pinimg.com/736x/f8/39/34/f83934646d804083217bede84bc0d82f.jpg',
  subcategories: [
    'silk',
    'chiffon',
    'jersey',
    'cotton',
    'prints',
    'occasion',
    'matching-hijabs' // hijabs included in abaya sets
  ]
}, {
  id: 'abayas',
  name: 'Abayas',
  description: 'Elegant abayas for every occasion',
  image: 'https://i.pinimg.com/1200x/b0/53/12/b05312ed9e8a28691d6655a95fb1427f.jpg',
  subcategories: [
    'casual',
    'formal',
    'embroidered',  // handmade / handwork abayas
    'modern',
    'everyday',
    'sets',         // abaya + hijab or abaya + inner dress
    'custom'        // made-to-order pieces
  ]
}, {
  id: 'modest-wear',
  name: 'Modest Wear',
  description: 'Stylish modest clothing for everyday elegance',
  image: 'https://i.pinimg.com/1200x/c8/1d/44/c81d4410121927429b0f5046164a3708.jpg',
  subcategories: [
    'dresses',      // Mina abaya, everyday modest dresses
    'sets',         // 2-piece / 3-piece coordinated modest sets
    'tops',
    'skirts',
    'prayer-sets'   // for salah / special modest wear
  ]
}, {
  id: 'accessories',
  name: 'Accessories',
  description: 'Complete your look with our beautiful accessories',
  image: 'https://i.pinimg.com/736x/c6/04/d0/c604d0568c80e89a28002863b7262189.jpg',
  subcategories: [
    'pins',
    'volumizers',
    'caps',
    'underscarves',
    'jewelry',
    'belts',        // waist belts for abayas
    'bags'          // sometimes paired with modest fashion
  ]
}];

// Collections
export const collections = [{
  id: 'new-arrivals',
  name: 'New Arrivals',
  description: 'Our latest additions to keep your wardrobe fresh and stylish',
  image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=2787&auto=format&fit=crop'
}, {
  id: 'bestsellers',
  name: 'Bestsellers',
  description: 'Our most popular items loved by customers',
  image: 'https://images.unsplash.com/photo-1623060386759-6e8a5067c2c4?q=80&w=2787&auto=format&fit=crop'
}, {
  id: 'ramadan',
  name: 'Ramadan Collection',
  description: 'Special pieces for the holy month',
  image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=2808&auto=format&fit=crop'
}, {
  id: 'eid',
  name: 'Eid Collection',
  description: 'Celebrate in style with our festive collection',
  image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=2787&auto=format&fit=crop'
}];
// Testimonials
export const testimonials = [{
  id: 1,
  name: 'Fatima A.',
  location: 'New York, USA',
  rating: 5,
  text: "I absolutely love the quality of Modest Elegance's hijabs. The silk ones are so luxurious and the colors stay vibrant even after multiple washes. Will definitely be ordering more!",
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop',
  date: 'March 15, 2023'
}, {
  id: 2,
  name: 'Amina K.',
  location: 'London, UK',
  rating: 5,
  text: "The abayas from this shop are beautiful and so well-made. I've received countless compliments on my embroidered abaya. The fit is perfect and the shipping was faster than expected!",
  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop',
  date: 'January 22, 2023'
}, {
  id: 3,
  name: 'Layla M.',
  location: 'Toronto, Canada',
  rating: 4,
  text: 'Great customer service and beautiful products. The prayer set I ordered is so comfortable and perfect for travel. Would have given 5 stars but shipping took a bit longer than expected.',
  image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=2574&auto=format&fit=crop',
  date: 'February 8, 2023'
}, {
  id: 4,
  name: 'Zainab H.',
  location: 'Sydney, Australia',
  rating: 5,
  text: "I've been searching for modest clothing that doesn't compromise on style, and I've finally found it! The quality is outstanding and the designs are modern while remaining modest. So happy with my purchase!",
  image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2670&auto=format&fit=crop',
  date: 'April 3, 2023'
}];