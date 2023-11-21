import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/formatDate";

export default function Sample({
  sample,
  toneObject,
  toneTransport,
  guitarPart,
  pianoPart,
  frenchHornPart,
  drumsPart,
}) {
  const [previewing, setPreviewing] = useState(false);

  const triggerPreview = (e) => {
    e.preventDefault();
    toneObject.start();
    toneTransport.stop();
    if (!previewing) {
      toneTransport.start();
    }
    setPreviewing(!previewing);
  };

  useEffect(() => {
    guitarPart.clear();
    pianoPart.clear();
    frenchHornPart.clear();
    drumsPart.clear();
    toneTransport.cancel();

    let delay = 0;
    JSON.parse(sample.recording_data).forEach((seq) => {
      const letter = Object.keys(seq)[0];
      const sequence = seq[letter];
      sequence.forEach((bar) => {
        // only play if it's active
        if (bar) {
          if (sample.type === "piano") {
            pianoPart.add(delay, letter + "3");
          } else if (sample.type === "guitar") {
            guitarPart.add(delay, letter + "3");
          } else if (sample.type === "french-horn") {
            frenchHornPart.add(delay, letter + "3");
          } else {
            drumsPart.add(delay, letter + "3");
          }

          // add a delay to avoid overlap
          delay += 0.5;
        }
      });
    });

    // stop after 30 seconds or after sample ends
    toneTransport.schedule((time) => {
      setPreviewing(false);
      console.log("Preview stopped automatically.");
    }, 30);
  });

  return (
    <section className="w-full p-6 flex flex-col gap-4 md:flex-row justify-between items-center border-[#800080] border-2 border-b-8 mt-6">
      <div className="flex flex-col gap-2 self-start">
        <h3 className="text-2xl font-semibold text-[#800080]">{sample.name}</h3>
        <p className="text-[#80008075]">{formatDate(sample.datetime)}</p>
      </div>
      <div className="flex gap-2 font-medium text-[#800080] self-end">
        <Link
          to={`/share/${sample.id}`}
          className="px-4 py-2 border-2 border-[#800080] hover:bg-purple-200 transition"
        >
          Share
        </Link>
        <button
          onClick={triggerPreview}
          className="px-4 py-2 border-2 border-[#800080] hover:bg-purple-200 transition"
        >
          {previewing ? "Stop Previewing" : "Preview"}
        </button>
        <Link
          to={`/edit/${sample.id}`}
          className="px-4 py-2 border border-[#800080] bg-[#800080] text-white hover:bg-purple-800 transition"
        >
          Edit
        </Link>
      </div>
    </section>
  );
}
