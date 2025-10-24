"use client";
import { useState } from "react";
import { Subtitle } from "../sections/titles/subtitle";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

const CategoryNavigation = () => {
  const [range, setRange] = useState([50, 250]);
  return (
    <nav className="flex w-2/3 flex-col gap-8">
      <div>
        <Subtitle>Color</Subtitle>
        <hr />
        <div className="my-4 flex items-center gap-3">
          <Checkbox id="test" />
          <Label htmlFor="test">Red</Label>
        </div>
        <div className="my-4 flex items-center gap-3">
          <Checkbox id="test1" />
          <Label htmlFor="test1">Green</Label>
        </div>
        <div className="my-4 flex items-center gap-3">
          <Checkbox id="test2" />
          <Label htmlFor="test2">Blue</Label>
        </div>
      </div>
      <div>
        <Subtitle>Size</Subtitle>

        <hr />
        <div className="my-4 flex items-center gap-3">
          <Checkbox id="test3" />
          <Label htmlFor="test3">SM</Label>
        </div>
        <div className="my-4 flex items-center gap-3">
          <Checkbox id="test4" />
          <Label htmlFor="test4">MD</Label>
        </div>
        <div className="my-4 flex items-center gap-3">
          <Checkbox id="test5" />
          <Label htmlFor="test5">LG</Label>
        </div>
      </div>
      <div>
        <Subtitle>Price</Subtitle>
        <hr />

        <div className="my-4 w-full max-w-sm space-y-4">
          <div className="text-muted-foreground flex justify-between text-sm">
            <span>R$ {range[0]}</span>
            <span>R$ {range[1]}</span>
          </div>
          <Slider
            min={0}
            max={500}
            step={10}
            value={range}
            onValueChange={setRange}
          />
        </div>
      </div>
    </nav>
  );
};

export { CategoryNavigation };
