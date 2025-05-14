
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuctionTimer } from "./AuctionTimer";
import { formatCurrency } from "@/lib/formatters";

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentBid: number;
  bidsCount: number;
  endTime: Date;
  category: string;
  isActive: boolean;
}

interface AuctionCardProps {
  item: AuctionItem;
  featured?: boolean;
}

export const AuctionCard = ({ item, featured = false }: AuctionCardProps) => {
  const [isWatched, setIsWatched] = useState(false);

  const toggleWatch = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWatched(!isWatched);
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md ${featured ? 'border-primary border-2' : ''}`}>
      <Link to={`/auction/${item.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="bg-auction-blue">Featured</Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full bg-background/80 backdrop-blur-sm ${isWatched ? 'text-auction-red border-auction-red' : ''}`} 
              onClick={toggleWatch}
            >
              <svg 
                width="15" 
                height="15" 
                viewBox="0 0 15 15" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`${isWatched ? 'fill-auction-red' : 'fill-none'}`}
              >
                <path
                  d="M7.5 0.875C7.5 0.875 7.5 0.875 7.5 0.875C3.83375 0.875 0.875 3.83375 0.875 7.5C0.875 11.1663 3.83375 14.125 7.5 14.125C11.1663 14.125 14.125 11.1663 14.125 7.5C14.125 3.83375 11.1663 0.875 7.5 0.875ZM10.8894 5.0894L7.06438 10.0894C7.00988 10.1611 6.93881 10.2182 6.85737 10.2559C6.77594 10.2935 6.6861 10.3107 6.5955 10.3059C6.50489 10.301 6.41799 10.2742 6.34195 10.228C6.2659 10.1817 6.20342 10.1173 6.15938 10.0406L4.15938 7.0406C4.0692 6.90783 4.03764 6.7451 4.0721 6.58933C4.10657 6.43356 4.2045 6.30094 4.33727 6.21077C4.47003 6.1206 4.63276 6.08904 4.78853 6.1235C4.9443 6.15796 5.07692 6.2559 5.16709 6.38867L6.66325 8.71375L10.0106 4.28617C10.0958 4.16431 10.2221 4.07908 10.3661 4.04731C10.5101 4.01555 10.6609 4.03966 10.7864 4.11489C10.9119 4.19012 11.0021 4.31196 11.0392 4.45362C11.0762 4.59527 11.0577 4.74667 10.9875 4.87383L10.8894 5.0894Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg line-clamp-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1 mb-2">{item.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            <span className="auction-category">{item.category}</span>
            {item.isActive ? (
              <AuctionTimer endTime={item.endTime} />
            ) : (
              <span className="text-muted-foreground text-sm px-3 py-1 rounded-full bg-muted">Ended</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between border-t mt-2">
          <div>
            <p className="text-sm text-muted-foreground">Current Bid</p>
            <p className="text-xl font-bold">{formatCurrency(item.currentBid)}</p>
            <p className="text-xs text-muted-foreground">{item.bidsCount} bids</p>
          </div>

          <Button 
            className={`self-end ${!item.isActive ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={!item.isActive}
          >
            {item.isActive ? "Bid Now" : "Auction Ended"}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};
