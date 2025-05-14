
import { AuctionItem } from "@/components/auction/AuctionCard";

// Generate random dates in the future
const getRandomFutureDate = (maxDays = 7) => {
  const daysAhead = Math.random() * maxDays;
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date;
};

// Categories
export const mockCategories = [
  "Electronics",
  "Collectibles",
  "Fashion",
  "Home & Garden",
  "Art",
  "Jewelry",
  "Sports",
  "Toys & Hobbies"
];

// Create mock auction items
export const mockAuctions: AuctionItem[] = [
  {
    id: "1",
    title: "Vintage Mechanical Watch",
    description: "Rare vintage watch with intricate mechanical movement, perfect for collectors.",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
    currentBid: 299.99,
    bidsCount: 18,
    endTime: getRandomFutureDate(2),
    category: "Collectibles",
    isActive: true
  },
  {
    id: "2",
    title: "Modern Digital Camera",
    description: "High-resolution digital camera with 4K video recording capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
    currentBid: 449.50,
    bidsCount: 12,
    endTime: getRandomFutureDate(1),
    category: "Electronics",
    isActive: true
  },
  {
    id: "3",
    title: "Handmade Leather Wallet",
    description: "Premium handcrafted leather wallet made from full-grain Italian leather.",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    currentBid: 49.99,
    bidsCount: 7,
    endTime: getRandomFutureDate(4),
    category: "Fashion",
    isActive: true
  },
  {
    id: "4",
    title: "Antique Wooden Chair",
    description: "18th century wooden chair with original upholstery, excellent condition.",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237",
    currentBid: 599.99,
    bidsCount: 4,
    endTime: getRandomFutureDate(3),
    category: "Home & Garden",
    isActive: true
  },
  {
    id: "5",
    title: "Original Abstract Painting",
    description: "One-of-a-kind abstract acrylic painting on canvas, signed by the artist.",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    currentBid: 1250.00,
    bidsCount: 23,
    endTime: getRandomFutureDate(5),
    category: "Art",
    isActive: true
  },
  {
    id: "6",
    title: "Diamond Engagement Ring",
    description: "1 carat diamond ring set in 14k white gold with halo setting.",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    currentBid: 2999.99,
    bidsCount: 16,
    endTime: getRandomFutureDate(1),
    category: "Jewelry",
    isActive: true
  },
  {
    id: "7",
    title: "Signed Sports Memorabilia",
    description: "Official basketball signed by legendary NBA player, with certificate of authenticity.",
    imageUrl: "https://images.unsplash.com/photo-1519861531473-9200262188bf",
    currentBid: 799.50,
    bidsCount: 29,
    endTime: new Date(Date.now() - 86400000), // 1 day ago
    category: "Sports",
    isActive: false
  },
  {
    id: "8",
    title: "Vintage Comic Book Collection",
    description: "Rare collection of first edition comic books from the 1960s in mint condition.",
    imageUrl: "https://images.unsplash.com/photo-1588497859490-85d1c17db96d",
    currentBid: 3500.00,
    bidsCount: 42,
    endTime: getRandomFutureDate(0.5),
    category: "Collectibles",
    isActive: true
  },
  {
    id: "9",
    title: "Gaming Laptop",
    description: "High-performance gaming laptop with latest graphics card and processor.",
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    currentBid: 1299.99,
    bidsCount: 31,
    endTime: getRandomFutureDate(2),
    category: "Electronics",
    isActive: true
  },
  {
    id: "10",
    title: "Designer Handbag",
    description: "Luxury designer handbag, limited edition with authentic serial number.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    currentBid: 899.99,
    bidsCount: 26,
    endTime: new Date(Date.now() - 172800000), // 2 days ago
    category: "Fashion",
    isActive: false
  },
  {
    id: "11",
    title: "Vintage Record Player",
    description: "Fully restored vintage record player from the 1970s, perfect working condition.",
    imageUrl: "https://images.unsplash.com/photo-1561490497-43bc900ac2d8",
    currentBid: 349.99,
    bidsCount: 14,
    endTime: getRandomFutureDate(3),
    category: "Electronics",
    isActive: true
  },
  {
    id: "12",
    title: "Rare Coin Collection",
    description: "Collection of rare historical coins from the 19th century.",
    imageUrl: "https://images.unsplash.com/photo-1621844061203-3f31a2de0aae",
    currentBid: 2750.00,
    bidsCount: 8,
    endTime: getRandomFutureDate(6),
    category: "Collectibles",
    isActive: true
  }
];

// Helper function to get a featured auction
export const getFeaturedAuction = (): AuctionItem => {
  // Return the auction with the most bids
  return [...mockAuctions]
    .filter(item => item.isActive)
    .sort((a, b) => b.bidsCount - a.bidsCount)[0];
};

// Helper function to get auction by ID
export const getAuctionById = (id: string): AuctionItem | null => {
  return mockAuctions.find(auction => auction.id === id) || null;
};
