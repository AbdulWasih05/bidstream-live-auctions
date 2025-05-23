
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { AuctionCard, AuctionItem } from "@/components/auction/AuctionCard";
import { FeaturedAuction } from "@/components/auction/FeaturedAuction";
import { CategoryFilter } from "@/components/auction/CategoryFilter";
import { fetchListings, convertListingToAuctionItem } from "@/lib/db";
import { mockCategories } from "@/lib/mock-data";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [featuredAuction, setFeaturedAuction] = useState<AuctionItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuctions = async () => {
      setIsLoading(true);
      try {
        // Fetch listings from database
        const listings = await fetchListings();
        
        // Convert to AuctionItem format for frontend
        const auctionItems = listings.map(listing => convertListingToAuctionItem(listing));
        
        setAuctions(auctionItems);
        
        // Set featured auction (highest current price)
        if (auctionItems.length > 0) {
          const featured = [...auctionItems].sort((a, b) => b.currentBid - a.currentBid)[0];
          setFeaturedAuction(featured);
        }
      } catch (error) {
        console.error("Error loading auctions:", error);
        toast.error("Failed to load auctions");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAuctions();
  }, []);

  const filteredAuctions = selectedCategory === "all"
    ? auctions
    : auctions.filter(auction => auction.category === selectedCategory);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Find Unique Items at <span className="text-auction-blue">Competitive Prices</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover thousands of unique items across collectibles, art, electronics, and more. 
              Bid on auctions or buy instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate("/auctions")}>
                Browse Auctions
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/how-it-works")}>
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">Loading auctions from database...</p>
          </div>
        ) : (
          <>
            {/* Featured Auction */}
            {featuredAuction && (
              <section className="mb-12">
                <FeaturedAuction item={featuredAuction} />
              </section>
            )}

            {/* Categories */}
            <section>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">Browse Categories</h2>
                <Button variant="ghost" onClick={() => navigate("/categories")}>
                  View All Categories
                </Button>
              </div>
              
              <CategoryFilter
                categories={mockCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </section>

            {/* Auctions Grid */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Live Auctions</h2>
                <Button variant="ghost" onClick={() => navigate("/auctions")}>
                  View All
                </Button>
              </div>
              
              {filteredAuctions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAuctions.map((item) => (
                    <AuctionCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border rounded-lg bg-gray-50">
                  <p className="text-lg text-muted-foreground">No auctions found for this category.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setSelectedCategory("all")}
                    className="mt-2"
                  >
                    View all categories
                  </Button>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {/* Call to Action */}
      <section className="bg-auction-blue text-white mt-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Selling?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Create an account today to start selling your items to millions of buyers around the world.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-auction-blue hover:bg-gray-100"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
