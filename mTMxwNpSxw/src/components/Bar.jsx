import React from "react";

export default function Bar({ handleBarClick, point, bar }) {
  return (
    <div
      onClick={handleBarClick}
      data-point={point.join(", ")}
      className={`flex-1 border border-b-8 h-10 border-[#800080] hover:bg-purple-300 transition cursor-pointer ${
        bar ? "bg-[#800080]" : ""
      }`}
    />
  );
}
