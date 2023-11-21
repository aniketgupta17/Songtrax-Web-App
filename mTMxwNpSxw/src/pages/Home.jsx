import { useEffect, useState } from "react";
import Sample from "../components/Sample";
import { Link } from "react-router-dom";
import Template from "../Template";
import { baseUrl, APIKEY } from "../utils/apiKey";

export default function Home({ instruments }) {
  const [samples, setSamples] = useState();

  const fetchSamples = async () => {
    const url = `${baseUrl}sample/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSamples(data);
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  return (
    <Template>
      <h2 className="text-4xl font-bold text-[#800080]">Your Song Samples</h2>
      <div className="w-full p-6 flex items-center justify-center border-[#8000807a] border-2 border-b-8">
        <Link
          to={"/edit"}
          className="bg-[#800080] text-white font-medium px-6 py-2 hover:bg-[#4e1d4e] transition"
        >
          Create Sample
        </Link>
      </div>
      <div>
        {samples ? (
          samples.map((sample) => {
            return <Sample sample={sample} key={sample.id} {...instruments} />;
          })
        ) : (
          <div
            className="animate-spin w-8 h-8 border-[3px] border-current border-t-transparent text-[#800080] rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <div className="w-full p-6 flex items-center justify-center border-[#8000807a] border-2 border-b-8">
        <Link
          to={"/edit"}
          className="bg-[#800080] text-white font-medium px-6 py-2 hover:bg-[#4e1d4e] transition"
        >
          Create Sample
        </Link>
      </div>
    </Template>
  );
}
