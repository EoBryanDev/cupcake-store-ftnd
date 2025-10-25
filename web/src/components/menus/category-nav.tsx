"use client";
import { Dispatch, SetStateAction } from "react";
import { Subtitle } from "../sections/titles/subtitle";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useProductFiltersQuery } from "@/src/hooks/queries/useProductFilters";

export interface IFilters {
  colors: string[];
  sizes: string[];
  price: number[];
}

interface ICategoryNavigationProps {
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

const CategoryNavigation = ({
  filters,
  setFilters,
}: ICategoryNavigationProps) => {
  const {
    data: filtersData,
    isLoading: filtersLoading,
    isError: filtersError,
  } = useProductFiltersQuery();

  if (filtersLoading) return <div>Loading...</div>;
  if (filtersError) return <div>Error loading filters</div>;

  const handleColorChange = (colorId: string) => {
    const newColors = filters.colors.includes(colorId)
      ? filters.colors.filter((c) => c !== colorId)
      : [...filters.colors, colorId];
    setFilters({ ...filters, colors: newColors });
  };

  const handleSizeChange = (sizeId: string) => {
    const newSizes = filters.sizes.includes(sizeId)
      ? filters.sizes.filter((s) => s !== sizeId)
      : [...filters.sizes, sizeId];
    setFilters({ ...filters, sizes: newSizes });
  };

  const handlePriceChange = (newPrice: number[]) => {
    setFilters({ ...filters, price: newPrice });
  };

  return (
    <nav className="flex w-2/3 flex-col gap-8">
      <div>
        <Subtitle>Color</Subtitle>
        <hr />
        {filtersData?.data.colors.map((color) => (
          <div className="my-4 flex items-center gap-3" key={color}>
            <Checkbox
              id={color}
              checked={filters.colors.includes(color)}
              onCheckedChange={() => handleColorChange(color)}
            />
            <Label htmlFor={color}>{color}</Label>
          </div>
        ))}
      </div>
      <div>
        <Subtitle>Size</Subtitle>
        <hr />
        {filtersData?.data.sizes.map((size) => (
          <div className="my-4 flex items-center gap-3" key={size}>
            <Checkbox
              id={size}
              checked={filters.sizes.includes(size)}
              onCheckedChange={() => handleSizeChange(size)}
            />
            <Label htmlFor={size}>{size}</Label>
          </div>
        ))}
      </div>
      <div>
        <Subtitle>Price</Subtitle>
        <hr />

        <div className="my-4 w-full max-w-sm space-y-4">
          <div className="text-muted-foreground flex justify-between text-sm">
            <span>R$ {filters.price[0]}</span>
            <span>R$ {filters.price[1]}</span>
          </div>
          <Slider
            min={0}
            max={500}
            step={1}
            value={filters.price}
            onValueChange={handlePriceChange}
          />
        </div>
      </div>
    </nav>
  );
};

export { CategoryNavigation };
