export default function SampleToLocation({ location, onClick, relation }) {
  return (
    <div className="w-full flex justify-end gap-4 text-sm md:text-md font-semibold items-center">
      <h4>{location.name}</h4>
      <div className="w-4/5 flex h-12 border-b-4 border-[#800080]">
        <div
          className={`w-1/2 border-[#800080] border flex justify-center items-center transition cursor-pointer ${
            relation ? "bg-[#800080] text-white" : "hover:bg-purple-300"
          }`}
          onClick={onClick}
        >
          Shared
        </div>
        <div
          className={`w-1/2 border-[#800080] border flex justify-center items-center transition cursor-pointer ${
            !relation ? "bg-[#800080] text-white" : "hover:bg-purple-300"
          }`}
          onClick={onClick}
        >
          Not Shared
        </div>
      </div>
    </div>
  );
}
