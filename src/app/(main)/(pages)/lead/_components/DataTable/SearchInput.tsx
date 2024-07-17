import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface TableSearchInputProps {
  setNameValue: (searchValue: string) => void;
}

export const TableSearchInput = ({ setNameValue }: TableSearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter By name..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className="max-w-sm mr-2"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => setNameValue(searchValue)}
        disabled={!searchValue && searchValue !== ""}
      >
        Search
      </Button>
    </div>
  );
};
