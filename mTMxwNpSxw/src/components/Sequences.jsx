import React from "react";
import { guitar, piano, frenchHorn, drums } from "../data/instruments";
import Bars from "./Bars";

export default function Sequences({ sequences, setSequences, type }) {
  const handleBarClick = (e) => {
    const [i, j] = e.target.dataset.point.split(", ");
    const sequencesCopy = [...sequences];
    const key = Object.keys(sequencesCopy[i])[0];
    sequencesCopy[i][key][j] = !sequencesCopy[i][key][j];
    if (sequencesCopy[i][key][j]) {
      if (type === "piano") {
        piano.triggerAttackRelease(key + "3", 0.5);
      } else if (type === "guitar") {
        guitar.triggerAttackRelease(key + "3", 0.5);
      } else if (type === "french-horn") {
        frenchHorn.triggerAttackRelease(key + "3", 0.5);
      } else {
        drums.triggerAttackRelease(key + "3", 0.5);
      }
    }

    setSequences([...sequencesCopy]);
  };

  return (
    <div className="flex flex-col gap-4">
      {sequences.map((sequence, index) => {
        return (
          <Bars
            handleBarClick={handleBarClick}
            point={[index]}
            sequence={sequence}
            key={index}
          />
        );
      })}
    </div>
  );
}
