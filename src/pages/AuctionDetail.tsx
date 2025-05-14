
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuctionTimer } from "@/components/auction/AuctionTimer";
import { formatCurrency } from "@/lib/formatters";
import { AuctionItem } from "@/components/auction/AuctionCard";
import { mockAuctions, getAuctionById } from "@/lib/mock-data";

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<AuctionItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [relatedItems, setRelatedItems] = useState<AuctionItem[]>([]);

  // Get minimum bid amount (current bid + increment)
  const minimumBid = auction ? auction.currentBid + (auction.currentBid * 0.05) : 0;

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      if (id) {
        const foundAuction = getAuctionById(id);
        setAuction(foundAuction);
        
        // Get related items from same category
        if (foundAuction) {
          const related = mockAuctions
            .filter(item => item.category === foundAuction.category && item.id !== foundAuction.id)
            .slice(0, 4);
          setRelatedItems(related);
        }
      }
      setIsLoading(false);
    }, 700);
  }, [id]);

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount < minimumBid) {
      alert(`Bid must be at least ${formatCurrency(minimumBid)}`);
      return;
    }
    
    // In a real app, this would send the bid to the server
    alert(`Bid of ${formatCurrency(amount)} placed successfully!`);
    
    // Update the auction data (simulation)
    if (auction) {
      setAuction({
        ...auction,
        currentBid: amount,
        bidsCount: auction.bidsCount + 1,
      });
    }
    
    setBidAmount("");
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading auction details...</p>
        </div>
      </MainLayout>
    );
  }

  if (!auction) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
          <p className="mb-6">The auction you're looking for does not exist or has been removed.</p>
          <Link to="/auctions">
            <Button>Browse All Auctions</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link to="/auctions" className="text-muted-foreground hover:text-foreground">Auctions</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{auction.title}</span>
        </nav>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Image */}
          <div className="rounded-lg overflow-hidden border bg-white shadow-sm">
            <img 
              src={auction.imageUrl} 
              alt={auction.title}
              className="w-full h-auto object-contain"
            />
          </div>
          
          {/* Right: Auction Details */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="auction-category">{auction.category}</span>
              {auction.isActive ? (
                <AuctionTimer endTime={auction.endTime} />
              ) : (
                <span className="text-muted-foreground text-sm px-3 py-1 rounded-full bg-muted">Ended</span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{auction.description}</p>
            
            <div className="border-t border-b py-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Current Bid:</span>
                <span className="text-2xl font-bold">{formatCurrency(auction.currentBid)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bids:</span>
                <span className="font-medium">{auction.bidsCount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ends:</span>
                <span className="font-medium">
                  {auction.endTime.toLocaleDateString()} at {auction.endTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            {auction.isActive ? (
              <form onSubmit={handleBidSubmit} className="mt-6">
                <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-sm font-medium mb-1">
                    Your Bid (min. {formatCurrency(minimumBid)})
                  </label>
                  <div className="flex space-x-2">
                    <Input 
                      id="bidAmount" 
                      type="number" 
                      placeholder={minimumBid.toString()}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      min={minimumBid}
                      step="0.01"
                      className="flex-1"
                    />
                    <Button type="submit">Place Bid</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter {formatCurrency(minimumBid)} or more
                  </p>
                </div>
                
                <Button className="w-full" size="lg">
                  Bid Now
                </Button>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  By placing a bid, you agree to our <Link to="/terms" className="underline">Terms & Conditions</Link>
                </div>
              </form>
            ) : (
              <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                <h3 className="font-medium text-lg mb-2">This auction has ended</h3>
                <p className="text-muted-foreground">Final sale price: {formatCurrency(auction.currentBid)}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Tabs for Item Details, Shipping, etc. */}
        <div className="mb-12">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Item Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
              <TabsTrigger value="seller">Seller Information</TabsTrigger>
              <TabsTrigger value="history">Bid History</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-md mt-2">
              <h3 className="font-semibold text-lg mb-2">Item Details</h3>
              <p className="mb-4">
                {auction.description}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Condition: New</li>
                <li>Brand: Premium</li>
                <li>Material: High-quality</li>
                <li>Dimensions: 12" x 8" x 3"</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="p-4 border rounded-md mt-2">
              <h3 className="font-semibold text-lg mb-2">Shipping Information</h3>
              <p className="mb-4">
                Shipping costs are calculated based on the buyer's location. The seller typically ships within 3 business days after receiving payment.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ships from: United States</li>
                <li>Domestic shipping: $12.99</li>
                <li>International shipping: $29.99</li>
                <li>Estimated delivery: 5-7 business days (domestic), 10-14 business days (international)</li>
              </ul>
            </TabsContent>
            <TabsContent value="seller" className="p-4 border rounded-md mt-2">
              <h3 className="font-semibold text-lg mb-2">Seller Information</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-4">
                  <span className="text-lg font-bold">JD</span>
                </div>
                <div>
                  <p className="font-medium">JohnDoe123</p>
                  <p className="text-sm text-muted-foreground">Member since Jan 2024 • 98.5% Positive Feedback</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-2 border rounded">
                  <p className="font-medium">492</p>
                  <p className="text-sm text-muted-foreground">Items Sold</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="font-medium">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="p-2 border rounded">
                  <p className="font-medium">1-2 days</p>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="history" className="p-4 border rounded-md mt-2">
              <h3 className="font-semibold text-lg mb-2">Bid History ({auction.bidsCount} bids)</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">User***123</span>
                  <span>{formatCurrency(auction.currentBid)}</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">User***456</span>
                  <span>{formatCurrency(auction.currentBid * 0.95)}</span>
                  <span className="text-muted-foreground">5 hours ago</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">User***789</span>
                  <span>{formatCurrency(auction.currentBid * 0.9)}</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((item) => (
                <Link to={`/auction/${item.id}`} key={item.id}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      <p className="mt-1 text-auction-blue font-bold">
                        {formatCurrency(item.currentBid)}
                      </p>
                      {item.isActive && (
                        <div className="mt-2">
                          <AuctionTimer endTime={item.endTime} />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AuctionDetail;
