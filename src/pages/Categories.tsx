
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";

const Categories = () => {
  // Example categories
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: "💻",
      count: 243,
    },
    {
      id: "collectibles",
      name: "Collectibles & Art",
      icon: "🖼️",
      count: 158,
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: "👕",
      count: 312,
    },
    {
      id: "home",
      name: "Home & Garden",
      icon: "🏡",
      count: 195,
    },
    {
      id: "vehicles",
      name: "Vehicles",
      icon: "🚗",
      count: 87,
    },
    {
      id: "jewelry",
      name: "Jewelry & Watches",
      icon: "💎",
      count: 126,
    },
    {
      id: "sports",
      name: "Sports",
      icon: "⚽",
      count: 145,
    },
    {
      id: "toys",
      name: "Toys & Hobbies",
      icon: "🧸",
      count: 174,
    },
    {
      id: "books",
      name: "Books & Media",
      icon: "📚",
      count: 231,
    },
    {
      id: "business",
      name: "Business Equipment",
      icon: "🖨️",
      count: 65,
    },
    {
      id: "music",
      name: "Musical Instruments",
      icon: "🎸",
      count: 92,
    },
    {
      id: "health",
      name: "Health & Beauty",
      icon: "💄",
      count: 183,
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/auctions?category=${category.id}`}
              className="bg-card hover:bg-accent/5 transition-colors rounded-lg p-6 text-center shadow-sm border border-border flex flex-col items-center"
            >
              <span className="text-4xl mb-3" aria-hidden="true">{category.icon}</span>
              <h2 className="text-lg font-medium mb-2">{category.name}</h2>
              <p className="text-muted-foreground text-sm">{category.count} listings</p>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Categories;
