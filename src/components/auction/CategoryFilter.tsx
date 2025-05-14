
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className="my-6">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <Tabs defaultValue={selectedCategory} onValueChange={onSelectCategory} className="w-full">
        <TabsList className="flex w-full h-auto flex-wrap gap-2 justify-start bg-transparent">
          <TabsTrigger
            value="all"
            className={`px-4 py-2 rounded-full data-[state=active]:bg-auction-blue data-[state=active]:text-white`}
          >
            All
          </TabsTrigger>

          {visibleCategories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={`px-4 py-2 rounded-full data-[state=active]:bg-auction-blue data-[state=active]:text-white`}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {categories.length > 6 && (
        <Button
          variant="ghost"
          className="mt-2 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          Show {showAll ? "Less" : "All Categories"}
        </Button>
      )}
    </div>
  );
};
