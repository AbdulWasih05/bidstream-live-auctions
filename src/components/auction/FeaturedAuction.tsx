
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuctionItem } from "./AuctionCard";
import { AuctionTimer } from "./AuctionTimer";
import { formatCurrency } from "@/lib/formatters";

interface FeaturedAuctionProps {
  item: AuctionItem;
}

export const FeaturedAuction = ({ item }: FeaturedAuctionProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-auction-blue to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-block auction-category bg-white text-auction-blue">
              Featured Auction
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">{item.title}</h2>
            <p className="text-lg text-gray-200">{item.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
              <div>
                <p className="text-sm text-gray-200">Current Bid</p>
                <p className="text-2xl font-bold">{formatCurrency(item.currentBid)}</p>
                <p className="text-sm text-gray-200">{item.bidsCount} bids</p>
              </div>
              
              <div className="sm:ml-8">
                <p className="text-sm text-gray-200 mb-1">Auction ends in</p>
                <AuctionTimer endTime={item.endTime} />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" className="bg-white text-auction-blue hover:bg-gray-100">
                <Link to={`/auction/${item.id}`}>Bid Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to={`/auction/${item.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
