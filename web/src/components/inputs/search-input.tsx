import { Input } from "@/src/components/ui/input";
import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="search"
        placeholder="Search for products "
        className="[&::-webkit-search-cancel-button]:hidden"
      />
      <SearchIcon
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
        size={16}
      />
    </div>
  );
};
