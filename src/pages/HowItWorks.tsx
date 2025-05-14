
import { MainLayout } from "@/components/layout/MainLayout";

const HowItWorks = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">How BidHub Works</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Create an Account</h2>
            <p className="text-muted-foreground">
              Sign up for a free account to start bidding on items or list your own items for auction.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Browse Auctions</h2>
            <p className="text-muted-foreground">
              Explore our wide range of auctions by category, price range, or time remaining.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Place Bids</h2>
            <p className="text-muted-foreground">
              When you find something you like, place a bid. You'll be notified if someone outbids you.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">4</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Win Auctions</h2>
            <p className="text-muted-foreground">
              If you're the highest bidder when the auction ends, congratulations! The item is yours.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">5</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Secure Payment</h2>
            <p className="text-muted-foreground">
              Complete your purchase with our secure payment system. Multiple payment methods available.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary text-xl font-bold">6</span>
            </div>
            <h2 className="text-xl font-semibold mb-3">Delivery</h2>
            <p className="text-muted-foreground">
              Once payment is confirmed, the seller will ship your item directly to you.
            </p>
          </div>
        </div>
        
        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">What happens if I win an auction?</h3>
              <p className="text-muted-foreground">When you win an auction, you'll receive a notification and instructions on how to complete the purchase.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How do I know if my bid was successful?</h3>
              <p className="text-muted-foreground">You'll receive real-time notifications about the status of your bids. You can also check your account dashboard.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Is there a fee for listing items?</h3>
              <p className="text-muted-foreground">BidHub charges a small commission on successful sales. Listing items is free.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorks;
