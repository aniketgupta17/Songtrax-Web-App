/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Sequences from "../components/Sequences";
import Types from "../components/Types";
import Template from "../Template";
import { baseUrl, APIKEY } from "../utils/apiKey";

const initialSequences = [
  {
    B: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    A: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    G: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    F: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    E: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    D: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    C: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
];
const initialType = "guitar";

export default function Create({
  toneObject,
  toneTransport,
  guitarPart,
  pianoPart,
  frenchHornPart,
  drumsPart,
}) {
  const [type, setType] = useState(initialType);
  const [sequences, setSequences] = useState([...initialSequences]);
  const [name, setName] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const triggerPreview = (e) => {
    e.preventDefault();
    toneObject.start();
    toneTransport.stop();
    if (!previewing) {
      toneTransport.start();
    }
    setPreviewing(!previewing);
  };

  const uploadData = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please provide a name for the sample");
      return;
    }
    setError("");
    setLoading(true);
    const url = `${baseUrl}sample/?api_key=${APIKEY}`;
    const bodyData = JSON.stringify({
      type,
      name,
      recording_data: JSON.stringify(sequences),
      api_key: APIKEY,
    });

    const response = await fetch(url, {
      method: "post",
      body: bodyData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    setType(initialType);
    setSequences([...initialSequences]);
    setName("");
    setLoading(false);
  };

  useEffect(() => {
    guitarPart.clear();
    pianoPart.clear();
    frenchHornPart.clear();
    drumsPart.clear();
    toneTransport.cancel();

    let delay = 0;
    sequences.forEach((seq) => {
      const letter = Object.keys(seq)[0];
      const sequence = seq[letter];
      sequence.forEach((bar) => {
        // only play if it's active
        if (bar) {
          if (type === "piano") {
            pianoPart.add(delay, letter + "3");
          } else if (type === "guitar") {
            guitarPart.add(delay, letter + "3");
          } else if (type === "french-horn") {
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
    <Template notHome>
      <h2 className="text-4xl font-bold text-[#800080]">
        Creating a new sample
      </h2>
      <form
        onSubmit={uploadData}
        className="w-full px-10 py-6 flex flex-col md:flex-row md:items-center gap-6 border-[#800080] border-2 border-b-8"
      >
        <div className="flex flex-1 flex-col gap-1 relative">
          <input
            className="bg-[#80008054] outline-none flex-1 p-3 rounded-lg text-[#800080] font-bold text-xl"
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {error && (
            <p className="text-red-500 text-sm absolute -bottom-5">{error}</p>
          )}
        </div>
        <div className="flex self-end md:self-auto gap-4">
          <button
            onClick={triggerPreview}
            className="px-4 py-2 border-2 border-[#800080] text-[#800080] font-semibold hover:bg-purple-300 transition"
          >
            {previewing ? "Stop Previewing" : "Preview"}
          </button>
          <button
            type="submit"
            className="px-4 py-2 flex items-center gap-2 border-2 bg-[#800080] border-[#800080] font-semibold text-white hover:bg-purple-800 transition"
          >
            Save
          </button>
          {loading && (
            <div
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-purple-800 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </form>
      <Types setType={setType} type={type} />
      <Sequences
        sequences={sequences}
        setSequences={setSequences}
        type={type}
      />
    </Template>
  );
}
