
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuctionCard, AuctionItem } from "@/components/auction/AuctionCard";
import { SearchFilters, FilterOptions } from "@/components/auction/SearchFilters";
import { mockAuctions } from "@/lib/mock-data";

const Auctions = () => {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<AuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate min and max price from the auctions
  const minPrice = Math.min(...mockAuctions.map(a => a.currentBid));
  const maxPrice = Math.max(...mockAuctions.map(a => a.currentBid));

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setAuctions(mockAuctions);
      setFilteredAuctions(mockAuctions);
      setIsLoading(false);
    }, 700);
  }, []);

  const handleApplyFilters = (filters: FilterOptions) => {
    const { priceRange, sortBy, showEndedAuctions, onlyBuyNow } = filters;
    
    let results = [...auctions];
    
    // Filter by price range
    results = results.filter(
      item => item.currentBid >= priceRange[0] && item.currentBid <= priceRange[1]
    );
    
    // Filter by active/ended status
    if (!showEndedAuctions) {
      results = results.filter(item => item.isActive);
    }
    
    // Sort results
    switch (sortBy) {
      case "ending-soon":
        results.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
        break;
      case "newly-listed":
        // For mock data, we'll just reverse the order
        results.sort((a, b) => b.endTime.getTime() - a.endTime.getTime());
        break;
      case "price-asc":
        results.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case "price-desc":
        results.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case "most-bids":
        results.sort((a, b) => b.bidsCount - a.bidsCount);
        break;
      default:
        break;
    }
    
    setFilteredAuctions(results);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Auctions</h1>
          <p className="text-muted-foreground">Discover and bid on items from around the world</p>
        </div>
        
        {/* Search Filters */}
        <SearchFilters 
          onApplyFilters={handleApplyFilters} 
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">Loading auctions...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredAuctions.length} {filteredAuctions.length === 1 ? 'result' : 'results'}
            </p>
            
            {/* Auctions Grid */}
            {filteredAuctions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAuctions.map((item) => (
                  <AuctionCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">No auctions found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Auctions;
