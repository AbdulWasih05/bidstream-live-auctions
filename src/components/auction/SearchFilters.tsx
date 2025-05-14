
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface SearchFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
  minPrice: number;
  maxPrice: number;
}

export interface FilterOptions {
  priceRange: [number, number];
  sortBy: string;
  showEndedAuctions: boolean;
  onlyBuyNow: boolean;
}

export const SearchFilters = ({ 
  onApplyFilters, 
  minPrice = 0, 
  maxPrice = 10000 
}: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sortBy, setSortBy] = useState("ending-soon");
  const [showEndedAuctions, setShowEndedAuctions] = useState(false);
  const [onlyBuyNow, setOnlyBuyNow] = useState(false);

  useEffect(() => {
    // Initialize price range when props change
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const applyFilters = () => {
    onApplyFilters({
      priceRange,
      sortBy,
      showEndedAuctions,
      onlyBuyNow
    });
  };

  const resetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSortBy("ending-soon");
    setShowEndedAuctions(false);
    setOnlyBuyNow(false);
  };

  return (
    <div className="mb-6 border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {showFilters && (
        <div className="mt-4 space-y-6">
          <div>
            <Label className="mb-2 block">Price Range</Label>
            <div className="pt-6 px-2">
              <Slider
                defaultValue={priceRange}
                min={minPrice}
                max={maxPrice}
                step={10}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceRangeChange}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
          </div>

          <div>
            <Label htmlFor="sort" className="mb-2 block">Sort By</Label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="newly-listed">Newly Listed</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="most-bids">Most Bids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-ended" 
                checked={showEndedAuctions}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setShowEndedAuctions(checked);
                  }
                }}
              />
              <Label htmlFor="show-ended" className="cursor-pointer">Show ended auctions</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="buy-now" 
                checked={onlyBuyNow}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setOnlyBuyNow(checked);
                  }
                }}
              />
              <Label htmlFor="buy-now" className="cursor-pointer">Buy It Now only</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
