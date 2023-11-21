import React from "react";
import Bar from "./Bar";

export default function Bars({ sequence, handleBarClick, point }) {
  return (
    <div className="w-full flex gap-4">
      <h4 className="w-8 text-end md:w-16 font-semibold text-[#800080]">
        {Object.keys(sequence)[0]}
      </h4>
      <div className="flex flex-1">
        {sequence[Object.keys(sequence)[0]].map((bar, index) => {
          return (
            <Bar
              bar={bar}
              point={[...point, index]}
              handleBarClick={handleBarClick}
            />
          );
        })}
      </div>
    </div>
  );
}
