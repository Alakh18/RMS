// Shared products database for the application
export const PRODUCTS_DB = {
  '1': {
    id: 1,
    name: "High-Performance Gaming Laptop",
    basePrice: 800,
    hourlyRate: 150,
    dailyRate: 800,
    weeklyRate: 4500,
    monthlyRate: 15000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop",
    description: "Ultimate gaming laptop with cutting-edge specs. Features RTX 4080, 32GB RAM, and a stunning 17-inch 144Hz display. Perfect for gaming, content creation, and intensive workloads.",
    specifications: [
      "Intel Core i9-13900HX Processor",
      "32GB DDR5 RAM",
      "1TB NVMe SSD",
      "NVIDIA RTX 4080 16GB",
      "17-inch 2K 144Hz Display",
      "RGB Mechanical Keyboard"
    ],
    availability: "Available",
    stockQuantity: 3,
    category: "Electronics",
    brand: "ASUS ROG",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    tags: ['Gaming', 'Laptop', 'High-End'],
    deposit: 5000,
    hasVariants: true,
    variants: [
      {
        id: 'v1',
        attribute: 'RAM',
        options: ['16GB', '32GB', '64GB'],
        prices: [0, 100, 300]
      },
      {
        id: 'v2',
        attribute: 'Storage',
        options: ['512GB SSD', '1TB SSD', '2TB SSD'],
        prices: [0, 150, 400]
      }
    ]
  },
  '2': {
    id: 2,
    name: "Professional DSLR Camera Kit",
    basePrice: 500,
    hourlyRate: 100,
    dailyRate: 500,
    weeklyRate: 3000,
    monthlyRate: 10000,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop",
    description: "Professional full-frame DSLR camera kit with premium lenses. Includes multiple lenses, tripod, and lighting equipment. Perfect for professional photography and videography.",
    specifications: [
      "45MP Full-Frame Sensor",
      "24-70mm f/2.8 Lens",
      "70-200mm f/2.8 Lens",
      "Professional Tripod",
      "LED Light Panel",
      "Camera Bag & Accessories"
    ],
    availability: "Available",
    stockQuantity: 4,
    category: "Photography",
    brand: "Canon",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    tags: ['Camera', 'Photography', 'Professional'],
    deposit: 8000,
    hasVariants: true,
    variants: [
      {
        id: 'v1',
        attribute: 'Lens Package',
        options: ['Basic (24-70mm)', 'Pro (24-70mm + 70-200mm)', 'Ultimate (All Lenses)'],
        prices: [0, 200, 500]
      }
    ]
  },
  '3': {
    id: 3,
    name: "Electric Scooter - Urban Mobility",
    basePrice: 200,
    hourlyRate: 50,
    dailyRate: 200,
    weeklyRate: 1200,
    monthlyRate: 4000,
    image: "https://images.unsplash.com/photo-1559320775-0b8b0f8b9f2b?w=500&h=500&fit=crop",
    description: "Eco-friendly electric scooter for urban commuting. Long-range battery, smart connectivity, and comfortable ride. Perfect for daily commutes and city exploration.",
    specifications: [
      "40km Range",
      "25 km/h Max Speed",
      "Fast Charging (3 hours)",
      "Smart App Connectivity",
      "LED Display",
      "Dual Braking System"
    ],
    availability: "Available",
    stockQuantity: 8,
    category: "Transportation",
    brand: "Xiaomi",
    rating: 4.5,
    reviews: 56,
    inStock: true,
    tags: ['Scooter', 'Electric', 'Transport'],
    deposit: 2000,
    hasVariants: false,
    variants: []
  },
  '4': {
    id: 4,
    name: "Power Drill Set - Heavy Duty",
    basePrice: 100,
    hourlyRate: 30,
    dailyRate: 100,
    weeklyRate: 500,
    monthlyRate: 1500,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop",
    description: "Professional-grade power drill set with complete accessories. Includes multiple drill bits, carrying case, and battery packs. Ideal for construction and DIY projects.",
    specifications: [
      "18V Brushless Motor",
      "2x 5.0Ah Batteries",
      "50-piece Drill Bit Set",
      "Variable Speed Control",
      "LED Work Light",
      "Heavy-Duty Carrying Case"
    ],
    availability: "Available",
    stockQuantity: 12,
    category: "Tools",
    brand: "DeWalt",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    tags: ['Tools', 'Construction', 'DIY'],
    deposit: 500,
    hasVariants: false,
    variants: []
  },
  '5': {
    id: 5,
    name: "4K Video Projector",
    basePrice: 400,
    hourlyRate: 80,
    dailyRate: 400,
    weeklyRate: 2500,
    monthlyRate: 8000,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=500&fit=crop",
    description: "Ultra HD 4K projector with HDR support. Perfect for home theaters, presentations, and events. Includes screen and mounting hardware.",
    specifications: [
      "4K UHD Resolution",
      "3500 ANSI Lumens",
      "HDR10 Support",
      "120-inch Screen Included",
      "HDMI & Wireless Connectivity",
      "Built-in Speakers"
    ],
    availability: "Out of Stock",
    stockQuantity: 0,
    category: "Electronics",
    brand: "Epson",
    rating: 4.7,
    reviews: 67,
    inStock: false,
    tags: ['Projector', 'Entertainment', '4K'],
    deposit: 4000,
    hasVariants: false,
    variants: []
  },
  '6': {
    id: 6,
    name: "DJ Sound System Complete",
    basePrice: 1000,
    hourlyRate: 200,
    dailyRate: 1000,
    weeklyRate: 6000,
    monthlyRate: 20000,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
    description: "Complete professional DJ setup with mixer, speakers, and lighting. Perfect for events, parties, and professional gigs. Includes all cables and accessories.",
    specifications: [
      "4-Channel DJ Mixer",
      "2x 1000W Speakers",
      "DJ Controller",
      "LED Stage Lighting",
      "Microphones (2x)",
      "All Cables & Stands"
    ],
    availability: "Available",
    stockQuantity: 2,
    category: "Audio",
    brand: "Pioneer",
    rating: 4.9,
    reviews: 145,
    inStock: true,
    tags: ['Audio', 'DJ', 'Events'],
    deposit: 10000,
    hasVariants: true,
    variants: [
      {
        id: 'v1',
        attribute: 'Package',
        options: ['Basic Setup', 'Pro Setup', 'Ultimate Setup'],
        prices: [0, 300, 700]
      }
    ]
  },
  '7': {
    id: 7,
    name: "Camping Tent - 6 Person",
    basePrice: 150,
    hourlyRate: 0,
    dailyRate: 150,
    weeklyRate: 800,
    monthlyRate: 2500,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&h=500&fit=crop",
    description: "Spacious 6-person camping tent with weather protection. Easy setup, waterproof, and includes camping accessories. Perfect for family camping adventures.",
    specifications: [
      "6-Person Capacity",
      "Waterproof 3000mm",
      "Easy Setup (10 min)",
      "2 Rooms + Living Area",
      "Includes Ground Sheet",
      "Storage Pockets"
    ],
    availability: "Available",
    stockQuantity: 6,
    category: "Outdoor",
    brand: "Coleman",
    rating: 4.4,
    reviews: 89,
    inStock: true,
    tags: ['Camping', 'Outdoor', 'Family'],
    deposit: 1000,
    hasVariants: false,
    variants: []
  },
  '8': {
    id: 8,
    name: "Mountain Bike - Professional",
    basePrice: 250,
    hourlyRate: 40,
    dailyRate: 250,
    weeklyRate: 1500,
    monthlyRate: 5000,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=500&fit=crop",
    description: "High-performance mountain bike with full suspension. Perfect for trail riding and adventure sports. Includes helmet and safety gear.",
    specifications: [
      "29-inch Wheels",
      "Full Suspension",
      "27-Speed Shimano Gears",
      "Hydraulic Disc Brakes",
      "Carbon Fiber Frame",
      "Helmet & Protective Gear"
    ],
    availability: "Available",
    stockQuantity: 5,
    category: "Sports",
    brand: "Trek",
    rating: 4.8,
    reviews: 178,
    inStock: true,
    tags: ['Bike', 'Sports', 'Adventure'],
    deposit: 3000,
    hasVariants: true,
    variants: [
      {
        id: 'v1',
        attribute: 'Size',
        options: ['Small (15")', 'Medium (17")', 'Large (19")'],
        prices: [0, 0, 0]
      }
    ]
  }
}

// Convert to array for listing pages
export const PRODUCTS_ARRAY = Object.values(PRODUCTS_DB)
