/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import Template from "../Template";
import { APIKEY, baseUrl } from "../utils/apiKey";
import Location from "../components/Location";

export default function Share({
  toneObject,
  toneTransport,
  guitarPart,
  pianoPart,
  frenchHornPart,
  drumsPart,
}) {
  const { id } = useParams();
  const [sample, setSample] = useState();
  const [locations, setLocations] = useState([]);
  const [sampleToLocations, setSampleToLocations] = useState([]);
  const [previewing, setPreviewing] = useState(false);

  const fetchSample = async () => {
    const url = `${baseUrl}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSample(data);
  };

  const fetchSampleToLocations = async () => {
    const url = `${baseUrl}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setSampleToLocations(data);
  };

  const fetchLocations = async () => {
    const url = `${baseUrl}location/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setLocations(data);
  };

  const fetchData = async () => {
    await fetchSample();
    await fetchSampleToLocations();
    await fetchLocations();
  };

  // Share or unshare sample to location
  const updateSampleToLocation = async (
    deleteRelation,
    locationId = "",
    sampleToLocationId = ""
  ) => {
    if (deleteRelation) {
      const url = `${baseUrl}sampletolocation/${sampleToLocationId}/?api_key=${APIKEY}`;
      await fetch(url, {
        method: "delete",
      });
      setSampleToLocations((value) => {
        return value.filter((s) => s.id !== sampleToLocationId);
      });
    } else {
      const url = `${baseUrl}sampletolocation/?api_key=${APIKEY}`;
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify({
          sample_id: id,
          location_id: locationId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      const newSampleToLocations = [...sampleToLocations, data];
      setSampleToLocations([...newSampleToLocations]);
    }
  };

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
    fetchData();
  }, []);

  // initialize parts for preview
  useEffect(() => {
    guitarPart.clear();
    pianoPart.clear();
    frenchHornPart.clear();
    drumsPart.clear();
    toneTransport.cancel();

    let delay = 0;
    if (sample) {
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
    }

    // stop after 30 seconds or after sample ends
    toneTransport.schedule((time) => {
      setPreviewing(false);
      console.log("Preview stopped automatically.");
    }, 30);
  });

  return (
    <Template notHome>
      <h2 className="text-3xl font-bold text-[#800080]">Share this sample</h2>
      {sample ? (
        <div className="w-full p-6 flex flex-col gap-4 md:flex-row justify-between items-center border-[#800080] border-2 border-b-8 mt-6">
          <div className="flex flex-col gap-2 self-start">
            <h3 className="text-2xl font-semibold text-[#800080]">
              {sample.name}
            </h3>
            <p className="text-[#8000807c]">{formatDate(sample.datetime)}</p>
          </div>
          <div className="flex gap-2 font-medium text-white self-end">
            <button
              onClick={triggerPreview}
              className="px-4 py-2 border-2 bg-[#800080] border-[#800080] hover:bg-[#441844] transition"
            >
              {previewing ? "Stop Previewing" : "Preview"}
            </button>
          </div>
        </div>
      ) : (
        <div
          className="animate-spin w-8 h-8 border-[3px] border-current border-t-transparent text-[#800080] rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="w-full flex flex-col gap-3 text-[#800080]">
        {locations &&
          sampleToLocations &&
          locations.map((location) => {
            const relation = sampleToLocations.find(
              (stl) =>
                stl.sample_id === sample?.id && stl.location_id === location.id
            );
            return (
              <Location
                location={location}
                relation={relation}
                onClick={async () => {
                  if (!relation) {
                    await updateSampleToLocation(false, location.id);
                  } else {
                    await updateSampleToLocation(true, "", relation.id);
                  }
                }}
                key={location.id}
              />
            );
          })}
      </div>
    </Template>
  );
}
